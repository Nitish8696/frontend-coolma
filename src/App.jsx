import React from "react";
import {  Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./component/Navbar";
import Home from "./component/Home.jsx";
import Cart from "./component/Cart.jsx";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import Search from "./component/Search.jsx";
import Footer from "./component/Footer.jsx";
import PopUp from "./component/PopUp.jsx";
import ProductByCategory from "./component/ProductByCategory.jsx";
import Admin from "./admin/Admin.jsx";
import AllProducts from "./admin/AllProducts.jsx";
import Orders from "./admin/Orders.jsx"
import Category from "./admin/Category.jsx";
import SidebarForAdmin from "./admin/SidebarForAdmin.jsx"
import { Navigate } from "react-router-dom";
import AdminSingleProduct from "./admin/SingleProduct.jsx";
import SingleProduct from "./component/Singleproduct.jsx";
import Checkout from "./component/Checkout.jsx";
import Payment from "./component/Payment.jsx";
import Success from "./component/Success.jsx";
import Error from "./component/Error.jsx";
import Pending from "./component/Pending.jsx";
import Rent from "./component/Rent.jsx";
import Blogs from "./component/Blog.jsx";
import SubCategory from "./component/SubCategory.jsx";
import Blog from "./admin/Blog.jsx";
import CategoryPost from "./admin/CategoryPost.jsx";
import PostCreate from "./admin/PostCreate.jsx";
import SinglePost from "./component/SinglePost.jsx";
import AllPosts from "./admin/AllPosts.jsx";


const App = () => {

  const {user} = useSelector((state) => state.userloggedin);


  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    )
  }

  const PrivateRoute = ({children}) => {
    if (!user.isAdmin) {
      return <Navigate to="/" replace />;
    }

    return children;
  }
  
  const LayoutForAdmin = () => {
    return (
      <>
        <div className='flex gap-2'>
          <SidebarForAdmin />
          <Outlet />
        </div>
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (<Layout />),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: "/products/:id",
          element: <ProductByCategory />
        },
        {
          path: "/product/:id",
          element: <SingleProduct />
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/success/PAYMENT_SUCCESS/:id",
          element: <Success />,
        },
        {
          path: "/error/:id",
          element: <Error />,
        },
        {
          path: "/pending/:id",
          element: <Pending />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/payment/:id",
          element: <Payment />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/rent",
          element: <Rent />,
        },
        {
          path: "/subcategory/:id",
          element: <SubCategory />,
        },
        {
          path: "/blog",
          element: <Blogs />
        },
        {
          path: "/singlepost/:id",
          element: <SinglePost />
        },
        {
          path: "/admin",
          element: (<PrivateRoute><LayoutForAdmin /></PrivateRoute>),
          children: [
            {
              path: "/admin",
              element: <Admin />
            },
            {
              path: "/admin/products",
              element: <AllProducts />
            },
            {
              path: "/admin/orders",
              element: <Orders />
            },
            {
              path: "/admin/category",
              element: <Category />
            },
            {
              path: "/admin/singleproduct/:id",
              element: <AdminSingleProduct />
            },
            {
              path: "/admin/blog",
              element: <Blog />
            },
            {
              path: "/admin/category/post",
              element: <CategoryPost />
            },
            {
              path: "/admin/create/post",
              element: <PostCreate />
            },
            {
              path: "/admin/all-posts",
              element: <AllPosts />
            },
          ]
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />,
    }
  ]);


  return (
    <RouterProvider router={router} />
  );
}

export default App;
