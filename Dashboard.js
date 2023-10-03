import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userActions.js";
import MetaData from "../layout/MetaData";

//  ----------------------------------------------------------------------------------------------------------------
//   In this page we are getting all the details regarding this App(Eccomerce App), which only "Admin" can access
//                                          named as "DASHBOARD"
//  ----------------------------------------------------------------------------------------------------------------

const Dashboard = () => {

  const dispatch = useDispatch();
  Chart.register(CategoryScale);

  //getting all the details of these "reducers" via "useSelector hook"
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);


  //total number of products which we ordered are "Out of Stock" counted from here!
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });


  //getting all the products which we are ordered with all the details of products and user as well! 
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);


  //total price of the products which we ordered counted from here!
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });


  // Assembling "Initial Amount", "Amount Earned" and "TOTAL AMOUNT" of products here!...
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };


  // decorating "out of stock" and "instock" products as donut style...
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };


  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />                                         {/* WHERE ALL THE LINKS WHICH ADMIN CAN USE ARE DONE !*/ }

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>

          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">                          {/*  TOTAL NUMBER OF 'PRODUCTS AVAILABLE' IN THIS APP*/}
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">                             {/*  TOTAL NUMBER OF 'ORDERS DONE' IN THIS APP*/}
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>                                               {/*  TOTAL NUMBER OF 'USERS' WHO LOGGINED HERE*/}
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">                                {/*  TOTAL AMOUNT EARNED BY THE SELLER IN GRAPHICAL WAY*/}
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">                            {/*  TOTAL NUMBER OF STOCKS LEFT IN THE DONUT STYLE*/}
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
