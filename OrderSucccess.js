import React from "react";
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import "./OrderSucccess.css";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

/*  ---------------------------------
   In this page..notification comes
              " SUCCESS"
  ------------------------------------*/

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleSharpIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
