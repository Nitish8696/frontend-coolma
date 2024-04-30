import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseCart,
  // clearCart,
  decreaseCart,
  // getTotals,
  removeFromCart,
} from "../Ultiles/Cartslices";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(null)
  console.log(cart);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getTotals());
  // }, [cart, dispatch]);

  const handleAddToCart = (id, Variant) => {
    if (Variant) {
      dispatch(increaseCart({ id, Variant }));
    }
    else {
      dispatch(increaseCart({ id }));
    }
  };
  const handleDecreaseCart = (id, Variant) => {
    if (Variant) {
      dispatch(decreaseCart({ id, Variant }));
    }
    else {
      dispatch(decreaseCart({ id }));
    }
  };
  const handleRemoveFromCart = (id, Variant) => {
    if (Variant) {
      dispatch(removeFromCart({ id, Variant }));
    }
    else {
      dispatch(removeFromCart({ id }));
    }
  };

  useEffect(() => {
    const sum = cart.products && cart.products.reduce((acc, cur) => {
      const salePrice = cur.selectedVariant && cur.selectedVariant.salePrice ? cur.selectedVariant.salePrice : cur.product.salePrice;
      return acc += cur.amount * salePrice
    }, 0)
    setTotal(sum)

  }, [cart.products])

  return (

    <div className="w-full flex p-6">
      <div className=" sm:w-[90%] m-auto">
        <h2 className="text-2xl font-medium text-center mb-6">Shopping Cart</h2>
        {cart.products.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">
              Your cart is currently empty
            </p>
            <div className="mt-4">
              <Link
                to="/"
                className="text-blue-500 font-medium hover:underline"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Cart items */}
            <div className=" sm:block hidden border border-1 py-4 shadow-md">
              {/* Titles */}
              <div className="grid grid-cols-5 text-center text-xl ml-6">
                <h1>Product</h1>
                <h1>Price</h1>
                <h1>Quantity</h1>
                <h1>Total</h1>
              </div>
              {/* Cart items */}

              {cart.products.map((cartItem, index) => (

                <div className="grid grid-cols-5 text-center items-center py-3 ">
                  <div className="flex  items-center">
                    {" "}
                    <img
                      src={`http://localhost:8000/${cartItem.product.img[0]}`}
                      alt="img"
                      className="w-[50px] h-[50px] object-cover mr-4"
                    />
                    <div className="text-[12px] font-medium flex flex-col">
                      <div className="p-0">
                        {cartItem.product.title}
                      </div>
                      {
                        cartItem.selectedVariant &&
                        <div className="flex gap-1">
                          <p className="font-bold">Varient : </p>
                          <p>{cartItem.selectedVariant.name}</p>
                        </div>
                      }
                    </div>
                  </div>

                  <h3 className="text-sm font-medium ml-6">
                    ₹{cartItem.selectedVariant ? cartItem.selectedVariant.salePrice : cartItem.product.salePrice}
                  </h3>
                  <div className="flex items-center gap-2 ml-[90px]">
                    <button
                      className=" py-1 sm:px-2 px-10 rounded-lg  text-xl"
                      onClick={() => handleDecreaseCart(cartItem.product._id, cartItem.selectedVariant?.name)}
                    >
                      -
                    </button>
                    <h3 className="text-sm font-medium">
                      {cartItem.amount}
                    </h3>
                    <button
                      className=" py-1 sm:px-2 px-10 rounded-lg text-[#00AFEF] text-xl"
                      onClick={() => handleAddToCart(cartItem.product._id, cartItem.selectedVariant?.name)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm font-medium ml-4">
                    ₹{cartItem.selectedVariant ? cartItem.selectedVariant.salePrice * cartItem.amount : cartItem.product.salePrice * cartItem.amount}
                  </div>

                  <button
                    className="text-red-500 font-medium hover:underline"
                    onClick={() => handleRemoveFromCart(cartItem.product._id, cartItem.selectedVariant?.name)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {/* for mobile */}
            <div className=" sm:hidden block ">
              {cart.products.map((cartItem, index) => (
                <div className=" text-center items-center py-3 border px-4 my-2">
                  <div className="flex justify-between  ">
                    {" "}
                    <img
                      src={`http://localhost:8000/${cartItem.product.img[0]}`}
                      alt={cartItem.name}
                      className="w-[100px] h-[100px] object-cover "
                    />
                    <h3 className="text-[16px] font-medium ">
                      {cartItem.product.title}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center py-4 ">
                    <h1 className="text-[16px]">Price</h1>
                    <h3 className="text-sm font-medium ml-6">
                      ₹{cartItem.selectedVariant ? cartItem.selectedVariant.salePrice : cartItem.product.salePrice}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between ">
                    <p className="text-[16px]">Quantity:</p>
                    <div className="flex items-center gap-5">
                      <button
                        className=" py-1  rounded-lg  text-2xl"
                        onClick={() => handleDecreaseCart(cartItem.product._id, cartItem.selectedVariant?.name)}
                      >
                        -
                      </button>
                      <h3 className=" font-medium text-[16px]">
                        {cartItem.amount}
                      </h3>
                      <button
                        className=" py-1  rounded-lg text-[#00AFEF] text-2xl"
                        onClick={() => handleAddToCart(cartItem.product._id, cartItem.selectedVariant?.name)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <h1>Total:</h1>
                    <div className="text-sm font-medium ml-4">
                      ₹{cartItem.selectedVariant ? cartItem.selectedVariant.salePrice * cartItem.amount : cartItem.product.salePrice * cartItem.amount}
                    </div>
                  </div>

                  <button
                    className="text-red-500 font-medium hover:underline"
                    onClick={() => handleRemoveFromCart(cartItem)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {/* Cart summary */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6">

              <div className="text-right">
                <div className="text-lg font-medium">Subtotal</div>
                <div className="text-xl font-bold">₹{total}</div>
                <p className="text-sm">
                  Taxes and shipping calculated at checkout
                </p>
                <Link to="/checkout">
                  <button className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium">
                    Check out
                  </button>
                </Link>
                <div className="mt-2">
                  <Link
                    to="/"
                    className="text-blue-500 font-medium hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
