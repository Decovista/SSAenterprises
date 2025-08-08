import React, { useState } from "react";
import { useMyContext } from "../../Context/MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
  const { cartItems, setPopCart, setCartItems, setToggleCart } = useMyContext();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const grandTotal = cartItems.reduce((total, item) => {
    return total + item.qty * item.price;
  }, 0);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const getToken = () => localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const token = getToken();
    if (!token) {
      alert("Please log in before checkout.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      // 1. Create order payload
      const orderPayload = {
        customer: { ...formData },
        items: cartItems.map(({ _id, id, name, price, qty, img }) => ({
          productId: (_id || id)?.toString(),
          productname: name,
          price: price,
          quantity: qty,
          phone: formData.phone,
          img: img || "",
        })),
      };

      // 2. Place order
      const response = await axios.post(
        "https://ssa-backend-y3ne.onrender.com/api/inq",
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3. Clear backend cart (one by one)
      for (let item of cartItems) {
        await axios.delete(
          `https://ssa-backend-y3ne.onrender.com/api/cart/delete/item/${item._id || item.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // 4. Clear local state
      setCartItems([]);
      setToggleCart(0);
      setPopCart(false);

      localStorage.setItem("checkoutData", JSON.stringify(formData));
      localStorage.setItem("lastOrder", JSON.stringify(response.data.order));

      navigate("/ThankYou");
    } catch (error) {
      console.error("Checkout failed:", error);
      const message =
        error.response?.data?.message || "Failed to place order. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Checkout">
      <div className="Checkout-wrapper">
        <div className="checkout-form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="email-address"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            <div className="name-con">
              <input
                type="text"
                name="firstName"
                className="first-name"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={handleChange}
                disabled={loading}
              />
              <input
                type="text"
                name="lastName"
                className="last-name"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <input
              type="text"
              name="address"
              className="address"
              placeholder="Full Address"
              required
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
            />
            <div className="city-address">
              <input
                type="text"
                name="city"
                className="city"
                placeholder="City"
                required
                value={formData.city}
                onChange={handleChange}
                disabled={loading}
              />
              <input
                type="text"
                name="pincode"
                className="pincode"
                placeholder="Pincode"
                required
                value={formData.pincode}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <input
              type="tel"
              name="phone"
              className="phone-number"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Next"}
            </button>
            {errorMsg && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>

        <div className="cart-details">
          <h3>Order Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={cartItem.img}
                      alt={cartItem.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      onError={(e) => (e.target.src = "/fallback.jpg")}
                    />
                  </td>
                  <td>{cartItem.name}</td>
                  <td>{cartItem.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="grand-total">
            Grand Total: ₹{grandTotal.toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
