import React from 'react'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className='w-full m-auto bg-gray-100 flex lg:justify-center lg:items-center justify-start ' style={{ height: "calc(100vh - 95px)" }}>
            <div className='shadow-lg shadow-white lg:w-[50%] w-[90%] mx-auto mt-4 bg-white flex flex-col justify-center items-center py-5 h-[400px]'>
                <div className='text-[#00AFEF] text-7xl font-thin'><IoIosCheckmarkCircleOutline /></div>
                <h1 className='text-base font-medium mt-3'>Hey Dear...   </h1>
                <div className='text-2xl font-bold mt-2'>Your Order Is Confirmed!</div>
                <div className='text-base font-medium mt-1'>You Will Get Your Order Shortly</div>
                <Link to={'/'}><button className='bg-[#00AFEF] text-white px-[15px] py-[5px] rounded shadow-md mt-4 font-medium'>Shop More</button>
                </Link>
            </div>
        </div>
    )
}

export default Success
