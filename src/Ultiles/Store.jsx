import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cartslices";
import Searchslices from "./Searchslices";
import Userslice from "./Userslice";

const Store = configureStore({
  reducer: {
    // products: productsReducer,
    cart: cartReducer,
    id: Searchslices,
    userloggedin: Userslice
    // [productsApi.reducerPath]: productsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(productsApi.middleware),
});
export default Store;