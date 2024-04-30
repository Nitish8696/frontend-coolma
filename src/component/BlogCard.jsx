import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ post }) => {
    return (
        <Link to={`/singlepost/${post._id}`}>
            <div className='flex gap-2 mt-3 border-b'>
                <img src={`http://localhost:8000/${post.img[0]}`} alt="" className='w-[130px] h-[100px] object-fill' />
                <div>
                    <h1 className='underline'>{post.title}</h1>
                    <Link to={`/singlepost/${post._id}`}>
                        <button className='bg-[#00AFEF] text-white px-4 py-1 mt-1'>
                            Read More
                        </button>
                    </Link>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
