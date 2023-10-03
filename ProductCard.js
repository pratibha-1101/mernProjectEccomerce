import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";
import ReactStars from "react-rating-stars-component"




const ProductCard = ({ productprop }) => {

    const options = {
      value: productprop.ratings,
      readOnly: true,
      precision: 0.5,
  };


  return (
    <Link className="productCard" to={`/product/${productprop._id}`}>
      <img src={productprop.images[0].url} alt={productprop.name} />
      <p>{productprop.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({productprop.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${productprop.price}`}</span>
    </Link>

    
  );
};

export default ProductCard;
