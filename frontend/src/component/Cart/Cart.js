import React from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard';

const Cart = () => {

const item= {
    product:"Bedsheet",
    price:200,
    name:"Riya"
}

  return (
  <>
  <div className='cartPage'>
    <div className='cartHeader'>
        <p>Product</p>
        <p>Quantity</p>
        <p>Subtotal</p>
    </div>

    <div className='cartContainer'>
        <CartItemCard item={item}/>
    </div>
  </div>
  </>
  )
}

export default Cart
