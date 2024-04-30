import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";


const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const handleProducts = async () => {
            const response = await axios.get(`http://localhost:8000/api/post`)
            setPosts(response.data)
        }
        handleProducts()
    }, [])

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:8000/api/post/${id}`,{
            headers: { token: `Bearer ${localStorage.getItem("accessToken")}` }
        })
        setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
    }
    

    return (
        <div className='adminallproducts'>
            {
                posts.map((post) => {
                    return <div key={post._id} className='product'>
                        <img src={`http://localhost:8000/${post.img[0]}`} alt="" className='product-img' />
                        <p>{post.title}</p>
                        <div>
                            <MdDelete onClick={() => handleDelete(post._id)} />
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default AllPosts
