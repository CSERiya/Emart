// import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from '../constants/cartConstants';
// import { PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants';

// export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
//   switch (action.type) {

//     case ADD_TO_CART:
//       const item = action.payload;
//       const existItem = state.cartItems.find((i) => i.product === item.product);

//       if (existItem) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((i) =>
//             i.product === existItem.product ? item : i
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }

//     case REMOVE_CART_ITEM:
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((i) => i.product !== action.payload),
//       };

//     case SAVE_SHIPPING_INFO:
//       return {
//         ...state,
//         shippingInfo: action.payload,
//       };

//     case PRODUCT_DETAILS_SUCCESS:
//       return {
//         ...state,
//         productDetails: action.payload,
//       };

//     default:
//       return state;
//   }
// };
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from '../constants/cartConstants';
import { PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants';

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
  switch (action.type) {

    case ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetails: action.payload,
      };

    default:
      return state;
  }
};

