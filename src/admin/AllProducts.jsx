import React, { useEffect, useState } from 'react'
import './AllProducts.scss'
import { MdDelete } from "react-icons/md";
import axios from 'axios';


const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)


    useEffect(() => {
        const handleProducts = async () => {
            const response = await axios.get(`http://localhost:8000/api/products?page=${page}&limit=${limit}`)
            setProducts(response.data)
        }
        handleProducts()
    }, [page])



    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:8000/api/products/${id}`,{
            headers: { token: `Bearer ${localStorage.getItem("accessToken")}` }
        })
        setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
    }
    const handlePaginationClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className='adminallproducts'>
            {
                products.map((product) => {
                    return <div key={product._id} className='product'>
                        <img src={`http://localhost:8000/${product.img[0]}`} alt="" className='product-img' />
                        <p>{product.title}</p>
                        <div>
                            <MdDelete onClick={() => handleDelete(product._id)} />
                        </div>
                    </div>
                })
            }
            <div className="adminpagination">
                <button onClick={() => handlePaginationClick(page - 1)} disabled={page === 1} className='adminprevious'>Previous</button>
                {[...Array(10)].map((_, index) => (
                    <button key={index + 1} onClick={() => handlePaginationClick(index + 1)} className='paginationnumbers'>{index + 1}</button>
                ))}
                <button onClick={() => handlePaginationClick(page + 1)} className='adminprevious'>Next</button>
            </div>
        </div>
    )
}

export default AllProducts
