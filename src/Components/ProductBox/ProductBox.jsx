import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductBox.css";
import { useMyContext } from "../../Context/MyContext";

const categories = ["Electrical", "Plumbing", "Solar", "Electronics"];

function ProductBox() {
  const {
    productsData,
    cartItems,
    isLoggedIn,
    setIsLoggedIn,
    handleAddToCart,
    handleDecreaseQty,
  } = useMyContext();

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Electrical");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const filteredProducts = productsData.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className="product-box-container">
      <div className="category-filter">
        <h2 className="title">Categories</h2>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              className={cat === selectedCategory ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="product-list">
        <h2 className="title-p">{selectedCategory} Products</h2>
        <div className="product-scroll">
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const pid = product._id || product.id;
              const cartItem = cartItems.find(
                (item) => (item._id || item.id) === pid
              );
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <div className="product-card" key={pid}>
                  <img
                    className="Product-img"
                    src={product.img}
                    alt={product.name}
                    onClick={() => navigate(`/details/${pid}`)}
                  />
                  <h3>{product.name}</h3>

                  {!isLoggedIn ? (
                    <button
                      className="add-btn"
                      onClick={() =>
                        alert("Please log in to add items to the quotation.")
                      }
                    >
                      Login to Add
                    </button>
                  ) : quantity === 0 ? (
                    <button
                      className="add-btn"
                      onClick={() => handleAddToCart(product)}
                    >
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
      </div>
    </div>
  );
}

export default ProductBox;
