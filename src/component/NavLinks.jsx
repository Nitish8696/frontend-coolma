import React, { useEffect, useState } from "react";
import * as Menubar from '@radix-ui/react-menubar';
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import { useDispatch } from "react-redux";
import './styles.css';
import axios from "axios";
import { Link } from "react-router-dom";

const NavLinks = () => {
  const [categoryWithNull, setCategoryWithNull] = useState([])

  const dispatch = useDispatch()

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



  let renderCategoriesRight = (categories) => {
    return <Menubar.Root className="MenubarRoot">
      {categories?.map((category) => {
        return <Menubar.Menu>
          <Menubar.Trigger className="MenubarTrigger text-sm">
            {(category.name).toUpperCase()}
            <div className="RightSlot">
              <ChevronRightIcon />
            </div>
          </Menubar.Trigger>

          <Menubar.Portal>
            <Menubar.Content className="MenubarContent" align="start" sideOffset={5} alignOffset={-3}>
              {
                category.children && category.children.map((child) => {
                  return <><Menubar.Sub key={child._id}>
                    <Link to={`/products/${child._id}`}>
                      <Menubar.SubTrigger className="MenubarSubTrigger">
                        {child.name}
                        <div className="RightSlot">
                          <ChevronRightIcon />
                        </div>
                      </Menubar.SubTrigger>
                    </Link>
                    {
                      child.children && <Menubar.Portal>
                        <Menubar.SubContent className="MenubarSubContent" alignOffset={-5}>
                          {
                            child.children && child.children.map((child) => {
                              return <Link to={`/products/${child._id}`}>
                                <Menubar.Item className="MenubarItem">{child.name}</Menubar.Item>
                              </Link>
                            })
                          }
                        </Menubar.SubContent>
                      </Menubar.Portal>
                    }
                  </Menubar.Sub>
                  </>
                })
              }
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      })}
    </Menubar.Root>
  }

  return (
    <>
      {
        hierarchicalCategories && renderCategoriesRight(hierarchicalCategories)
      }

    </>
  );
};

export default NavLinks;
