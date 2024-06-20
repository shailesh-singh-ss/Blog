import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/config'
import storageService from '../appwrite/buck'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { removeData } from '../store/postsSlice'
import { comment } from 'postcss'
import { useForm } from 'react-hook-form'
import {Likes} from '../components'

function Post() {
    
    // state variables

    const [post, setPost] = useState(null)
    const [val, setVal] = useState("")
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState([])
    const { register, handleSubmit } = useForm()
    const { slug } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userData)
    
    // check if the user is the author of the post and if the post exists in the database

    const isAuthor = post && userData ? post.userId === userData.$id : false

    // get the post from the database and set it to the state variable post if it exists
    // if it doesn't exist, navigate to the home page 
    
    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                    setComment(post.comments)
                } else navigate("/")
            })
        } else navigate("/")
    }, [slug, navigate])


    // delete the post from the database and navigate to the home page if the post is deleted successfully 

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteFile(post.featuredImage);
                dispatch(removeData())
                navigate("/")
            }
        })
    }

    // add a comment to the post and update the state variable comment if the comment is added successfully 

    const showSubmit = (e) => {
        setShow(true);
        setVal(e.target.value)
    }

    // submit the comment to the database and update the state variable comment if the comment is added successfully 

    const submit = async (data) => {
        try {
            comment.push(`<h2 className=' inline-block flex align-top px-1 italic text-lg text-cyan-700'>@${userData.name} :  </h2> <div className = ' w-10/12 flex-wrap'> ${data.comment}</div>`)
            setComment(comment)
            const dbPost = await databaseService.updateComment(post.$id, comment)
            if (dbPost) {
                setShow(false)
                setVal("")
            }
            console.log(data);
        } catch (error) {
            throw (error)
        }
    }

    return post ? (
        <div className=" py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={storageService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className=" rounded-xl object-cover max-h-96 w-full"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <Link to={isAuthor ? "/my-posts" : `/posts/${post.userId}/${post.userName}`}>
                        <h2 className=" italic pr-14 text-right">~{post.userName}</h2>
                    </Link>
                </div>
                <div className="browser-css">{parse(post.content)}</div>
                <div className="w-full flex justify-between my-7 shadow-2xl relative border rounded-xl p-2">
                    <h1 className=" text-lg px-3 font-bold text-left"> Discuss </h1>
                    <div className=' float-right'>
                        <Likes  post = {post} userData = {userData} />
                    </div>

                </div>
                <div className='px-10 w-full'>
                    <form onSubmit={handleSubmit(submit)}>
                        <label
                            className='inline-block align-top my-1 px-1 italic text-lg'>
                            {`@${userData.name} :`}
                        </label>

                        <textarea
                            type="text"
                            className='p-2 bg-transparent rounded-sm text-black border-gray-700 outline-none  w-10/12 placeholder-slate-500 text-wrap border-b-2'
                            rows={"auto"} placeholder="writing..."
                            onInput={showSubmit}
                            {...register("comment", {
                                required: true,
                            })}
                            value={val}

                        />{show &&
                            <input type='submit' className=' inline-block align-middle p-2 mx-5 cursor-pointer bg-blue-500 rounded-lg' value="Submit"></input>}
                    </form>
                </div>
                <div className='w-10/12 m-6'>
                    {comment.toReversed().map((com) =>
                        <div className='w-full flex p-4'>{parse(com)}</div>
                    )}
                </div>

            </Container>
        </div>
    ) : null;
}

export default Post;
