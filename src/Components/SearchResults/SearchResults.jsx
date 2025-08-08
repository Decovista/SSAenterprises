import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";
import "./SearchResults.css";
import asstes from "../../assets/asstes";
import axios from "axios";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results = [], query = "" } = location.state || {};
  const { cartItems, setCartItems, setToggleCart, setAddTo } = useMyContext();

  const getToken = () => localStorage.getItem("token");

  const handleAddToCart = async (product) => {
    const token = getToken();

    if (!token) {
      alert("You must be logged in to add products to cart.");
      return;
    }

    const productId = product._id || product.id;
    const productname = product.name;
    const img = product.img;
    const price = product.price;

    try {
      await axios.post(
        "https://ssa-backend-y3ne.onrender.com/api/cart/add",
        {
          productId,
          productname,
          quantity: 1,
          img,
          price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const exists = cartItems.find((item) => (item._id || item.id) === productId);
      let updatedCart;
      if (exists) {
        updatedCart = cartItems.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        updatedCart = [...cartItems, { ...product, qty: 1 }];
      }

      setCartItems(updatedCart);
      setToggleCart(updatedCart.reduce((acc, i) => acc + i.qty, 0));
      setAddTo(true);
    } catch (err) {
      console.error("Add to cart error:", err);
      const msg = err.response?.data?.message || "";
    }
  };

  const handleDecreaseQty = async (product) => {
    const token = getToken();

    if (!token) {
      alert("You must be logged in to update cart.");
      return;
    }

    const productId = product._id || product.id;
    const productname = product.name;
    const img = product.img;
    const price = product.price;

    const current = cartItems.find((item) => (item._id || item.id) === productId);
    if (!current || current.qty <= 0) return;

    const newQty = current.qty - 1;

    try {
      await axios.post(
        "https://ssa-backend-y3ne.onrender.com/api/cart/add",
        {
          productId,
          productname,
          quantity: -1,
          img,
          price,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedCart = cartItems
        .map((item) =>
          (item._id || item.id) === productId
            ? { ...item, qty: newQty }
            : item
        )
        .filter((i) => i.qty > 0);

      setCartItems(updatedCart);
      setToggleCart(updatedCart.reduce((acc, i) => acc + i.qty, 0));
    } catch (err) {
      console.error("Update cart error:", err);
      const msg = err.response?.data?.message || "Failed to update cart";
      alert(msg);
    }
  };

  return (
    <div className="search-results">
      <div className="product-box-container">
        <h2 className="title-p">Search Results for: "{query}"</h2>
        {results.length === 0 ? (
          <video className="h-[200px] w-full" autoPlay muted loop src={asstes.page404}>
            Page Not Found
          </video>
        ) : (
          <div className="product-scroll">
            <div className="products-grid">
              {results.map((product) => {
                const pid = product._id || product.id;
                const cartItem = cartItems.find((i) => (i._id || i.id) === pid);
                const quantity = cartItem ? cartItem.qty : 0;

                return (
                  <div key={pid} className="product-card">
                    <img
                      className="Product-img"
                      src={product.img}
                      alt={product.name}
                      onClick={() => navigate(`/details/${pid}`)}
                    />
                    <h3>{product.name}</h3>

                    {quantity === 0 ? (
                      <button className="add-btn" onClick={() => handleAddToCart(product)}>
                        Add to Quotation
                      </button>
                    ) : (
                      <div className="add-btn quantity-control">
                        <button onClick={() => handleDecreaseQty(product)}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleAddToCart(product)}>+</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
