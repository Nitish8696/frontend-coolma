import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { publicRequest, userRequest } from '../requestMethods'
import { Link } from 'react-router-dom'
// import scooter from '../cate_image/Scooter_express.jpg'

const Search = () => {
    const { searchTerm } = useSelector(state => state.id)
    console.log(searchTerm)
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)


    useEffect(() => {
        console.log(searchTerm)
        const handleSearchProducts = async () => {
            const response = await publicRequest.get(`/search?q=${searchTerm}&page=${page}&limit=${limit}`)
            setProducts(response.data)
        }
        handleSearchProducts()
    }, [searchTerm, page])

    const handlePaginationClick = (pageNumber) => {
        setPage(pageNumber);
    };


    return (
        <>
            <div className='w-[90%] m-auto mt-4'>
                <h1 className='text-3xl font-semibold'>Search Results</h1>
                <p className='font-light text-gray-500'>Freshest just for you</p>

                <div className='w-[90%] mx-auto mt-4 grid lg:grid-cols-2 gap-2 lg:mb-[50px]'>
                    {
                        products.map((product) => {
                            return <div key={product._id} className='px-2 py-2 rounded'>
                                <Link to={`/product/${product._id}`}>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2'>
                                            <img src={`http://localhost:5000/${product.img[0]}`} alt="" className='object-cover w-[70px] h-[70px] rounded' />
                                            <div>
                                                <p className='text-sm mt-1 font-normal text-gray-500'>{product.title}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-end gap-2'>
                                            <img src={scooter} alt="" className='w-[20px] h-[20px]' />
                                            <button className='p-2 text-[#D11243] text-xs font-medium rounded' style={{ border: "1.5px solid #D11243" }}>Add to Cart</button>
                                        </div>
                                    </div>
                                    <hr className='mt-2' />
                                </Link>
                            </div>
                        })
                    }

                </div>
                <div className="flex gap-[10px]">
                    <button onClick={() => handlePaginationClick(page - 1)} disabled={page === 1} className='px-[10px] py-[5px] text-white bg-[#D11243] cursor-pointer'>Previous</button>
                    {[...Array(10)].map((_, index) => (
                        <button key={index + 1} onClick={() => handlePaginationClick(index + 1)} className='px-[8px] py-[5px] text-white bg-[#00c3ff] cursor-pointer'>{index + 1}</button>
                    ))}
                    <button onClick={() => handlePaginationClick(page + 1)} className='px-[10px] py-[5px] text-white bg-[#D11243] cursor-pointer'>Next</button>
                </div>
            </div>
        </>
    )
}

export default Search