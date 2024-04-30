import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from './ProductCard'

const ProductByCategory = () => {
  const [products,setProducts] = useState([])
  const {id} = useParams()
  useEffect(()=>{
    const getProductByCategory = async() =>{
      const product = await axios.get(`http://localhost:8000/api/products/?category=${id}`)
      setProducts(product.data)
    }
    getProductByCategory()
  },[id])
  
  return (
    <div className=' grid sm:grid-cols-4 grid-cols-2 max-w-[1140px] mx-auto mt-2'>
      {
        products && products.map((product) => {
          return <ProductCard key={product._id} product={product}/>
        })
      }
    </div>
  )
}

export default ProductByCategory
