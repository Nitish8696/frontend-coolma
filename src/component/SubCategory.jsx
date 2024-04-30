import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from './ProductCard';

const SubCategory = () => {

    const [products, setProducts] = useState([])
    const { id } = useParams();

    const location = useLocation();
    console.log(id)
    const searchParams = new URLSearchParams(location.search);
    const childrenString = searchParams.get('values');
    let children = [];

    if (childrenString) {
        try {
            children = JSON.parse(decodeURIComponent(childrenString)).map(child => JSON.parse(child));
        } catch (error) {
            console.error('Error parsing children:', error);
        }
    }
    console.log(children);

    useEffect(() => {
        const getProductByCategory = async () => {
            const product = await axios.get(`http://localhost:8000/api/products/?category=${id}`)
            setProducts(product.data)
        }
        getProductByCategory()

    }, [id])

    console.log(products)
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3,
            slidesToSlide: 1,
        },
    };
    return (
        <div className='mt-2'>
            <div className='font-semibold pl-5 mb-2 text-lg'>SUB CATEGORIES</div>
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
                {
                    children && children.map((category) => {
                        const childrenString = category.children ? category.children.map(child => JSON.stringify(child)) : [];
                        return <Link key={category._id} to={`/subcategory/${category._id}?values=${encodeURIComponent(JSON.stringify(childrenString))}`} state={{ categoryId: category._id, children: category.children && category.children }}>
                            <div className='flex flex-col items-center justify-center'>
                                <img src={`http://localhost:8000/${category.img}`} className='w-[70px] h-[70px] border-[3px] border-solid border-[#00ADEC] object-contain rounded-full' alt="" />
                                <p className='text-sm'>{category.name}</p>
                            </div>
                        </Link>
                    })
                }

            </Carousel>
            <div className='grid sm:grid-cols-4 grid-cols-2 max-w-[1140px] mx-auto mt-2'>
                {products && products.map((product) => {
                    return <ProductCard product={product}/>
                })}
            </div>
        </div>
    )
}

export default SubCategory
