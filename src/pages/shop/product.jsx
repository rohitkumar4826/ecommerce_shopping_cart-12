import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useState, useEffect, useRef } from "react";
export const Product = (props) => {
  const { id, productName, price, description, rating,stock, brand,images } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleProductClick = (product) => {
    console.log('product is',product);
    closePopup();
    setSelectedProduct(product);
    console.log('selected product is ',selectedProduct);
  };
  const closePopup = () => {
    console.log('close popup');
    setSelectedProduct(null);
  };
  return (
    <>
    <div className="product">
      <img src={images[0]} alt="protuct_image" onClick={()=>{handleProductClick(props)}} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
    {selectedProduct && (
      
      <div
      ref={popupRef}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4 border-2 z-10 w-96"
    >
      <button
        className="absolute top-2 right-2 text-gray-600"
        onClick={closePopup}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 bg-white rounded-sm border-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="image w-full h-72 overflow-y-scroll">
        <img src={images[0]} alt="thumbnail" className="w-full rounded-lg" />
      </div>
      <div className="product-info mt-4">
        <h3 className="text-xl font-medium text-gray-800">{productName}</h3>
        <p className="text-gray-600">{selectedProduct.id}</p>
        <p className="text-gray-800 uppercase">{brand}</p>
        <span className="text-green-600 font-semibold text-lg">
          Price: ${price}
        </span>
        <div className="mt-2 text-lg font-semibold">
          <p className="text-gray-800">{description}</p>
          <p className="text-gray-800">{stock}</p>
          <p>Rating: {rating}⭐</p>
        </div>
      </div>
    </div>
        )}
    </>
  );
};
