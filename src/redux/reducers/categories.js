// @flow
import { type Reducer } from 'redux';
import { type CategoriesState, type CategoriesActions } from '../../types';

const initialState: CategoriesState = {
  items: [],
};

const categoriesReducer: Reducer<CategoriesState, CategoriesActions> =
(state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        items: action.categories,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
