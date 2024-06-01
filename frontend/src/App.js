import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import { useParams } from 'react-router-dom';
import LoginSignUp from './component/User/LoginSignUp.js';
import store from './store.js'
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js'

function App() {

const {isAuthenticated, user}= useSelector(state=>state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser());

  }, []);

  // Nested component to render routes and pass match prop to Products
  const NestedRoutes = () => {
    const params = useParams()
    return (
      <>
        <Header />
        {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/products" element={<Products/>} />
          <Route path='/products/:keyword' element={<Products match={params} />} />
          <Route path='/Search' element={<Search/>}/>
          <Route path='/login' element={<LoginSignUp/>}/>
          <Route path='/account' element={<Profile/>} />
        </Routes>
        <Footer />
      </>
    );
  };

  return (
    <Router>
      <NestedRoutes />
    </Router>
  );
}

export default App;
