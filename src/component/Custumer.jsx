import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import products from "../demo/Products";
import Customer from "../demo/Customer";
import background from "../demo/custumer_img/background.png";
import { FaStar } from "react-icons/fa";
import underline from "../demo/custumer_img/strip2x.png";

import Accordion from "./Accordian";


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
    items: 1,
    slidesToSlide: 1,
  },
};

const Custumer = () => {
  return (
    <div >
      <h1 className="text-center sm:text-[30px] text-[20px] font-[600] pb-3">
        What Our Customers Say
      </h1>
      <img src={underline} alt="" className="sm:w-[40%] w-[70%] m-auto" />

      <div
        className="py-4 w-full px-[50px] flex justify-evenly items-center m-auto  "
        style={{  backgroundImage: `url(${background})` }}
      >
        <div className="w-full">
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
          >
            {Customer.map((product, index) => (
              <div
                key={index}
                className="rounded-[10px] border flex flex-col mx-2 relative p-5 font-[500] sm:text-[15px] text-[12px] shadow-md bg-white sm:h-[350px] h-[300px]"
              >
                <div>{product.review}</div>

                <div className="mt-4 m-auto flex gap-5 items-center p-2">
                  <img
                    src={product.Image}
                    alt={product.name}
                    className="w-[50px] rounded-full"
                  />

                  <h2 className="text-sm font-semibold">{product.name}</h2>

                  <div className="flex items-center gap-2 bg-green-500 rounded px-2 py-1">
                    <FaStar className="text-white" />
                    <p className="text-white text-sm">{product.rating}.0</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      
      
      

     
      
       {/* mobile */}
      
    </div>
  );
};

export default Custumer;
