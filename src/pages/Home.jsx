import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { saveData } from '../store/postsSlice'

function Home() {
    const [posts, setPosts] = useState([])
    const postsStatus = useSelector(state => state.posts.status)
    const dispatch = useDispatch()
    const userPosts = useSelector(state => state.posts.userPosts)

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
    },[])

  if (posts.length === 0) {
      return (
          <div className=' w-full py-8 my-36 text-center'>
              <Container>
                  <div className='flex flex-wrap'>
                      <div className='p-2 w-full'>
                          <h1 className='text-2xl font-bold hover:text-gray-500'>
                              Login to read posts
                          </h1>
                      </div>
                  </div>
              </Container>
        </div>
    )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.toReversed().map((post) => (
                        <div key={post.$id} className='p-2 sm:w-1/4 w-full'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home