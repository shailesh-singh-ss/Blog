import React from 'react'
import storageService from '../appwrite/buck'
import { Link } from 'react-router-dom'


function PostCard({ $id, title, featuredImage, status }) {
  let bgcolor
  if (status === "active") {
      bgcolor = "bg-gray-100"
  } else {
      bgcolor = "bg-gray-300"
  }
  return (
    <Link to={`/post/${$id}`}>
      <div className= {`w-full ${bgcolor} rounded-xl p-4 h-full `}>
        <div className='w-full justify-center mb-4 '>
          <img src={storageService.getFilePreview(featuredImage)} alt={title} className='rounded-xl object-cover h-72 w-full' />
        </div>
        <h2 className='text-xl font-bold '>
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard