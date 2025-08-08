import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";
import axios from "axios";
import "./ProductDetail.css";

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    productsData,
    cartItems,
    setCartItems,
    toggleCart,
    setToggleCart,
    setAddTo,
  } = useMyContext();

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const getToken = () => localStorage.getItem("token");

  const product =
    productsData.find(
      (item) =>
        item.id?.toString() === productId ||
        item._id?.toString() === productId
    ) || {};

  if (!product || !product.name) return <p>Product not found</p>;

  const pid = product._id || product.id;
  const cartItem = cartItems.find((item) => (item._id || item.id) === pid);
  const quantity = cartItem ? cartItem.qty : 0;

  const handleAddToCart = async (productToAdd, increment = 1) => {
    const token = getToken();
    if (!token) {
      alert("Please login to add items to your cart.");
      return;
    }

    const productId = productToAdd._id || productToAdd.id;
    const productname = productToAdd.name;
    const img = productToAdd.img;
    const quantity = increment;

    if (!productId || !productname || quantity === undefined) {
      setErrorMsg("Missing required product fields.");
      console.error("Add to cart error: productId, productname, and quantity are required");
      return;
    }

    try {
      await axios.post(
        "https://ssa-backend-y3ne.onrender.com/api/cart/add",
        {
          productId: productId.toString(),
          productname,
          quantity,
          img,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const exists = cartItems.find((i) => (i._id || i.id) === productId);
      let updated;

      if (exists) {
        updated = cartItems.map((i) =>
          (i._id || i.id) === productId ? { ...i, qty: i.qty + increment } : i
        );
      } else {
        updated = [...cartItems, { ...productToAdd, qty: increment }];
      }

      const filteredUpdated = updated.filter((i) => i.qty > 0);

      setCartItems(filteredUpdated);
      setToggleCart(filteredUpdated.reduce((acc, i) => acc + i.qty, 0));
      setAddTo(true);
      setErrorMsg("");
    } catch (error) {
      console.error("Add to cart failed:", error.message);
      setErrorMsg(error.response?.data?.message || error.message || "Failed to add to cart.");
    }
  };

  const handleDecreaseQty = async (productToDecrease) => {
    const current = cartItems.find(
      (item) => (item._id || item.id) === (productToDecrease._id || productToDecrease.id)
    );
    if (!current || current.qty <= 0) return;
    await handleAddToCart(productToDecrease, -1);
  };

  const related = productsData.filter(
    (p) =>
      p.category === product.category &&
      (p.id || p._id)?.toString() !== pid.toString()
  );

  return (
    <div className="product-detail-page">
      <div className="product-detail">
        <div className="product-details-wrapper">
          <img src={product.img} alt={product.name} className="detail-img" />
          <div className="detail-info">
            <h2>{product.name}</h2>
            <p>PA</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p>
              <strong>Description:</strong>{" "}
              {product.description || "No description available."}
            </p>

            {!isLoggedIn ? (
              <button
                className="add-btn"
                onClick={() => alert("Please login to add items to your quotation.")}
              >
                Login to Add
              </button>
            ) : quantity === 0 ? (
              <button
                className="add-btn"
                onClick={() => handleAddToCart(product, 1)}
              >
                Add to Cart
              </button>
            ) : (
              <div className="add-btn quantity-control">
                <button onClick={() => handleDecreaseQty(product)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleAddToCart(product, 1)}>+</button>
              </div>
            )}

            {errorMsg && <p className="error-message">{errorMsg}</p>}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-products">
          <h3>Related Products</h3>
          <div className="products-grid">
            {related.map((rel, index) => {
              const rid = rel._id || rel.id;
              const relQty =
                cartItems.find((item) => (item._id || item.id) === rid)?.qty || 0;

              return (
                <div key={rid || index} className="related-card">
                  <img
                    src={rel.img}
                    alt={rel.name}
                    className="related-img"
                    onClick={() => navigate(`/details/${rid}`)}
                  />
                  <h4>{rel.name}</h4>

                  {!isLoggedIn ? (
                    <button
                      className="add-btn"
                      onClick={() => alert("Please login to add items to your quotation.")}
                    >
                      Login to Add
                    </button>
                  ) : relQty === 0 ? (
                    <button
                      className="add-btn"
                      onClick={() => handleAddToCart(rel, 1)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="add-btn quantity-control small">
                      <button onClick={() => handleDecreaseQty(rel)}>-</button>
                      <span>{relQty}</span>
                      <button onClick={() => handleAddToCart(rel, 1)}>+</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;