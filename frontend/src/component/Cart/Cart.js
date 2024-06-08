import React from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard';

const Cart = () => {

const item= {
    product:"Bedsheet",
    price:200,
    name:"Riya",
    quantity:1,
    image:"https://m.media-amazon.com/images/I/816rTCsPhWL._AC_UF894,1000_QL80_.jpg",
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
       <div className='cartInput'>
        <button>-</button>
        <input type='number' value={item.quantity} readOnly />
        <button>+</button>
       </div>
       <p className='cartSubtotal'>{`₹${item.price*item.quantity}`}</p>
    </div>
  </div>
  </>
  )
}

export default Cart
