import React from 'react'
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    return (
        <Link to={`/product/${product._id}`}>
            <div className="rounded-[10px] border flex flex-col mx-2 relative overflow-hidden mt-2">
                <div className="relative">
                    <img
                        src={`http://localhost:8000/${product.img[0]}`}
                        alt="image"
                        className="w-full h-[auto] object-cover "
                    />
                </div>
                <div className=" text-center p-2">
                    <h2 className="text-sm font-semibold">{product.title}</h2>
                    {/* <p className="text-gray-600 font-medium text-sm">
                    {product.category}
                </p> */}
                    {
                        product && product.isVariable && <div className="text-gray-700 font-bold text-sm py-3 flex items-center justify-center">
                            ₹<p>{(product.variable[0].salePrice ? product.variable[0].salePrice : product.variable[0].regularPrice)}</p>
                            -
                            <p>{(product.variable[product.variable.length - 1].salePrice ? product.variable[product.variable.length - 1].salePrice :
                                product.variable[product.variable.length - 1].regularPrice
                            )}</p>
                        </div>
                    }
                    {
                        !product.isVariable && <div className="text-gray-700 font-bold text-sm py-3 flex items-center justify-center">
                            ₹<p>
                                {product.salePrice ? product.salePrice : product.regularPrice}
                            </p>
                        </div>
                    }
                </div>
                <button
                    className="bg-[#00AFEF] text-white py-3 text-center"
                    onClick={(event) => {
                        event.preventDefault(); // Prevent navigation
                        handleViewToCart(index);
                        handleAddToCart({ ...product, amount });
                    }}
                >
                    Add TO CART
                </button>
            </div>
        </Link>
    )
}

export default ProductCard
