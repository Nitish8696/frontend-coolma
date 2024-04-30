import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import Singlepageproduct from "./Singlepageproduct";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Ultiles/Cartslices"; // Import addToCart action
import { MdOutlineVerified } from "react-icons/md";
import axios from "axios";


const SingleProduct = () => {
  const { id } = useParams();
  const userloggedin = useSelector((state) => state.userloggedin);

  const [product, setProduct] = useState({});
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [amount, setAmount] = useState(1);
  const [reviews, setReviews] = useState([])
  const [postReview, setPostReview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const getSingleProduct = async () => {
      const products = await axios.get(`http://localhost:8000/api/products/find/${id}`)
      setProduct(products.data)
    }
    const getReviews = async () => {
      const Review = await axios.get(`http://localhost:8000/api/review/${id}`)
      setReviews(Review.data)
    }
    getSingleProduct()
    getReviews()
  }, [id])

  const handleReviewSubmit = async () => {
    if (!postReview) {
      return
    }
    setLoading(true)
    const response = await axios.post(`http://localhost:8000/api/review/${id}`, { postReview }, {
      headers: { token: `Bearer ${localStorage.getItem("accessToken")}` }
    })
    setLoading(false)
    if (response.data.status === 401) {
      setError('You are not authorized register first')
    }
    if (response.data.status === 403) {
      setError('Session expired login again')
    }
    if (response.status === 200) {
      setPostReview('')
    }
  }


  const dispatch = useDispatch();

  const handleAddToCart = (product, amount, selectedVariant) => {
    if (selectedVariant) {
      dispatch(addToCart(product, amount, selectedVariant));
    }
    else (
      dispatch(addToCart(product, amount))
    )
    // dispatch(alert(true));
  };

  const handleImageClick = (index) => {
    setActiveImgIndex(index);
  };

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedVariable = product.variable.find(variant => variant._id === selectedId);
    setSelectedVariant(selectedVariable);
  };


  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row sm:px-[150px] px-3 sm:py-5">
        {product && (
          <div className="flex flex-col lg:w-[35%]">
            <div className="relative w-full h-full aspect-square rounded-xl overflow-hidden">
              {product.img && product.img.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:8000/${image}`}
                  alt=""
                  className="absolute top-0 left-0 border-2 transition-transform transform w-full h-full object-contain rounded-xl"
                  style={{
                    transform: `translateX(${-(activeImgIndex - index) * 100
                      }%)`,
                    transition: "transform 0.5s ease-in-out",
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-4 justify-between h-24 pt-3">
              {product.img && product.img.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:8000/${image}`}
                  alt=""
                  className={`w-24 h-24 object-contain rounded-md cursor-pointer  ${index === activeImgIndex ? "border border-blue-500" : ""
                    }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
        )}
        {/* ABOUT */}
        {product && (
          <div className=" relative flex flex-col lg:w">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold capitalize">{product.title}</h1>
              <div className="flex items-center gap-1 text-[#00AFEF]">              <MdOutlineVerified />
                <span className="font-[500] text-[#00AFEF]">{reviews && reviews.length} Reviews</span>
              </div>

            </div>
            <p className="text-gray-700">
              {/* Add product description here */}
            </p>
            {/* =========================================== */}
            <div className="flex items-end gap-1">
              {product && (product.isVariable ?
                <div>
                  <p className=" text-lg font-medium text-gray-500">Select Variant</p>
                  <select name="cars" id="cars" className="outline-none shadow-md px-2 py-1 border" onChange={(e) => handleChange(e)}>
                    <option value="volvo">Size/Color</option>
                    {
                      product.variable.map((variant) => {
                        return <>
                          <option key={variant._id} value={variant._id}>{variant.name}</option>
                        </>
                      })
                    }
                  </select>
                  {selectedVariant && (
                    <div className="text-2xl font-medium flex items-center gap-2 mt-2">
                      {selectedVariant.regularPrice && <p className=" line-through">₹{selectedVariant.regularPrice}.00</p>}
                      {selectedVariant.salePrice && <p className=" text-base">₹{selectedVariant.salePrice}.00</p>}
                    </div>
                  )}
                </div>
                :
                <div className="text-2xl font-medium flex items-center gap-2">
                  {product.regularPrice && <p className=" line-through">₹{product.regularPrice}.00</p>}
                  {product.salePrice && <p className=" text-base">₹{product.salePrice}.00</p>}
                </div>
              )}
              {(product.regularPrice || product.salePrice) && <p className="italic text-[14px]">Inclusive of all Taxes</p>}
            </div>

            <div className=" bg-white z-[999] mt-4 flex  flex-col   gap-3  sm:border border-sm sm:w-[280px] p-3">
              <div className=" sm:flex hidden  items-center gap-1 text-[#00AFEF]">              <MdOutlineVerified />
                <span className="font-[500] text-[#00AFEF]">{reviews && reviews.length} Reviews</span>
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
              <Link to={'/cart'} >
                <button
                  className={`bg-[#00AFEF] text-white font-semibold w-full py-2  uppercase text-center ${product.isVariable && !selectedVariant ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ minWidth: "250px" }} onClick={() => {

                    handleAddToCart({ product, amount, selectedVariant });
                  }}
                  disabled={product.isVariable && !selectedVariant}
                >
                  Add to Cart
                </button>
              </Link>
              <button
                className={`bg-[#00AFEF] text-white font-semibold py-2 w-full uppercase text-center ${product.isVariable && !selectedVariant ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ minWidth: "250px" }} // Adjust the width as needed
                disabled={product.isVariable && !selectedVariant}
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="sm:px-[150px] px-3 mr-[250px]">
        <h1 className="text-[30px] font-[500]  mt-5 ">Product description</h1>
        <div className="font-[500] text-[16px] ">
          <div dangerouslySetInnerHTML={{ __html: product?.desc }} className="mt-2"></div>
        </div>
      </div>
      <div className="bg-[#F2F2F2] h-3 sm:mx-[150px] my-2 px-3 ">
      </div>
      <div className="sm:px-[150px] px-3">
        <div className="flex items-center gap-2">
          <p className=" font-semibold">Reviews</p>
          <div className="flex items-center">
            <MdOutlineVerified className="text-[#00AFEF]" />
            <p className=" font-normal">Only verified users</p>
          </div>
        </div>
        <div>
          {userloggedin.user ?
            <div>
              <div className="flex items-end ">
                <input type="text" name="" id="" className="outline-none border-b-2 sm:w-[35%] w-full" placeholder="Write About Product..." value={postReview} onChange={(e) => setPostReview(e.target.value)} />
                <button className="bg-[#00AFEF] text-white font-semibold py-2 px-8" onClick={handleReviewSubmit}>{loading ? "Sending..." : "Send"}</button>
              </div>
              {error &&
                <div>
                  <p className="text-red-600 font-medium">{error}</p>
                  <Link to={'/Login'}>
                    <button className="bg-[#00AFEF] px-3 py-1 text-white">
                      Login
                    </button>
                  </Link>
                </div>
              }
            </div> :
            <div>
              <p className="text-red-600 font-medium">For Writting Review Login First</p>
              <Link to={'/login'}><button className="bg-[#00AFEF] px-3 py-1 text-white">
                Login
              </button></Link>
            </div>
          }
        </div>
        <div className="flex flex-col gap-4 mt-2">
          {
            reviews && reviews.map((review) => {
              return <>
                <div key={review._id} className="flex flex-col gap-2">
                  <div className="flex gap-2 items-start">
                    <div className="bg-[#00AFEF] rounded-full w-fit py-2 px-3 text-lg font-semibold text-white">
                      {(review.userName).slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-bs font-medium">{review.userName}</p>
                      <p className=" text-xs text-[#59A30E] font-medium">Verified User</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-base">{review.review}</p>
                  </div>
                </div>
                <hr />
              </>
            })
          }
        </div>
      </div>
      <Singlepageproduct />
    </>
  );
};

export default SingleProduct;
