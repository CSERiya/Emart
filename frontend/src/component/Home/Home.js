import React, { useEffect } from 'react'
import './Home.css'
import { CgMouse } from 'react-icons/cg';
import MetaData from '../layout/MetaData.js';
import { getProduct } from '../../actions/productAction.js';
import {useSelector, useDispatch} from "react-redux"
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from 'react-alert'
import { clearErrors } from '../../actions/productAction';
import ProductCard from './ProductCard.js';


const Home = () => {

  const alert= useAlert();
  const dispatch= useDispatch();
const  {loading, error, products}= useSelector((state)=>state.products);

  useEffect(()=> {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
   dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
    {loading?<Loader/>:<><MetaData title="Emart"></MetaData>
      <div className='banner'>
        <p>Welcome to Emart</p>
        <h1>FIND AMAZING PRODUCTS AT AFFORDABLE PRICES</h1>

        <a href="#container">
            <button>
            Scroll 
            <CgMouse/>
            </button>
        </a>
      </div>

      <h2 className='homeHeading'>Featured Products</h2>

      <div className='container' id='container'>
        {products && products.map((product) =><ProductCard product={product}></ProductCard>)}
      </div>
</>}
    </>
  )
}

export default Home;
