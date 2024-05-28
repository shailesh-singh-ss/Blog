import React from 'react'
import storageService from '../appwrite/buck'
import { Link } from 'react-router-dom'
import { Tilt } from 'react-tilt'




function PostCard({ $id, title, featuredImage, status }) {

	const defaultOptions = {
		reverse: false,  // reverse the tilt direction
		max: 20,     // max tilt rotation (degrees)
		perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
		scale: 1.05,    // 2 = 200%, 1.5 = 150%, etc..
		speed: 100,   // Speed of the enter/exit transition
		transition: true,   // Set a transition on enter/exit.
		axis: null,   // What axis should be disabled. Can be X or Y.
		reset: true,    // If the tilt effect has to be reset on exit.
		easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
	}


	let bgcolor
	if (status === "active") {
		bgcolor = "bg-gray-100"
	} else {
		bgcolor = "bg-neutral-500 "
	}
	return (
		<Link to={`/post/${$id}`}>
			<Tilt options={defaultOptions} >
				<div className={`w-full ${bgcolor} rounded-xl p-4 h-full `}>
					<div className='w-full justify-center mb-4 '>
						<img src={storageService.getFilePreview(featuredImage)} alt={title} className='rounded-xl object-cover h-72 w-full' />
					</div>
					<h2 className='text-xl font-bold '>
						{title}
					</h2>
				</div>
			</Tilt>
		</Link>
	)
}

export default PostCard