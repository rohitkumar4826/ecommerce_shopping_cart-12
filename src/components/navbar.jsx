import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="hamb">
      <Link to="/"> SignUp </Link>
        <Link to="/login"> Login </Link>
      </div>
      <div className="links">
        <Link to="/shop"> Shop </Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
