import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import { Navbar } from "../../components/navbar";
import "./shop.css";

export const Shop = () => {
  const [query,setQuery]=useState("");
 // console.log(PRODUCTS.filter((user)=>user.productName.includes("fe")));
  return (
    <>
    <Navbar/>
    <div className="searchbar">
       <input type="text"  aria-label="textaria" onChange={(e)=>setQuery(e.target.value)} placeholder="Search"/>
    </div>
    <div className="shop">
      <div className="shopTitle">
        <h1>Tech Shop</h1>
      </div>

      <div className="products">
        {PRODUCTS.filter((user)=>user.productName.toLocaleLowerCase().includes(query) || 
         user.price.toString().includes(query) ||
         user.id.toString().includes(query)
          ).map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
    </>
  );
};
