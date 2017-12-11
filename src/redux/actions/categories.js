// @flow
/* eslint-disable import/prefer-default-export */
import { type ActionCreator } from 'redux';
import axios, { type $AxiosXHR } from 'axios';
import { type Category, type SetCategoriesAction, type FetchingCategoriesAction, type DispatchThunk } from '../../types';

export const setCategories: ActionCreator<SetCategoriesAction, Category[]> = categories => ({
  type: 'SET_CATEGORIES',
  categories,
});

export const fetchingCategories: ActionCreator<FetchingCategoriesAction, void> = () => ({
  type: 'FETCHING_CATEGORIES',
});

export const fetchCategories = () => (dispatch: DispatchThunk) => {
  dispatch(fetchingCategories());
  return axios.get('http://develop.plataforma5.la:3000/api/categories')
    .then((res: $AxiosXHR<Category[]>) => res.data)
    .then(categories => dispatch(setCategories(categories)));
};
