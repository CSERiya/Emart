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

function App() {
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
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/products" element={<Products/>} />
          <Route path='/products/:keyword' element={<Products match={params} />} />
          <Route path='/Search' element={<Search/>}/>
          <Route path='/login' element={<LoginSignUp/>}/>
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
