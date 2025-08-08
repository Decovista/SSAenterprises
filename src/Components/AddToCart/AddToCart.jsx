import React, { useEffect } from "react";
import { useMyContext } from "../../Context/MyContext";
import "./AddToCart.css";
import { Link } from "react-router-dom";
import axios from "axios";

function AddToCart() {
  const { cartItems, setCartItems, setToggleCart, setPopCart } = useMyContext();

  // Fetch cart on component mount
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartItems([]);
        setToggleCart(0);
        return;
      }
      try {
        const res = await axios.get(
          "https://ssa-backend-y3ne.onrender.com/api/cart",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data && res.data.items) {
          const formattedItems = res.data.items.map((item) => ({
            id: item.productId,
            name: item.productname,
            price: item.price,
            qty: item.quantity,
            img: item.img || "/fallback.jpg", // optional fallback
          }));
          setCartItems(formattedItems);
          setToggleCart(formattedItems.reduce((acc, i) => acc + i.qty, 0));
        } else {
          setCartItems([]);
          setToggleCart(0);
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCartItems([]);
        setToggleCart(0);
      }
    };

    fetchCart();
  }, [setCartItems, setToggleCart]);

  // Remove item from cart both frontend & backend
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.delete(
        `https://ssa-backend-y3ne.onrender.com/api/cart/delete/item/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.cart && res.data.cart.items) {
        const updatedItems = res.data.cart.items.map((item) => ({
          id: item.productId,
          name: item.productname,
          price: item.price,
          qty: item.quantity,
          img: item.img || "/fallback.jpg",
        }));
        setCartItems(updatedItems);
        setToggleCart(updatedItems.reduce((acc, i) => acc + i.qty, 0));
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const grandTotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="AddToCart">
        <h2>Your Cart</h2>
        <p className="empty-msg">Cart is empty 😔</p>
      </div>
    );
  }

  return (
    <div className="AddToCart">
      <div className="cart-list">
        <h2>Your Cart</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Cart Items</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="name">
                  <img
                    src={item.img}
                    alt={item.name}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                  {item.name}
                </td>
                <td>{Math.max(1, item.qty)}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-details">
        <div className="card-details-wrapper">
          <div className="proceed-tocheckout">
            <Link to="/Checkout">
              <button className="proceedtocheckout" onClick={() => setPopCart(false)}>
                Proceed to CheckOut
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
