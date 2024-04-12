import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../Ultiles/Cartslices";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="w-full flex p-6">
      <div className=" sm:w-[90%] m-auto">
        <h2 className="text-2xl font-medium text-center mb-6">Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
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

              {cart.cartItems.map((cartItem, index) => (
                <div className="grid grid-cols-5 text-center items-center py-3 ">
                  <div className="flex  items-center">
                    {" "}
                    <img
                      src={cartItem.image[0]}
                      alt={cartItem.name}
                      className="w-[50px] h-[50px] object-cover mr-4"
                    />
                    <h3 className="text-[12px] font-medium ">
                      ({cartItem.name})
                    </h3>
                  </div>

                  <h3 className="text-sm font-medium ml-6">
                    ₹{cartItem.price}
                  </h3>
                  <div className="flex items-center gap-2 ml-[90px]">
                    <button
                      className=" py-1 sm:px-2 px-10 rounded-lg  text-xl"
                      onClick={() => handleDecreaseCart(cartItem)}
                    >
                      -
                    </button>
                    <h3 className="text-sm font-medium">
                      {cartItem.cartQuantity}
                    </h3>
                    <button
                      className=" py-1 sm:px-2 px-10 rounded-lg text-[#00AFEF] text-xl"
                      onClick={() => handleAddToCart(cartItem)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm font-medium ml-4">
                    ₹{cartItem.price * cartItem.cartQuantity}
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
            {/* for mobile */}
            <div className=" sm:hidden block ">
              {cart.cartItems.map((cartItem, index) => (
                <div className=" text-center items-center py-3 border px-4 my-2">
                  <div className="flex justify-between  ">
                    {" "}
                    <img
                      src={cartItem.image[0]}
                      alt={cartItem.name}
                      className="w-[100px] h-[100px] object-cover "
                    />
                    <h3 className="text-[16px] font-medium ">
                      ({cartItem.name})
                    </h3>
                  </div>
                  <div className="flex justify-between items-center py-4 ">
                    <h1 className="text-[16px]">Price</h1>
                    <h3 className="text-sm font-medium ml-6">
                      ₹{cartItem.price}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between ">
                    <p className="text-[16px]">Quantity:</p>
                    <div className="flex items-center gap-5">
                      <button
                        className=" py-1  rounded-lg  text-2xl"
                        onClick={() => handleDecreaseCart(cartItem)}
                      >
                        -
                      </button>
                      <h3 className=" font-medium text-[16px]">
                        {cartItem.cartQuantity}
                      </h3>
                      <button
                        className=" py-1  rounded-lg text-[#00AFEF] text-2xl"
                        onClick={() => handleAddToCart(cartItem)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3">
                  <h1>Total:</h1>
                    <div className="text-sm font-medium ml-4">
                      ₹{cartItem.price * cartItem.cartQuantity}
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
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md font-medium mb-4 md:mb-0"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <div className="text-right">
                <div className="text-lg font-medium">Subtotal</div>
                <div className="text-xl font-bold">₹{cart.cartTotalAmount}</div>
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
