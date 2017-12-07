const initialState = {
  items: []
}

export default function productsReducer (state = initialState, action) {
  switch(action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        items: action.products,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        items: [...action.product, state.products],
      };
    default:
      return state;
  }
}
