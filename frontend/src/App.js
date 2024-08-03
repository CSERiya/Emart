import './App.css';
import { useState, useEffect } from 'react';
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import ProtectedRoute from './component/Route/ProtectedRoute';
import ProtectedStripeElements from './component/Route/ProtectedStripeElements';
import Loader from './component/layout/Loader/Loader'; 
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import ProcessOrder from './component/admin/ProcessOrder';

function App() {
  const { isAuthenticated, user, loading } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  async function getStripeApiKey() {
    try {
      const token = localStorage.getItem("token"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.get('/api/v1/stripeapikey', config);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized request, redirecting to login");
      } else {
        console.error("Error fetching Stripe API key:", error);
      }
    }
  }

  const NestedRoutes = () => {
    const params = useParams();
    return (
      <>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path='/products/:keyword' element={<Products match={params} />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route path="/account" element={<ProtectedRoute element={Profile} />} />
          <Route path="/me/update" element={<ProtectedRoute element={UpdateProfile} />} />
          <Route path="/password/update" element={<ProtectedRoute element={UpdatePassword} />} />
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login/shipping' element={<ProtectedRoute element={Shipping} />} />
          <Route path='/process/payment' element={
            stripeApiKey ? (
              <ProtectedStripeElements stripeApiKey={stripeApiKey}>
                <Payment />
              </ProtectedStripeElements>
            ) : null
          } />
          <Route path='/success' element={<ProtectedRoute element={OrderSuccess} />} />
          <Route path='/orders' element={<ProtectedRoute element={MyOrders} />} />
          <Route path='/order/confirm' element={<ProtectedRoute element={ConfirmOrder} />} />
          <Route path='/order/:id' element={<ProtectedRoute element={OrderDetails} />} />
          <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} element={Dashboard} />} />
          <Route path='/admin/products' element={<ProtectedRoute isAdmin={true} element={ProductList} />} />
          <Route path='/admin/product' element={<ProtectedRoute isAdmin={true} element={NewProduct}/>}/>
          <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} element={UpdateProduct}/>}/>
          <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true} element={OrderList}/>}/>
          <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} element={ProcessOrder}/>}/>
        </Routes>  
        <Footer />
      </>
    );
  };

  return (
    <Router>
      {loading ? <Loader /> : <NestedRoutes />}
    </Router>
  );
}

export default App;
