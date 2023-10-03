import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';

import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";

/*  --------------------------------------------------------------------------------------------
   In this page we are getting all the details regarding ORDERS, which only "Admin" can access
                                          named as "ORDER LIST"
  ----------------------------------------------------------------------------------------------*/

const OrderList = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

 //USING "USESTATE HOOK EFFECT" FOR DISPACHING "CLEAR ERRORS" AND WHEN SUCCESS NAVIGATE TO THE "ALL ORDERS LIST"
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  // -----------------------------------

  //CREATING THE COLUMN OF THE PAGE WITH ALL THE HEADINGS AND FIELDS
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status", headerName: "Status", minWidth: 150, flex: 0.5,
      cellClassName: (params) => {
        return (params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.4, },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5, },
    {
      field: "actions", flex: 0.3, headerName: "Actions", minWidth: 150, type: "number", sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.row.id || ''}`}>          {/* params.getValue()  IS NOT WORKING*/}
              <EditNoteSharpIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.row.id || '')
              }
            >
              <DeleteSharpIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  // ------------------------------------------------------

 //CREATING THE ROW OF THE PAGE WITH ALL THE DETAILS OF THE HEADINGS
  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  // -----------------------------------
  
  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
