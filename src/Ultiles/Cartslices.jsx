import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalProduct: localStorage.getItem("cartTotalProduct")
  ? JSON.parse(localStorage.getItem("cartTotalProduct"))
  : 0,
  cartTotalAmount: 0,
  alert:false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
        );

      console.log(action.payload.id);

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + action.payload.amount,
          cartTotalProduct: state.cartTotalProduct + 0,

        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: action.payload.amount };
        state.cartItems.push(tempProductItem),
        state.cartTotalProduct = state.cartTotalProduct + 1,

        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalProduct", state.cartTotalProduct); // Update local storage here

      // console.log([...state.cartItems]);
    },
    alert (state, action){
         state.alert= action.payload;
         console.log(state.alert);
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    
      // Calculate the total quantity of products in the cart
      const totalQuantity = nextCartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
    
      state.cartItems = nextCartItems;
      state.cartTotalProduct = totalQuantity;
    
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalProduct", totalQuantity);
    
      toast.error("Product removed from cart", {
        position: "bottom-left",
      });
    },
    
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.cartTotalProduct = 0,

      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart,alert, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;