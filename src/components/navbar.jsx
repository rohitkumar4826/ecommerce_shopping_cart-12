import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ShopContext } from "../context/shop-context"; // Import ShopContext
import "./navbar.css";

export const Navbar = () => {
  const { cartItems, totalAmount } = useContext(ShopContext); // Get cartItems from the context
  // Calculate the total items in the cart
  const totalCartItems = Object.values(cartItems).reduce((acc, count) => acc + count, 0);

  return (
    <div className="navbar">
      <div className="hamb">
        <Link to="/"> Logout </Link>
        {/* <Link to="/login"> Login </Link> */}
      </div>
      <div className="links">
        <Link to="/shop"> Shop </Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        {totalCartItems > 0 && 
        <span className="item-count text-white bg-blue-500 px-2 rounded-full border-2 border-blue-400">{totalCartItems}</span>
        }
       {totalAmount > 0 && (
          <span className="total-amount text-black ">₹{totalAmount.toFixed(2)*82}</span>
        )}
      </div>
    </div>
  );
};
