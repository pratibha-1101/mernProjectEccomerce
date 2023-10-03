import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./OrderConfirm.css";
import { Link, useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import CheckoutSteps from "../cart/checkOutSteps";

/* -----------------------------------------------------
Creating page to confirm the details of all the products
                which you are ordered
----------------------------------------------------- */

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // calculating all the prices like shipping charge, tax 
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    // storing all the details in temporary storage called session storage
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");

  };

  // -----------------------------------
  
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">

            <Typography>Shipping Info</Typography>

            {/* confirm whether the name, phone number and address of the user are correct? */}
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>

          </div>

          {/* confirm whether the product, their prices and quantity are correct? */}
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>

        </div>

        {/* want to place the order with these order details or not? */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>


            {/* if all the details are correct? please continue to pay the price of the product */}
            <button onClick={proceedToPayment}>Proceed To Payment</button>

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
