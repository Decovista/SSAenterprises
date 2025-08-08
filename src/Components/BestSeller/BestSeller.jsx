import React from "react";
import { useMyContext } from "../../Context/MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BestSeller.css";

function BestSeller() {
  const {
    productsData,
    setToggleCart,
    toggleCart,
    setCartItems,
    cartItems,
    setAddTo,
  } = useMyContext();

  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const handleAddToCart = async (product) => {
    const token = getToken();
    if (!token) {
      alert("You must be logged in to add products to the cart.");
      return;
    }

    try {
      const productId = product._id || product.id;
      const productname = product.name;
      const quantity = 1;
      const img = product.img;

      // Validate essential fields
      if (!productId || !productname || !quantity || !img) {
        console.error("Add to cart error: productId, productname, quantity, and img are required");
        return;
      }

      await axios.post(
        "https://ssa-backend-y3ne.onrender.com/api/cart/add",
        { productId, productname, quantity, img },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const existing = cartItems.find((item) => (item._id || item.id) === productId);
      let updatedCart;

      if (existing) {
        updatedCart = cartItems.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        updatedCart = [...cartItems, { ...product, _id: productId, qty: 1 }];
      }

      setCartItems(updatedCart);
      setToggleCart((prev) => prev + 1);
      setAddTo(true);
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to add product to cart";
      console.error("Add to cart error:", msg);
    }
  };

  const handleDecreaseQty = async (product) => {
    const token = getToken();
    if (!token) {
      alert("You must be logged in to update the cart.");
      return;
    }

    try {
      const productId = product._id || product.id;
      const current = cartItems.find((item) => (item._id || item.id) === productId);
      if (!current || current.qty <= 0) return;

      const newQty = current.qty - 1;

      await axios.patch(
        "https://ssa-backend-y3ne.onrender.com/api/cart/update",
        { productId, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedCart = cartItems
        .map((item) =>
          (item._id || item.id) === productId
            ? { ...item, qty: newQty }
            : item
        )
        .filter((item) => item.qty > 0);

      setCartItems(updatedCart);
      setToggleCart((prev) => (prev > 0 ? prev - 1 : 0));
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Failed to update quantity";
      console.error("Decrease qty error:", msg);
      alert(msg);
    }
  };

  return (
    <div className="BestSeller">
      <h2 className="bestSeller-Title">Bestseller Products</h2>
      <div className="best-seller-wrapper">
        {productsData.map((bests, index) => {
          if (!bests.bestSeller) return null;

          const pid = bests._id || bests.id;
          const cartItem = cartItems.find((item) => (item._id || item.id) === pid);
          const quantity = cartItem ? cartItem.qty : 0;
          const token = getToken();

          return (
            <div className="best-seller-card" key={pid || index}>
              <img
                src={bests.img}
                alt={bests.name}
                className="best-img"
                onClick={() => navigate(`/details/${pid}`)}
              />
              <h2>{bests.name}</h2>

              {!token ? (
                <button
                  className="GetNow"
                  onClick={() => alert("Please log in to add items.")}
                >
                  Login to Add
                </button>
              ) : quantity === 0 ? (
                <button className="GetNow" onClick={() => handleAddToCart(bests)}>
                  Add to Quotation
                </button>
              ) : (
                <div className="GetNow quantity-control">
                  <button onClick={() => handleDecreaseQty(bests)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleAddToCart(bests)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BestSeller;
