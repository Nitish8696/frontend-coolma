import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";


const Category = () => {
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categoryWithNull, setCategoryWithNull] = useState([])
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState({
        name: '',
        slug: '',
        parentCategory: null,
        level: 0,
    });

    const handleSubmit = async (e) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append("name",categoryData.name)
        formData.append("slug",categoryData.slug)
        formData.append("parentCategory",categoryData.parentCategory)
        formData.append("level",categoryData.level)
        images.forEach((image) => {
            formData.append('images', image);
        });
        const addCategory = await axios.post('http://localhost:8000/api/category/', formData)
    };
    useEffect(() => {
        const getCategoryData = async () => {
            const getCategory = await axios.get('http://localhost:8000/api/category/')
            setCategoryWithNull(getCategory.data)
        }
        getCategoryData()
    }, [])
    const handleImageUpload = (event) => {
        const files = event.target.files;
        const uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            // Do any validation here if needed
            uploadedImages.push(file);
            console.log(uploadedImages)
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews((prevPreviews) => [...prevPreviews, e.target.result]);
            };
            reader.readAsDataURL(file);
        }

        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'level') {
            value = parseInt(value)
        }
        setCategoryData({ ...categoryData, [name]: value });
    };

    let renderCategories = (categories) => {
        return categories?.map(category => {
            return <React.Fragment key={category._id}>
                <option value={category._id}>
                    {'\u00A0'.repeat(category.level * 4)}
                    {category.name}
                </option>
                {renderCategories(category.children)}
            </React.Fragment>

        })
    };
    const handleCategoryDelete = async (id) => {
        setLoading(true)
        const response = await axios.delete(`http://localhost:8000/api/category/${id}`)
        if (response.data.status === 200) {
            window.location.reload();
        }
        setLoading(false)
    }
    function findChildCategories(parentId) {
        const children = [];
        categoryWithNull.forEach(category => {
            if (category.parentCategory === parentId) {
                const childCategory = { ...category };
                const subChildren = findChildCategories(category._id);
                if (subChildren.length > 0) {
                    childCategory.children = subChildren;
                }
                children.push(childCategory);
            }
        });
        return children;
    }

    // Find top-level categories
    const topLevelCategories = categoryWithNull?.filter(category => category.parentCategory === null);

    // Build hierarchical structure
    const hierarchicalCategories = topLevelCategories.map(category => {
        const topLevelCategory = { ...category };
        const children = findChildCategories(category._id);
        if (children.length > 0) {
            topLevelCategory.children = children;
        }
        return topLevelCategory;
    });

    console.log(images)

    let renderCategoriesRight = (categories) => {
        if (loading) {
            return <p>...Loading</p>
        }
        else {
            return (categories?.map((category) => {
                return <React.Fragment key={category._id}>
                    <div key={category._id} className='flex items-center justify-between border py-2 px-2' style={{ display: "flex" }}>
                        <div style={{ paddingLeft: category.level * 20 }}>{category.name}</div>
                        <div className=' cursor-pointer' onClick={() => handleCategoryDelete(category._id)}><MdDelete /></div>
                    </div>
                    {renderCategoriesRight(category.children)}
                </React.Fragment>
            }))
        }
    }
    return (
        <>
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
                    <div>
                        <label>
                            Slug:
                            <input
                                type="text"
                                name="slug"
                                value={categoryData.slug}
                                onChange={handleChange}
                                required
                                className=' outline-none border'
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Parent Category:
                            <select
                                name="parentCategory"
                                value={categoryData.parentCategory}
                                onChange={handleChange}
                                className=' outline-none border'
                            >
                                <option value="">Select Parent Category</option>
                                {renderCategories(hierarchicalCategories && hierarchicalCategories)}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Level Of Category
                        </label>
                        <select name="level" id="" value={categoryData.level} onChange={handleChange} className=' outline-none border'>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="productImages">Category Images: </label>
                            <input
                                type="file"
                                id="productImages"
                                name="categoryimage"
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
                    </div>
                    <button type="submit" className=' outline-none rounded shadow-md p-2 w-[30%] bg-indigo-400 text-white'>Add New Category</button>
                </form>
                <div className='w-[50%]'>
                    {
                        <div className='w-[100%]'>
                            <div>
                                <div className='border py-1 px-2'>Category Name</div>
                            </div>
                            {renderCategoriesRight(hierarchicalCategories)}
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Category
