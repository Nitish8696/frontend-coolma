import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import products from "../demo/Products";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const Therapy = () => {
  

  return (
    <div className="py-4 w-full sm:flex justify-evenly items-center m-auto">
      <div className="px-5 py-3 sm:w-[30%] w-full flex sm:block justify-between items-center">
        <h1 className="sm:text-4xl text-2xl font-bold sm:pb-5 ">Therapy Products</h1>
        <p className="font-[500] pb-5 sm:block hidden">
          Explore best-selling safe, natural, and 100% toxin-free baby and
          beauty products from Mamaearth. Get amazing deals and start your
          toxin-free skin, hair, and baby care journey
        </p>
        <button className="sm:px-7 px-3 sm:py-3 sm:bg-[#00AFEF] sm:text-white text-[#00AFEF] border border-[#00AFEF] sm:rounded-none rounded-xl">View All</button>
      </div>
      <div className="sm:w-[60%] w-[95%] sm:m-0 m-auto">
        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={"desktop"}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          className="color-black"
        >
          {products.map((product, index) => (
                        <Link to={`/product/${product.name}`} key={index}>

            <div className="rounded-[10px] border flex flex-col mx-2 relative">
            <div className="relative">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-[200px] object-contain rounded-xl "
              />
            </div>
              <div className="mt-4 m-auto text-center p-2">
                <h2 className="text-sm font-semibold">{product.name}</h2>
                <p className="text-gray-600 font-medium text-sm">{product.category}</p>
                <p className="text-gray-700 font-bold text-sm py-3">{product.price}</p>
               
              </div>
              <button className="bg-[#00AFEF] text-white py-3 text-center">ADD TO CART</button>
              <h1 className="bg-[#00AFEF] text-white text-[12px] font-[600] w-[100px] text-center px-2 py-1 absolute rounded-tl-lg rounded-br-lg uppercase">Therapy</h1>
            </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Therapy;
