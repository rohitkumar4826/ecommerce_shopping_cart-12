import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import axios from 'axios';
import "./cart.css";
export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const createOrder = async () => {
    try {
      const response = await axios.post('/create-order', {
        amount: totalAmount*8200, // Replace with the desired amount
      });
      console.log('responce',response.data?.id);
      setOrderId(response.data.id);

      // Move handlePayment inside the .then block
      console.log('order id',orderId);
      handlePayment();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle payment
  const handlePayment = () => {
    console.log('order id',orderId);
    if (orderId) {
      const options = {
        key: 'rzp_test_2NCtGt4vEyAafD',
        amount: totalAmount*8200,
        currency: 'INR',
        name: 'ECOMSHOP',
        description: 'Purchase Description',
        order_id: orderId,
        handler: (response) => {
          console.log(response);
          // Handle the payment response here
        },
        prefill: {
          name: 'Rohit',
          email: 'supervikalpa@gmail.com',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error('Order ID is missing. Please create an order first.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/shop")}> Continue Shopping </button>
          {/* <button
            onClick={() => {
              handlePayment();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button> */}
          <button onClick={createOrder}>Create Order</button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
    </>
  );
};
