import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ image, name, price, id }) => {
  const { addToCart, cartItems } = useCart();
  const productInCart = cartItems.find((items) => items.id === id);
  const productQuantity = productInCart ? `(${productInCart.quantity})` : "";
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-name">{name}</h3>
        <p className="product-card-price">${price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary" to={`/product/${id}`}>
            View Details
          </Link>
          <button className="btn btn-primary" onClick={() => addToCart(id)}>
            Add to Cart {productQuantity}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
