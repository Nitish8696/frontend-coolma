import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";


const CategoryPost = () => {
    const [category, setCategory] = useState([])
    const [loading,setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState({
        name: '',
    });
    const handleSubmit = async (e) => {
        
        const formData = new FormData();
        formData.append("name", categoryData.name)
        const addCategory = await axios.post('http://localhost:8000/api/postcategory', {
            name: categoryData.name
        })
    };
    const handleChange = (e) => {
        let { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
    };
    useEffect(() => {
        const getCategoryData = async () => {
            const getCategory = await axios.get('http://localhost:8000/api/postcategory')
            setCategory(getCategory.data)
        }
        getCategoryData()
    }, [])
    const handleCategoryDelete = async (id) => {
        setLoading(true)
        const response = await axios.delete(`http://localhost:8000/api/postcategory/${id}`)
        if (response.data.status === 200) {
            window.location.reload();
        }
        setLoading(false)
    }
    return (
        <div style={{ display: "flex", gap: "20px" }} className='w-[80%] m-auto mt-2'>
            <form onSubmit={handleSubmit} className='w-[50%] flex flex-col gap-2'>
                <div>
                    <label>
                        Category Name:
                        <input
                            type="text"
                            name="name"
                            value={categoryData.name}
                            onChange={handleChange}
                            required
                            className=' outline-none border'
                        />
                    </label>
                </div>
                <button type="submit" className=' outline-none rounded shadow-md p-2 w-[30%] bg-indigo-400 text-white'>Add New Category</button>
            </form>
            <div className='w-[50%]'>
                {
                    <div className='w-[100%]'>
                        <div>
                            <div className='border py-1 px-2'>Category Name</div>
                        </div>
                        <div>
                            {
                                category?.map((category) => {
                                    return <div key={category._id} className='flex items-center justify-between border py-2 px-2' style={{ display: "flex" }}>
                                        <div>{category.name}</div>
                                        <div className=' cursor-pointer' onClick={() => handleCategoryDelete(category._id)}><MdDelete /></div>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                }
            </div>
        </div>

    )
}

export default CategoryPost
