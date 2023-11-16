import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [orderId, setOrderId] = useState(null);

  const createOrder = async () => {
    try {
      const response = await axios.post('/create-order', {
        amount: 1000, // Replace with the desired amount
      });
      setOrderId(response.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = () => {
    if (orderId) {
      const options = {
        key: 'rzp_test_2NCtGt4vEyAafD',
        amount: 1000, // Replace with the same amount used when creating the order
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
    <div>
      <button onClick={createOrder}>Create Order</button>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Payment;
