import React from 'react'
import { ReactNavbar } from "overlay-navbar";   //using navbar overlay effect
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/logo.png";          //eccomerce logo
import './Header.css'


const options = {

  //burger
  menuBurgerHeight: "4.5vmax",
  burgerColorHover: "green",

  //logo
  logo,
  logoWidth: "28vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "green",

  //Home link
  link1Text: "Home",
  link1Url: "/",
  link1Size: "1.5vmax",
  link1Color: "green",
  link1ColorHover: "#eb4034",
  link1Margin: "2vmax",
  nav1justifyContent: "flex-end ",

  //products link
  link2Text: "Products",
  link2Url: "/products",
  nav2justifyContent: "flex-end",

  //contact link
  link3Text: "Contact",
  link3Url: "/contact",
  nav3justifyContent: "flex-start",
  
  //about link
  link4Text: "About",
  link4Url: "/about",
  nav4justifyContent: "flex-start",

  //profile icon
  ProfileIconElement: MdAccountCircle,
  profileIcon: true,
  profileIconUrl: "/login",
  profileIconColor: "tomato",
  profileIconColorHover: "green",

   //search icon
  SearchIconElement: MdSearch,
  searchIcon: true,
  searchIconColor: "tomato",
  searchIconColorHover: "green",
  searchIconUrl: "/search",

   //cart icon
  CartIconElement: MdAddShoppingCart,
  cartIcon: true,
  cartIconColor: "tomato",
  cartIconColorHover: "green",
  cartIconMargin: "1vmax",
  cartIconUrl: "/cart",

};


const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header
