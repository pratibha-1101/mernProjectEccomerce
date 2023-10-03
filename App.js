import './App.css';
import React, { useEffect, useState } from "react";
import Header from './component/layout/Header/Header.js';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import WebFont from "webfontloader";

import Footer from './component/layout/Footer/Footer.js';
import HomePage from './component/Home/Home.js';
import ProductDetailsPage from './component/product/ProductDetailPage';
import ProductFilter from './component/product/productFilter';
import Search from './component/product/search';
import LoginSignUp from './component/user/loginSignUp';
import UserOptions from './component/layout/Header/UserOptions';
import Profile from './component/user/Profile';
import UpdateProfile from './component/user/UpdateProfile';
import UpdatePassword from './component/user/UpdatePassword';
import ForgotPassword from './component/user/ForgetPassword';
import ResetPassword from './component/user/resertPassword';
import Cart from './component/cart/cart';
import Shipping from './component/cart/Shipping';
import OrderConfirm from './component/cart/OrderConfirm';
import Payment from './component/cart/Payment';
import OrderSuccess from './component/cart/OrderSucccess';
import MyOrders from './component/order/MyOrders';
import OrderDetails from './component/order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import store from './store';
// import ProtectedRoute from './component/Route/productRouter';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";

import { useSelector } from 'react-redux';
import { loadUser } from './actions/userActions';
import ProductList from './component/admin/ProductList';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import UsersList from './component/admin/UsersList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import ProcessOrder from './component/admin/ProcessOrder';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import ElementsLayout from './component/path/ElementsLayout';


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }



  //using webfontloader for using different types of fonts at the same time.
  useEffect(() => {
  WebFont.load({
    google: {
      families: ["Roboto", "Droid Sans", "Chilanka"],
    },
  });
  store.dispatch(loadUser());
  getStripeApiKey();
}, []);


  return (
    <div className="App">
      <BrowserRouter>

        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        {stripeApiKey && <ElementsLayout stripe={loadStripe(stripeApiKey)} />}

        <Routes>


        {stripeApiKey && (<ElementsLayout stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment" element={<Payment /> }/>
          </ElementsLayout>)}            
          {/* --cant understand how to import above line */}



          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/product/:id" element={<ProductDetailsPage />}></Route>
          <Route exact path="/products" element={<ProductFilter />}></Route>
          <Route path="/products/:keyword" element={<ProductFilter />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
          <Route exact path="/password/forgot" element={<ForgotPassword />}></Route>
          <Route exact path="/password/reset/:token" element={<ResetPassword />}></Route>
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={<Shipping />}></Route>
          <Route exact path="/contact" element={<Contact />} />

          <Route exact path="/about" element={<About />} />


          {/*isAuthenticated  --working */}
          <Route exact path="/account" element={isAuthenticated ? (<Profile />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route exact path="/me/update" element={isAuthenticated ? (<UpdateProfile />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route exact path="/password/update" element={isAuthenticated ? (<UpdatePassword />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route exact path="/order/confirm" element={isAuthenticated ? (<OrderConfirm />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route exact path="/success" element={isAuthenticated ? (<OrderSuccess />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route exact path="/orders" element={isAuthenticated ? (<MyOrders />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route exact path="/order/:id" element={isAuthenticated ? (<OrderDetails />) : (<Navigate replace to={'/login'} />)}></Route>
          {/* <Route exact path="/shipping" element={isAuthenticated ? (<Shipping />) : (<Navigate replace to={'/login'} />)}></Route> */}


          {/* for only Admin  */}
          <Route isAdmin={true} exact path="/admin/dashboard" element={isAuthenticated ? (<Dashboard />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route isAdmin={true} exact path="/admin/products" element={isAuthenticated ? (<ProductList />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route isAdmin={true} exact path="/admin/product" element={isAuthenticated ? (<NewProduct />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route isAdmin={true} exact path="/admin/product/:id" element={isAuthenticated ? (<UpdateProduct />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route isAdmin={true} exact path="/admin/orders" element={isAuthenticated ? (<OrderList />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route isAdmin={true} exact path="/admin/order/:id" element={isAuthenticated ? (<ProcessOrder />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route isAdmin={true} exact path="/admin/users" element={isAuthenticated ? (<UsersList />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route isAdmin={true} exact path="/admin/user/:id" element={isAuthenticated ? (<UpdateUser />) : (<Navigate replace to={'/login'} />)}></Route>
          <Route isAdmin={true} exact path="/admin/reviews" element={isAuthenticated ? (<ProductReviews />) : (<Navigate replace to={'/login'} />)}></Route>



          {/* protected routes   --not working */}
          {/*<Route exact path="/me/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
        <Route exact path="/password/update" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/> 
          <Route exact path="/accont" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
          <Route exact path="/me/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}></Route>*/}


        </Routes>

        <Footer />

      </BrowserRouter>


    </div >
  );
}

export default App;

