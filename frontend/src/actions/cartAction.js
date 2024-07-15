import axios from 'axios';
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from '../constants/cartConstants';
import { PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants';

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

  // Update product details stock in the state
  dispatch({
    type: PRODUCT_DETAILS_SUCCESS,
    payload: {
      ...data.product,
      stock: data.product.Stock - quantity,
    },
  });
};

// Remove from Cart
export const removeItemsFromCart = (id) => (dispatch, getState) => {
  const state = getState();
  const item = state.cart.cartItems.find((i) => i.product === id);

  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));

  // Update product details stock in the state
  if (item) {
    const updatedStock = item.Stock + item.quantity;  
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: {
        ...item,
        stock: updatedStock,
      },
    });
  }
};

// Save Shipping Info
export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
