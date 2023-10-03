import React from "react";
import profilePng from "../../images/Profile.png";
// import { Rating } from "@mui/lab";
import ReactStars from "react-rating-stars-component"

const ReviewCard = (reviewProp ) => {

    const options = {
        value: reviewProp.ratings,
        edit: false,
        color: "rgba (20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true,
        readOnly: true,
        precision: 0.5,
      };


  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{reviewProp.name}</p>
      <ReactStars{...options} />
      <span className="reviewCardComment">{reviewProp.comment}</span>
    </div>
  );
};

export default ReviewCard;
