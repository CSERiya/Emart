import './App.css';
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import { useParams } from 'react-router-dom';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions'
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile'
import  UpdateProfile  from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';

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
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path='/password/forgot' element={<ForgotPassword/>}/>
          <Route path='/password/reset/:token' element={< ResetPassword/>}/>
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