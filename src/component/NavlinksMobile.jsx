import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdCategory } from "react-icons/md";
import { FaCaretRight } from "react-icons/fa";
import { useDispatch } from 'react-redux'


const NavlinksMobile = () => {

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
            <div className='flex gap-2 items-center'>
                <MdCategory />
                Categories
            </div>
            <div className='flex flex-col gap-1 ml-5 mt-2 mr-5'>
                {
                    hierarchicalCategories.map((category) => {
                        return <>
                            <div className=' flex flex-col'>
                                <div className='flex gap-2 items-center hover:bg-[#00AFEF] transition-all py-2 pl-1 hover:text-white rounded'  onClick={() => toggleChild(category)}>
                                    {category.name}
                                    <FaCaretRight />
                                </div>

                                {selectedParent && selectedParent._id === category._id && (
                                    <div className="ml-[20px] flex flex-col gap-2 mt-1">
                                        {category.children.map((child, index) => (
                                            <div key={index} className="hover:bg-[#00AFEF] transition-all hover:text-white rounded p-2">
                                                {child.name}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </>
                    })
                }
            </div>


        </div >
    )
}

export default NavlinksMobile
