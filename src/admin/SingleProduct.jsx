import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
    const {id} = useParams()
    const [product,setProduct] = useState({})
    useEffect(()=> {
     const getSingleProduct = async() => {
        const singleProduct = await axios.get(`http://localhost:8000/api/products/find/${id}`)
        console.log(singleProduct)
     }

    },[id])
  return (
    <div>
      {id}
    </div>
  )
}

export default SingleProduct
