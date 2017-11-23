import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QUANTITY,  } from '../actions'

//
// state = {
//    cart: [ {
//      productId: string,
//      quantity: number
//    }]
// }
//

function cart(state = [], action) {
  const elem = state.cart.findIndex(elem => elem.productId === action.productId);
  switch (action.type) {
    case ADD_TO_CART:
      if(elem === -1) {
        return {
          ...state,
          cart: [...state.cart, {
            productId: action.productId,
            quantity: 1,
          }],
        };
      }
      return {
        cart: [...state.cart.slice(0, elem),
          {
            productId: action.productId,
            quantity: state.cart[elem].quantity + 1,
          },
          ...state.cart.slice(elem),
        ],
      }
    case CHANGE_QUANTITY:
      return {
        cart: [ ...state.cart.slice(0, elem),
          {
            productId: action.productId,
            quantity: action.quantity,
          },
          ...state.cart.slice(elem),
        ],
      }
    case REMOVE_FROM_CART:
      if(elem === -1){
        return state;
      }
      return {
        ...state,
        cart: [...state.cart.slice(0, elem), ...state.cart.slice(elem)],
      }
    default:
      return state
  }
}

export default cart;
