import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getInitialProductsFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

const initialState = {
  products: getInitialProductsFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.products.push(action.payload)
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    decreaseCart(state, action) {
      let updatedProducts;
      if (action.payload.Variant) {
        const index = state.products.findIndex((product) => {
          return product.product._id === action.payload.id && product.selectedVariant.name === action.payload.Variant
        })

        if (index !== -1) {
          updatedProducts = [...state.products]
          const updatedProduct = updatedProducts[index]
          if (updatedProduct.amount > 1) {
            updatedProducts[index] = {
              ...updatedProduct,
              amount: updatedProduct.amount - 1
            }
            return {
              ...state,
              products: updatedProducts,
            }
          }
        }
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
      }
      else {
        const index = state.products.findIndex((product) => {
          return product.product._id === action.payload.id
        })
        if (index !== -1) {
          updatedProducts = [...state.products]
          const updatedProduct = updatedProducts[index]
          if (updatedProduct.amount > 1) {
            updatedProducts[index] = {
              ...updatedProduct,
              amount: updatedProduct.amount - 1
            }
            return {
              ...state,
              products: updatedProducts,
            }
          }
        }
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
      }

    },
    // ======================================================
    increaseCart(state, action) {
      let updatedProducts;
      if (action.payload.Variant) {
        const index = state.products.findIndex((product) => {
          return product.product._id === action.payload.id && product.selectedVariant.name === action.payload.Variant
        })

        if (index !== -1) {
          updatedProducts = [...state.products]
          const updatedProduct = updatedProducts[index]
          if (updatedProduct.amount > 1) {
            updatedProducts[index] = {
              ...updatedProduct,
              amount: updatedProduct.amount + 1
            }
            return {
              ...state,
              products: updatedProducts,
            }
          }
        }
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
      }
      else {
        const index = state.products.findIndex((product) => {
          return product.product._id === action.payload.id
        })
        if (index !== -1) {
          updatedProducts = [...state.products]
          const updatedProduct = updatedProducts[index]
          if (updatedProduct.amount > 1) {
            updatedProducts[index] = {
              ...updatedProduct,
              amount: updatedProduct.amount + 1
            }
            return {
              ...state,
              products: updatedProducts,
            }
          }
        }
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
      }

    },
    // ====================================================
    removeFromCart(state, action) {

      let updatedProducts;
      if (action.payload.Variant) {
        const index = state.products.findIndex(product => {
          return product.product._id === action.payload.id && product.selectedVariant.name === action.payload.Variant;
        });
        if (index !== -1) {
          updatedProducts = [...state.products]
          const updatedProduct = updatedProducts[index]
          if (updatedProduct) {
            updatedProducts.splice(index , 1)
          }
        }
      }
      else {
        updatedProducts = state.products.filter((product) => {
          return product.product._id !== action.payload.id
        })
      }
      localStorage.setItem("cart", JSON.stringify(updatedProducts));
      return {
        ...state,
        products: updatedProducts,
      }
    },
  }
});

export const { addToCart, decreaseCart, increaseCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;