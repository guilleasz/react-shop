const initialState = {
  items: []
}

export default function categoriesReducer (state = initialState, action) {
  switch(action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        items: action.categories,
      };
    default:
      return state;
  }
}
