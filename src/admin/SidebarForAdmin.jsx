import React from 'react'
import './SidebarForAdmin.scss'
import { FaBox } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import { Link } from 'react-router-dom';


const SidebarForAdmin = () => {
    return (
        <div className='SidebarForAdmin'>
            <Link to={'/admin/products'}>
                <div className='admin-sidebar-products'>
                    <FaBox className='icon-box'/>
                    <span>All Products</span>
                </div>
            </Link>
            <Link to={'/admin'}>
               <div className='admin-add-products'>
                    <IoIosAddCircle className='icon-add'/>
                    <span>Add Products</span>
               </div>
            </Link>
            <Link to={'/admin/orders'}>
               <div className='admin-add-products'>
                    <MdShoppingCartCheckout className='icon-add'/>
                    <span>Orders</span>
               </div>
            </Link>
            <Link to={'/admin/category'}>
               <div className='admin-add-products'>
                    <MdShoppingCartCheckout className='icon-add'/>
                    <span>Category</span>
               </div>
            </Link>
            <Link to={'/admin/category/post'}>
               <div className='admin-add-products'>
                    <MdShoppingCartCheckout className='icon-add'/>
                    <span>Post Category</span>
               </div>
            </Link>
            <Link to={'/admin/create/post'}>
               <div className='admin-add-products'>
                    <MdShoppingCartCheckout className='icon-add'/>
                    <span>Add Post</span>
               </div>
            </Link>
            <Link to={'/admin/all-posts'}>
               <div className='admin-add-products'>
                    <MdShoppingCartCheckout className='icon-add'/>
                    <span>All Posts</span>
               </div>
            </Link>
        </div>
    )
}

export default SidebarForAdmin
