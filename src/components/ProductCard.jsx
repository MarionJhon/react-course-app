import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ image, name, price }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-name">{name}</h3>
        <p className="product-card-price">${price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary">View Details</Link>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
