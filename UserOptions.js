import React, { Fragment, useState } from "react";
import "./Header.css";
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import DashboardCustomizeSharpIcon from '@mui/icons-material/DashboardCustomizeSharp';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';

import { useNavigate } from "react-router-dom";
import { useDispatch
  , useSelector 
} from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";



const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltSharpIcon />, name: "Orders", func: orders },
    { icon: <PersonSharpIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartSharpIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppSharpIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardCustomizeSharpIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}    //our usericon shows 
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
