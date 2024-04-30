import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    const [category, setCategory] = useState([])
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);



    const handleImageUpload = (event) => {
        const files = event.target.files;
        const uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            // Do any validation here if needed
            uploadedImages.push(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews((prevPreviews) => [...prevPreviews, e.target.result]);
            };
            reader.readAsDataURL(file);
        }

        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    };
    useEffect(() => {
        const getCategoryData = async () => {
            const getCategory = await axios.get('http://localhost:8000/api/postcategory')
            setCategory(getCategory.data)
        }
        getCategoryData()
    }, [])
    const handleCheckboxChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('title', title)
        formData.append('post', value)
        formData.append('category', JSON.stringify(selectedCategories))
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            setLoading(true)
            const response = await axios.post('http://localhost:8000/api/post',formData,{
                headers: { token: `Bearer ${localStorage.getItem("accessToken")}`}
            });
            setLoading(false)
          if(response) {
            window.location.reload();
          }
        } catch (error) {
            console.log("hello")
            console.error('Error adding product:', error.message);
        }
    };
   

    return (
        <form className='admin-products-add-container'>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='add-title'
                />
            </div>

            <div className='admin-dis-box'>
                <label htmlFor="description">Description:</label>
                <ReactQuill theme="snow" value={value} onChange={setValue} className='dis-box' />
            </div>
            <div>
                <label htmlFor="Feature Image">Product Image: </label>
                <input
                    type="file"
                    id="productImages"
                    name="productImages"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                />
            </div>
            <div>
                {imagePreviews.map((preview, index) => (
                    <img
                        key={index}
                        src={preview}
                        alt={`Image ${index}`}
                        style={{ width: '100px', height: '100px', margin: '5px' }}
                    />
                ))}
            </div>
            <div>
                <h2>Categories:</h2>
                {
                    category && category.map(category => (
                        <div key={category._id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category._id)}
                                    onChange={() => handleCheckboxChange(category._id)}
                                />
                                {category.name}
                            </label>
                        </div>
                    ))
                }
            </div>
            <button type='submit' onClick={handleSubmit} className='admin-add-product-button'>{loading ? "Adding..." : "Add Post"}</button>
        </form>
    )
}

export default PostCreate
