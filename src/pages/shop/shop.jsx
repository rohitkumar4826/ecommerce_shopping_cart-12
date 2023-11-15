import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import { Navbar } from "../../components/navbar";
import "./shop.css";

export const Shop = () => {
  const [query,setQuery]=useState("");
 // console.log(PRODUCTS.filter((user)=>user.productName.includes("fe")));
 const [cartItemCount] = useState(0);
 const [categories] = useState([
  "All",
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting"
]);
 const handlequery = (category)=>{
     if(category==="All"){
      setQuery("");
     }else{
      setQuery(category);
     }
 }
  return (
    <>
    <Navbar cartItemCount={cartItemCount}/>
    <div className="searchbar">
       <input className="textari" type="text"  aria-label="textaria" onChange={(e)=>setQuery(e.target.value)} placeholder="Search"/>
    </div>
    <div className="shop">
      <div className="shopTitle">
        <h1>Ecom Shop</h1>
      </div>
      <div className="products-screen">
      <div className="category-filters">
        <div className="horizontal-scroll-container">
          {categories.map((category, index) => (
            <button
              key={index}
              className={query === category ? "active" : ""}
              onClick={()=>handlequery(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      </div>



      <div className="products">
      {PRODUCTS.length > 0 &&
  PRODUCTS
    .filter((user) =>
      (user.category && user.category.toLocaleLowerCase().includes(query)) ||
      (user.price && user.price.toString().includes(query)) ||
      (user.id && user.id.toString().includes(query)) ||
      (user.brand && user.brand.toLocaleLowerCase().includes(query))
    )
    .map((product) => (
      <Product key={product.id} data={product} />
    ))
}
      </div>
    </div>
    </>
  );
};
