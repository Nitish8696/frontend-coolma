import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

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

const MobileCategory = () => {
    const [categoryWithNull, setCategoryWithNull] = useState([])
    const [selectedParent, setSelectedParent] = useState(null)


    useEffect(() => {
        const getCategoryData = async () => {
            const getCategory = await axios.get('http://localhost:8000/api/category/')
            setCategoryWithNull(getCategory.data)
        }
        getCategoryData()
    }, [])


    function findChildCategories(parentId) {
        const children = [];
        categoryWithNull.forEach(category => {
            if (category.parentCategory === parentId) {
                const childCategory = { ...category };
                const subChildren = findChildCategories(category._id);
                if (subChildren.length > 0) {
                    childCategory.children = subChildren;
                }
                children.push(childCategory);
            }
        });
        return children;
    }

    // Find top-level categories
    const topLevelCategories = categoryWithNull?.filter(category => category.parentCategory === null);

    // Build hierarchical structure
    const hierarchicalCategories = topLevelCategories.map(category => {
        const topLevelCategory = { ...category };
        const children = findChildCategories(category._id);
        if (children.length > 0) {
            topLevelCategory.children = children;
        }
        return topLevelCategory;
    });
    return (
        <div>
            <div className='font-semibold pl-5 mb-2 text-lg'>CATEGORIES</div>
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
                    hierarchicalCategories && hierarchicalCategories.map((category) => {
                        const childrenString = category.children ? category.children.map(child => JSON.stringify(child)) : [];
                        return <Link key={category._id} to={`/subcategory/${category._id}?values=${encodeURIComponent(JSON.stringify(childrenString))}`}  state= {{ categoryId: category._id, children: category.children && category.children}}>
                            <div className='flex flex-col items-center justify-center'>
                                <img src={`http://localhost:8000/${category.img}`} className='w-[70px] h-[70px] border-[3px] border-solid border-[#00ADEC] object-contain rounded-full' alt="" />
                                <p className='text-sm'>{category.name}</p>
                            </div>
                        </Link>
                    })
                }
            </Carousel>

        </div>
    )
}

export default MobileCategory
