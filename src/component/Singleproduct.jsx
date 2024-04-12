import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../demo/Products";
import Breadcrumb from "./BreadCrumb";
import Singlepageproduct from "./Singlepageproduct";
import { useDispatch } from "react-redux";
import { addToCart, alert } from "../Ultiles/Cartslices"; // Import addToCart action
import { MdOutlineVerified } from "react-icons/md";
import Alert from "./Alert"


const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0); // Set initial index to 0
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(alert(true));

  };

  useEffect(() => {
    const foundProduct = products.find((item) => item.name === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  const handleImageClick = (index) => {
    setActiveImgIndex(index );
  };

  return (
    <>
       <Alert/>

      <div className="flex flex-col gap-5 lg:flex-row sm:px-[150px] px-3 sm:py-5">
        {product && (
          <div className="flex flex-col lg:w-[35%]">
            <div className="relative w-full h-full aspect-square rounded-xl overflow-hidden">
              {product.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="absolute top-0 left-0 border-2 transition-transform transform w-full h-full object-contain rounded-xl"
                  style={{
                    transform: `translateX(${
                      -(activeImgIndex - index) * 100
                    }%)`,
                    transition: "transform 0.5s ease-in-out",
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-4 justify-between h-24 pt-3">
              {product.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className={`w-24 h-24 object-contain rounded-md cursor-pointer  ${
                    index === activeImgIndex ? "border border-blue-500" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
        )}
        {/* ABOUT */}
        {product && (
          <div className=" relative flex flex-col gap-3 lg:w pt-10">
            <Breadcrumb  />
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold capitalize">{product.name}</h1>
              <div className="flex items-center gap-1 text-[#00AFEF]">              <MdOutlineVerified/>
              <span className="font-[500] text-[#00AFEF]">451 Reviews</span>
              </div>

            </div>
            <p className="text-gray-700">
              {/* Add product description here */}
            </p>
            <div className="flex items-end gap-1">
            <h6 className="text-2xl font-semibold">₹{product.price}.00 </h6>
            <p className="italic text-[14px]">Inclusive of all Taxes</p>
            
            </div>
            <div className=" bg-white sm:fixed z-[999] sm:right-[100px] sm:top-[300px] flex  flex-col   gap-3  sm:border border-sm sm:w-[280px] p-3">
            <h6 className="sm:block hidden text-2xl font-semibold">₹{product.price}.00 </h6>
            <p className=" sm:block hidden italic text-[14px]">Inclusive of all Taxes</p>
            <div className=" sm:flex hidden  items-center gap-1 text-[#00AFEF]">              <MdOutlineVerified/>
              <span className="font-[500] text-[#00AFEF]">451 Reviews</span>
              </div>

              <div className="flex  items-center gap-5  ">
              <p className="font-[500]">Quantity :</p> 
              <div className="flex flex-row items-center border">
                <button
                  className=" py-1 sm:px-4 px-10  text-violet-800 text-2xl"
                  onClick={() => setAmount((prev) => prev > 2 ? prev - 1 : 1)}
                  >
                  -
                </button>
                <span className="py-1 px-4 w-[30px] rounded-lg font-[500]">
                  {amount}
                </span>
                <button
                  className="py-1 sm:px-4 px-10 rounded-lg text-[#00AFEF] text-2xl"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              </div>
              <button
                className="bg-[#00AFEF] text-white font-semibold py-2 px-8  uppercase"
                style={{ minWidth: "250px" }} onClick={() => {
                  
                handleAddToCart({...product,amount});
                }}
              >
                Add to Cart
              </button>
              <button
                className="bg-[#00AFEF] text-white font-semibold py-2 px-8  uppercase"
                style={{ minWidth: "250px" }} // Adjust the width as needed
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="sm:px-[150px] px-3 mr-[250px] mt-[100px] ">
        <h1 className="text-[30px] font-[500]  mt-5 ">Product description</h1>
        <p className="font-[500] text-[16px] ">
          Introducing new & improved Mamaearth Onion Shampoo for even stronger,
          smoother, and cleaner hair. The new formula improves deep cleansing
          action by providing 22% more foam without any sulfates or toxins. With
          up to 8 times more detangling action and 4 times more conditioning
          effect, it’s time to welcome healthier hair with the time-tested
          goodness of Onion. Mamaearth Onion Hair Shampoo helps you combat hair
          fall with its natural goodness. Onion, rich in sulfur, potassium &
          antioxidants, reduces hair fall & accelerates hair growth. Plant
          Keratin replenishes and strengthens hair, repairing its natural
          structure. It makes hair smooth and frizz-free. And because of our no
          toxins and no harmful chemicals philosophy, you won’t find any
          Silicones, Parabens, mineral oil & dyes in our Onion Hair ShampooRead
          Less
        </p>
      </div>
      <div className="bg-[#F2F2F2] h-3 sm:mx-[150px] my-2 px-3 "></div>
      <Singlepageproduct/>
    </>
  );
};

export default SingleProduct;
