import React, { useEffect } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import GoogleTranslate from './GoogleTranslate';
import { useState } from 'react';

const Rent = () => {
    const [isOpen,setIsOpen] = useState(false)
    useEffect(() => {
      setTimeout(()=>{
        setIsOpen(true)
      },1000)
    }, [])
    return (
        <div>
            <div>
                hello
            </div>
            {isOpen && <div className='bg-gray-200 w-full h-[100vh] flex items-center justify-center bg-opacity-50 absolute top-0 left-0'>
                <div className='bg-white w-[350px] h-[350px] py-3 px-2 flex flex-col items-center justify-center relative'>
                    <RxCrossCircled className='absolute top-2 right-2 text-[30px] cursor-pointer' onClick={()=>setIsOpen(false)}/>
                    <p className=' font-bold'>Select Language Hind,English,Gujrati</p>
                    <GoogleTranslate />
                </div>
            </div>}
        </div>
    )
}

export default Rent
