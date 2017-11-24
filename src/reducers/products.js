import { GET_PRODUCTS, RECEIVE_PRODUCTS, RECEIVE_CATEGORIES, GET_CATEGORIES } from '../actions';

const initialState = {
  items: [],
  categories: [], 
  isLoading: false,
};

function products(state = initialState, action) {
  
  switch (action.type) {
    case GET_PRODUCTS:
      return {  
        ...state,
        isLoading: true,
      }
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        items: action.products,
        isLoading: false,
      }
    case GET_CATEGORIES:
      return {  
        ...state,
        isLoading: true,
      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
        isLoading: false,
      }
    default:
      return state
  }
}

export default products;
