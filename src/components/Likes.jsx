import React, { useState } from 'react'

function Likes({post}) {
    const [likes, setLikes] = useState(post.likes);

    const Submit = async (data) => {
        
    }
 

  return (
    <div>Likes</div>
  )
}

export default Likes