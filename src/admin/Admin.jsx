import React, { useEffect, useState } from 'react'
import { userRequest } from '../requestMethods';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Admin.scss'
import axios from 'axios';

const Admin = () => {
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('')
    const [stock, setStock] = useState(null)
    const [isVariable, setIsVarible] = useState(false);
    const [variable, setVariable] = useState([])
    const [variableValues, setVariableValues] = useState({
        name: '',
        regularPrice: 0,
        salePrice: 0,
    })
    const [salePrice, setSalePrice] = useState(0)
    const [regularPrice, setRegularPrice] = useState(0)
    const [categoryWithNull, setCategoryWithNull] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading,setLoading] = useState(false)

    const handleChange = (event) => {
        const value = event.target.value;
        if (value === "Variable Product") {
            setIsVarible(true)
        }
        else {
            setIsVarible(false)
        }
    };
    const handleStockChange = (event) => {
        const value = event.target.value;
        if (value === "true") {
            setStock(true)
        }
        else {
            setStock(false)
        }
    };
    const handlePriceChange = (e) => {
        let { name, value } = e.target;

        if (name === 'regularPrice') {
            value = parseInt(value)
        }
        if (name === 'salePrice') {
            value = parseInt(value)
        }
        setVariableValues({ ...variableValues, [name]: value });
    };

    const handleAddVariable = (e) => {
        e.preventDefault()
        setVariable([...variable, variableValues])
        setVariableValues({
            name: '',
            regularPrice: 0,
            salePrice: 0
        })
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
    const hierarchicalCategories = topLevelCategories?.map(category => {
        const topLevelCategory = { ...category };
        const children = findChildCategories(category._id);
        if (children.length > 0) {
            topLevelCategory.children = children;
        }
        return topLevelCategory;
    });

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
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews((prevPreviews) => [...prevPreviews, e.target.result]);
            };
            reader.readAsDataURL(file);
        }

        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    };

    console.log(salePrice)


    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', value)
        formData.append('category', JSON.stringify(selectedCategories))
        images.forEach((image) => {
            formData.append('images', image);
        });
        formData.append('stock', stock)
        formData.append('isVariable', isVariable)

        formData.append('variable', JSON.stringify(variable))
        formData.append('salePrice', JSON.stringify(salePrice))
        formData.append('regularPrice', JSON.stringify(regularPrice))

        try {
            setLoading(true)
            const response = await axios.post('http://localhost:8000/api/products',formData,{
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
    const handleCheckboxChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const renderCategories = (categories) => {
        return categories.map(category => (
            <div key={category._id}>
                <label>
                    {'\u00A0'.repeat(category.level * 4)}<input
                        type="checkbox"
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleCheckboxChange(category._id)}
                        style={{ marginRight: "5px" }}
                    />
                    {category.name}
                </label>
                {category.children && renderCategories(category.children)}
            </div>
        ));
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
            {/*///////////////////////////////////////////////////////////////////////////////////////// */}
            <div>
                <select name="" id="" onChange={handleChange} className='border border-gray-600 outline-none'>
                    <option value="">Select Product Type</option>
                    <option value="Simple Product">Simple Product</option>
                    <option value="Variable Product">Variable Product</option>
                </select>
                {
                    isVariable ?
                        <div style={{ marginTop: "20px" }}>
                            <label>Variable : </label>
                            <input type="text" onChange={handlePriceChange} name='name' value={variableValues.name} className='border border-gray-600 outline-none' />
                            <label>Regular Price: </label>
                            <input type="Number" onChange={handlePriceChange} name='regularPrice' value={variableValues.regularPrice} className='border border-gray-600 outline-none' />
                            <label>Sale Price</label>
                            <input type="Number" onChange={handlePriceChange} name='salePrice' value={variableValues.salePrice} className='border border-gray-600 outline-none' />
                            <button onClick={(event) => handleAddVariable(event)} className='border border-gray-600 outline-none mx-2'>Add Variation</button>
                            {
                                variable.map((variableItems) => {
                                    return <div>
                                        <p>{variableItems.name}</p>
                                        <p>{variableItems.regularPrice}</p>
                                        <p>{variableItems.salePrice}</p>
                                    </div>
                                })
                            }
                        </div> : <div>
                            <label>Regular Price: </label>
                            <input type="Number" onChange={(e) => setRegularPrice(e.target.value)} name='regularPrice' value={regularPrice} className='border border-gray-600 outline-none' />
                            <label>Sale Price</label>
                            <input type="Number" onChange={(e) => setSalePrice(e.target.value)} name='salePrice' value={salePrice} className='border border-gray-600 outline-none' />
                        </div>
                }

            </div>
            {/* ////////////////////////////////////////////////////////////////////////////// */}
            <div>
                <h2>Categories:</h2>
                {hierarchicalCategories && renderCategories(hierarchicalCategories)}
            </div>
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div>
                <label htmlFor="productImages">Product Images: </label>
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
                <select name="" id="" onChange={handleStockChange} className='border border-gray-600 outline-none'>
                    <option value="">Product Stock</option>
                    <option value="true">Product In stock</option>
                    <option value="false">Product Out Of Stock</option>
                </select>
            </div>
            <button type='submit' onClick={handleSubmit} className='admin-add-product-button'>{loading ? "Adding..." : "Add Product"}</button>
        </form>
    );
}

export default Admin
