import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import databaseService from '../../appwrite/config'
import storageService from '../../appwrite/buck'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeData } from '../../store/postsSlice'

function PostForm({post}) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()

    const submit = async (data) => {
        const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
        try {   
            if (post) {
                // const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
    
                if (file) {
                    storageService.deleteFile(post.featuredImage)
                }
    
                const dbPost = await databaseService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                    dispatch(removeData())
                } 
            } else {
                // const file = await storageService.uploadFile(data.image[0])
    
                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await databaseService.createPost( {
                        ...data,
                        userId: userData.$id,
                        userName: userData.name,
                    })
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                        dispatch(removeData())
                    }
                }
            }
        } catch (error) {
            alert(error.message);
            if (file) {
                storageService.deleteFile(file.$id);
            }
            console.log(error.message);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return '';

    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='sm:w-2/3 w-full px-2'>
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

            </div>
            <div className='sm:w-1/3 w-full px-2'>
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div>
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>

        </form>
    )
}

export default PostForm