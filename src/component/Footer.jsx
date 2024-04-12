import React from 'react'
import Accordian from './Accordian'
import { FaTruck } from "react-icons/fa";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { MdOutlineVerified } from "react-icons/md";
import payment from "../demo/custumer_img/payments.png"
import mobpayment from "../demo/custumer_img/mob-payments.png"

const Footer = () => {
  return (
    <div>
      <div className="sm:flex sm:mx-14  items-center  my-3 hidden ">
        <div className=" border border-1 flex flex-col items-center  py-[34px] px-10 " >
        <FaTruck className="text-[60px] text-green-600"/>
        <h1 className="font-[500]">Free Shipping</h1>
        <h1 className="font-[500]"> On Order Above 899</h1>

        </div>
        <div className="py-[37px] px-11 border border-1 flex justify-between items-center gap-[600px]  ">
          <div className="flex flex-col justify-center items-center">
        <PiHandbagSimpleFill className="text-[60px] text-green-600 "/>
        <h1 className="font-[500]">COD Available</h1>
        <p className="text-[12px] font-[500]">@ Rs. 40 Per Order</p>
        </div>
       
        
        <div className="flex flex-col justify-center items-center gap-3">
          <h1>Have Queries or Concerns?</h1>
          <button className="border-green-600 border-2 px-5 py-2 rounded-xl font-semibold text-green-600 hover:bg-green-600 hover:text-white">Contact Us</button>
        </div>
        </div>
      </div>
      <div className="sm:mx-14 border border-1 py-10 px-8 sm:flex flex-col gap-2 hidden ">
        <h1>PAYMENT</h1>
        <p className="flex gap-2 items-center text-green-600 font-[500]"><MdOutlineVerified className="" />100% Payment Protection, Easy Return Policy</p>
        <img src={payment} alt="" className="w-[700px]" />

      </div>
      <div className="sm:mx-14 border border-1 py-10 px-8 sm:flex  gap-[250px] hidden cursor-pointer">
        <div className="flex flex-col gap-4">
         <h1 className="text-[20px]">USEFUL LINKS</h1> 
          <div className="text-[16px] flex flex-col gap-3 ">
            <h2>Privacy Policy</h2>
            <h2>Returns</h2>
            <h2>Terms & Conditions</h2>
            <h2>FAQs</h2>
            <h2>We’re Safe</h2>
            <h2>Track Order</h2>
            <h2>Contact Us</h2>
            <h2>About Us</h2>
          </div>
        </div>
        <div className="flex flex-col gap-4">
         <h1 className="text-[20px]">CATEGORIES</h1> 
          <div className="text-[16px] flex flex-col gap-3">
            <h2>Men</h2>
            <h2>Women</h2>
            <h2>Baby</h2>
            
          </div>
        </div>
        <div className="flex flex-col gap-4">
         <h1 className="text-[20px]">MY ACCOUNT</h1> 
          
          <div className="text-[16px] flex flex-col gap-3">
            <h2>Account</h2>
            <h2>Orders</h2>
            <h2>Addresses</h2>
            
          </div>
        </div>

      </div>
      {/* for mobile */}
      <div className="sm:hidden block mx-5">
      <div className=" sm:hidden flex flex-col gap-6 my-3">
        <div className="flex justify-between w-full gap-3">
        <div className=" flex  items-center gap-3 " >
        <FaTruck className="text-[40px] text-gray-500"/>
        <div >
        <h1 className="font-[500] text-[14px]">Free Shipping</h1>
        <h1 className="font-[500] text-[10px]"> On Order Above 899</h1>
        </div>
        </div>
        <div className=" flex justify-between items-center ">
          <div className=" flex justify-center items-center gap-3">
        <PiHandbagSimpleFill className="text-[40px] text-gray-500 "/>
        <div>
        <h1 className="font-[500] text-[14px]">COD Available</h1>
        <p className="text-[10px] ">@ Rs. 40 Per Order</p>
        </div>
        </div>
        </div>
        </div>
        
        <div className="flex flex-col justify-center items-center gap-3">
          <h1>Have Queries or Concerns?</h1>
          <button className="border-green-600 border-2 px-5 py-2 rounded-xl font-semibold text-green-600 hover:bg-green-600 hover:text-white">Contact Us</button>
       
        </div>
      </div>
      </div>
      <div className="  py-5 mx-5 sm:hidden flex flex-col items-center gap-2 text-center  ">
        <h1 className="text-[18px]">Using For Pay</h1>
        <p className="flex gap-2 items-center text-green-600 font-[500] text=[12px] m-auto"><MdOutlineVerified className="" />100% Payment Protection</p>
        <img src={mobpayment} alt="" className="w-[800px]" />

      </div>
      <Accordian/>

    </div>
  )
}

export default Footer
