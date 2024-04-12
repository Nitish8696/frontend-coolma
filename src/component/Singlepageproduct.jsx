import React from 'react'
import { Link } from 'react-router-dom'
import products from '../demo/Products'

const Singlepageproduct = () => {
        const [cartButtonStates, setCartButtonStates] = React.useState(
                Array(products.length).fill("ADD TO CART")
              );
            
              const handleAddToCart = (index) => {
                const newButtonStates = [...cartButtonStates];
                newButtonStates[index] = "VIEW CART";
                setCartButtonStates(newButtonStates);
                // Add logic to handle adding the product to the cart
              };
  return (
        <div className=' '>
    <div className=' ' >
      <h1 className='sm:mx-[150px] my-2 text-[30px]'>More Options</h1>
      <div className='grid sm:grid-cols-4 grid-cols-2 sm:mx-[150px]  '>
      {products.map((product, index) => (
          <Link to={`/product/${product.name}`}>  <div key={index} className="rounded-[10px] border flex flex-col mx-2 my-4 relative bg-white">
              <div className="relative">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-auto rounded-xl p-2"
                />
              </div>
              <div className="mt-4 m-auto text-center p-2">
                <h2 className="text-sm font-semibold">{product.name}</h2>
                <p className="text-gray-600 font-medium text-sm">{product.category}</p>
                <p className="text-gray-700 font-bold text-sm py-3">{product.price}</p>
              </div>
              <button className="bg-[#00AFEF] text-white py-3" onClick={() => handleAddToCart(index)}>
                {cartButtonStates[index]}
              </button>
              <h1 className="bg-red-500 text-white text-[12px] font-[600] w-[100px] text-center px-2 py-1 absolute rounded-tl-lg rounded-br-lg">
                BEST SELLERS
              </h1>
            </div>
            </Link>
          ))}
          </div>
    </div>
    <div className="bg-[#F2F2F2] h-3 sm:mx-[150px] my-2"></div>

    <div>
      <h1 className='sm:mx-[150px] my-2 text-[30px]'>Related Products</h1>
      <div className='grid sm:grid-cols-4 grid-cols-2 sm:mx-[150px]'>
      {products.map((product, index) => (
          <Link to={`/product/${product.name}`}>  <div key={index} className="rounded-[10px] border flex flex-col mx-2 my-4 relative">
              <div className="relative">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-auto rounded-xl p-2"
                />
              </div>
              <div className="mt-4 m-auto text-center p-2">
                <h2 className="text-sm font-semibold">{product.name}</h2>
                <p className="text-gray-600 font-medium text-sm">{product.category}</p>
                <p className="text-gray-700 font-bold text-sm py-3">{product.price}</p>
              </div>
              <button className="bg-[#00AFEF] text-white py-3" onClick={() => handleAddToCart(index)}>
                {cartButtonStates[index]}
              </button>
              <h1 className="bg-red-500 text-white text-[12px] font-[600] w-[100px] text-center px-2 py-1 absolute rounded-tl-lg rounded-br-lg">
                BEST SELLERS
              </h1>
            </div>
            </Link>
          ))}
          </div>
    </div>
    </div>
  )
}

export default Singlepageproduct
