import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { saveData } from '../store/postsSlice'

function MyPosts() {
    const [posts, setPosts] = useState([])
    const postsStatus = useSelector(state => state.posts.status)
    const dispatch = useDispatch()
    const userPosts = useSelector(state => state.posts.userPosts)
    const userData = useSelector(state => state.auth.userData)
    
    useEffect(() => {
        if (postsStatus) {
            setPosts(userPosts.documents)
        } else {
            databaseService.getPosts([]).then((userPosts) => {
                if (userPosts) {
                    setPosts(userPosts.documents)
                    dispatch(saveData(userPosts))
                }
            })
        }
        
    }, [])
    

    
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.toReversed().map((post) => ((post.userId === userData.$id) &&
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default MyPosts