import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { userRequest } from '../requestMethods'
import axios from 'axios'

const Payment = () => {
    const cart = useSelector(state => state.cart)
    const [total, setTotal] = useState(null)

    const navigate = useNavigate()

    const { resId, address } = useSelector(state => state.id)
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [pathname, setPathname] = useState(location.pathname)
    const ids = pathname.substring(pathname.lastIndexOf('/') + 1)
    const [message, setMessage] = useState('')

    const handleclick = () => {
        if (resId && resId === ids) {
            makeRequest();
        }
        else {
            setMessage('something went try again')
        }
    }
    const handleOrderclick = () => {
        if (resId && resId === ids) {
            makeCodRequest();
        }
        else {
            setMessage('something went try again')
        }
    }
    useEffect(() => {
        const sum = cart.products && cart.products.reduce((acc, cur) => {
            const salePrice = cur.selectedVariant && cur.selectedVariant.salePrice ? cur.selectedVariant.salePrice : cur.product.salePrice;
            return acc += cur.amount * salePrice
        }, 0)
        setTotal(sum)

    }, [cart.products])
    const makeCodRequest = async (req, res) => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:8000/api/cod/payment/${ids}`,{
                headers: { token: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            if (response.status === 200) {
                navigate(`/success/PAYMENT_SUCCESS/${response.data.cod.transationId}`)
            }
        } catch (error) {
            console.error("Error making request:", error);
        } finally {
            setLoading(false);
        }
    } 
    const makeRequest = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:8000/api/checkout/payment/${ids}`, {
                data: {
                    amount: total,
                    id: ids
                }
            }, {
                headers: { token: `Bearer ${localStorage.getItem("accessToken")}` }
            });
            window.location.href = response.data;
        } catch (error) {
            console.error("Error making request:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div style={{ border: "1px dashed #757575" }} className='w-[90%] m-auto mt-4 p-2'>
            <div>
                <h1 className='text-lg font-medium'>Address :</h1>
                <p className='text-sm font-medium'>{address.city}, {address.pincode}, {address.address}</p>
                <p className='text-sm font-medium'>{address.city}, {address.pincode}</p>
                <p className='text-sm font-medium'>Mobile Number : {address.phone}</p>
            </div>
            <div className='text-xl font-medium mt-2'>
                Total Amount To pay <span className='bg-[#417505] text-white px-2 py-1 rounded'>₹ {total}</span>
            </div>
            <div>
                <button className='text-white bg-[#00ADEC] px-[15px] py-[10px] mt-3 rounded shadow-md font-medium' onClick={handleOrderclick}>COD (Cash On Dilevery)</button>
            </div>
            <div>
                <button onClick={handleclick} className='text-white bg-[#00ADEC] px-[15px] py-[10px] mt-3 rounded shadow-md font-medium'>Pay With Phonepe</button>
            </div>
        </div>
    )
}

export default Payment
