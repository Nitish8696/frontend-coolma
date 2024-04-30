import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavLinks from "./NavLinks";
import { addSearchTerm } from "../Ultiles/Searchslices"
import NavlinksMobile from "./NavlinksMobile";

const Navbar = () => {
  const userloggedin = useSelector((state) => state.userloggedin);

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSerchTerm] = useState("");

  const removeUser = () => {
    localStorage.removeItem('user');
  }
  const onSerach = () => {
    dispatch(addSearchTerm(searchTerm))
    setSerchTerm("")
  }


  return (
    <div className="w-full">
      <div className="w-full border-b ">
        <div
          style={{ backgroundColor: "rgb(240, 68, 56)" }}
          className="flex sm:justify-between items-center text-white text-sm px-[25px] py-[4px]"
        >
          <h1 className="hidden sm:block">
            Asia's 1st Brand with MADE SAFE Certified Products
          </h1>
          <h1 className="sm:text-sm text-[9px] m-auto">
            Get Upto 25% Off On Orders Above Rs. 599 | Use Code: SAVE25 | SHOP
            NOW
          </h1>
          <IoPerson className="hidden sm:block cursor-pointer sm:w-[20px] h-[20px]" />
        </div>
        <div className="sm:w-[85%] w-full flex justify-between sm:px-5 px-3 m-auto items-center sm:py-2 ">
          <BsMenuButtonWideFill
            className="w-8 h-8 text-[#00AFEF] sm:hidden"
            onClick={() => setIsOpen(true)}
          />
          <div
            className={`md:hidden bg-white fixed w-[100%] top-0 overflow-y-auto bottom-0 py-4 pl-4 z-[999] duration-500 ${isOpen ? "left-0" : "-left-full"
              } transition-all ease-in-out`}
          >
            <div>
              <NavlinksMobile />
            </div>
            <ImCross
              className="absolute text-2xl top-5 left-[330px]"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="sm:w-[40px] w-[70px] object-cover sm:h-[30px]">
            <Link to="/"><img
              src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png"
              alt=""
            /></Link>
          </div>
          <div className="sm:flex items-center rounded-md w-[70%] mx-5 hidden">
            <input
              type="text"
              placeholder="Search..."
              className="py-1 focus:outline-none px-2 rounded w-full border"
              value={searchTerm}
              onChange={(e) => setSerchTerm(e.target.value)}
            />
            <Link to="/search">
              <button className="bg-[#00AFEF] text-white font-bold py-[5px] px-4 rounded border-1 border-blue-500"
                onClick={onSerach}
              >
                Search
              </button>
            </Link>
          </div>
          <div className="flex items-center sm:justify-evenly sm:w-[15%] w-[20%] justify-between sm:gap-5">
            <div className="flex items-center font-[500]">
              <Link to="/blog"> <h1 className="mr-2 sm:block hidden" onClick={removeUser}>Blogs</h1></Link>
            </div>
            <div className="flex items-center font-[500]">
              <Link to="/cart"> <h1 className="mr-2 sm:block hidden">Cart</h1></Link>
              <Link to="/cart">
                <div className="relative">
                  <IoCartOutline className="w-6 h-6 text-[#00AFEF]" />
                  <h1 className="absolute top-[-10px] left-[14px] bg-[#00AFEF] px-[6px] py-[2px] text-white rounded-full text-[10px]">
                    {cart.products.length}
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center font-[500]">
              {userloggedin ?
                <>
                  <Link to="/login"> <h1 className="mr-2 sm:block hidden" onClick={removeUser}>Logout</h1></Link>
                  <Link to="/login">
                    <IoPerson className="w-6 h-6 text-[#00AFEF]" />
                  </Link>
                </> :
                <>
                  <Link to="/login"> <h1 className="mr-2 sm:block hidden">Login</h1></Link>
                  <Link to="/login">
                    <IoPerson className="w-6 h-6 text-[#00AFEF]" />
                  </Link>
                </>}
            </div>
          </div>
        </div>
        <hr />
        <div className="items-center justify-center my-0 sm:flex hidden">
          <NavLinks />
        </div>
        <div className="sm:hidden items-center rounded-md mx-1 py-1 flex">
          <input
            type="text"
            placeholder="Search..."
            className="py-1 focus:outline-none px-2 rounded w-full border"
            value={searchTerm}
            onChange={(e) => setSerchTerm(e.target.value)}
          />
          <Link to="/search">
            <button className="bg-[#00AFEF] text-white font-bold py-[5px] px-4 rounded border-1 border-blue-500"
              onClick={onSerach}
            >
              Search
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
