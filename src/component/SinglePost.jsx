import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";


const SinglePost = () => {
    const { id } = useParams()
    const [singlePost, setSinglePost] = useState({})
    useEffect(() => {
        const getSinglePost = async () => {
            const response = await axios.get(`http://localhost:8000/api/post/find/${id}`)
            setSinglePost(response.data)
        }
        getSinglePost()
    }, [id])

    return (
        <div>
            {
                singlePost && <div className='p-2 sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-[80%] m-auto'>
                    <h1 className='text-xl text-center pb-2'>{singlePost.title}</h1>
                    <img src={`http://localhost:8000/${singlePost?.img}`} alt="" className='sm:w-[700px] h-[350px] object-cover' />
                    <div className='mt-2 mb-6'>
                        <div className='flex justify-start items-center gap-2'>
                            <FaUserCircle className='text-4xl text-gray-400'/>
                            <p>Coolma</p>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: singlePost?.content }} className="mt-2"></div>
                </div>
            }
        </div>
    )
}

export default SinglePost
