import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/config';

function Likes({post,userData}) {
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(false);
    const [likeColor, setLikeColor] = useState("")
    const [dislikeColor, setDislikeColor] = useState("")

    const submitLike = async () => { 
        try {
            likes.push(userData.$id);
            setLikes(likes);
            const update = await databaseService.updateLike(post.$id, likes, dislikes)
            if (update) {
                setStatus(true);
                setLikeColor ("text-green-300")
                setCount(likes.length - dislikes.length)
            }
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }

    const submitDislike = async () => {
        try {
            dislikes.push(userData.$id);
            setDislikes(dislikes);
            const update = await databaseService.updateLike(post.$id, likes, dislikes);
            if (update) {
                setStatus(true);
                setDislikeColor ("text-red-300")
                setCount(likes.length - dislikes.length)
            }
        } catch (error) {
            console.log(error)
            throw(error)
        }
    }

    useEffect(() => { 
        setLikes(post.likes);
        setDislikes(post.dislikes);
        likes.map((id) => {
            if (id === userData.$id) {
                setStatus(true);
                setLikeColor ("text-green-300")
            }
        })
        dislikes.map((id) => {
            if (id === userData.$id) {
                setStatus(true);
                setDislikeColor ("text-red-300")
            }
        })
        setCount(likes.length - dislikes.length);
    },[post])

  return (
    <div className='w-full flex text-2xl px-3 font-bold gap-4 '>
      <button onClick={ submitLike } disabled = {status} className={likeColor}>△</button>
      <button onClick={ submitDislike } disabled = {status} className={dislikeColor}>▽</button>
      <p className={count>=0 ? 'text-green-600' : 'text-red-600'}>{count}</p>
    </div>
  )
}

export default Likes