import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import BlogCard from './BlogCard';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
        slidesToSlide: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 4,
        slidesToSlide: 1,
    },
};

const Blog = () => {
    const [category, setCategory] = useState([])
    const [id, setId] = useState()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getCategoryData = async () => {
            const getCategory = await axios.get('http://localhost:8000/api/postcategory')
            setCategory(getCategory.data)
        }
        getCategoryData()
    }, [])
    useEffect(() => {
        const getPosts = async () => {
            if (id) {
                const getPosts = await axios.get(`http://localhost:8000/api/post/?category=${id}`)
                setPosts(getPosts.data)
            }
            else {
                const getPosts = await axios.get(`http://localhost:8000/api/post`)
                setPosts(getPosts.data)
            }
        }
        getPosts()
    }, [id])
    // useEffect(() => {
    //     const getPosts = async () => {
    //         const getPosts = await axios.get(`http://localhost:8000/api/post/?category=${id}`)
    //         setPosts(getPosts.data)
    //     }
    //     getPosts()
    // }, [id])
    // console.log(posts)
    return (
        <div>
            <div className='sm:w-[80%] w-[95%] m-auto mt-2'>
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
                        category && category.map((cat) => {
                            return <button key={cat._id} className='bg-gray-100 text-black py-1 px-5 rounded' onClick={() => setId(cat._id)}>
                                {cat.name}
                            </button>
                        })
                    }
                </Carousel>
                <div>
                    {
                        posts && posts.map((post) => {
                            return <BlogCard post={post} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Blog
