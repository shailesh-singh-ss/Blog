import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/config'
import storageService from '../appwrite/buck'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { removeData } from '../store/postsSlice'

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else navigate("/")
            })
        } else navigate("/")
    }, [slug, navigate])

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteFile(post.featuredImage);
                dispatch(removeData())
                navigate("/")
            }
        })
    }

    return post ? (
        <div className=' py-8'>
            <Container>
                <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                    <img
                        src={storageService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className=' rounded-xl object-cover max-h-96 w-full'
                    />

                    {isAuthor && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`} >
                                <Button bgColor='bg-green-500' className='mr-3'>
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor='bg-red-500' onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>
                        {post.title}
                    </h1>
                    <h2 className=' italic text-right'>
                        ~{post.userName}
                    </h2>
                </div>
                <div className='browser-css'>
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post