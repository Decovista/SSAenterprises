import React, { useEffect, useState } from 'react';
import { useMyContext } from '../../Context/MyContext';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const { cartItems } = useMyContext();
  const [buyer, setBuyer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('checkoutData');
    if (savedData) {
      setBuyer(JSON.parse(savedData));
    } 
  }, [navigate]);

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.price * Math.max(1, item.qty),
    0
  );

  const handlePayment = () => {
    alert('Payment Successful!');
    localStorage.removeItem('checkoutData'); 
    navigate('/ThankYou');
  };

  if (!buyer) return null;

  return (
    <div className="PaymentPage">
      <h2>Review & Pay</h2>

      <div className="buyer-info">
        <h3>Shipping Details</h3>
        <p><strong>Name:</strong> {buyer.firstName} {buyer.lastName}</p>
        <p><strong>Email:</strong> {buyer.email}</p>
        <p><strong>Address:</strong> {buyer.address}, {buyer.city} - {buyer.pincode}</p>
        <p><strong>Phone:</strong> {buyer.phone}</p>
      </div>

      <div className="order-summary">
        <h3>header summary</h3>
        <ul>
          {cartItems.map((item, i) => (
            <li key={i} className="summary-item">
              <span>{item.name} × {item.qty}</span>
              <span>₹{(item.qty * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="total-amount">
          <strong>Total:</strong> ₹{grandTotal.toFixed(2)}
        </div>
      </div>

      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <label>
          <input type="radio" name="method" defaultChecked />
          UPI / Wallet
        </label>
        <label>
          <input type="radio" name="method" />
          Credit / Debit Card
        </label>
        <label>
          <input type="radio" name="method" />
          Cash on Delivery (COD)
        </label>
      </div>

      <button className="pay-btn" onClick={handlePayment}>
        Proceed to Pay ₹{grandTotal.toFixed(2)}
      </button>
    </div>
  );
}

export default Payment;
