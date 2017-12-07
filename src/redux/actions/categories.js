// @flow
/* eslint-disable import/prefer-default-export */
import { type ActionCreator } from 'redux';
import { type Category, type SetCategoriesAction } from '../../types';

export const setCategories: ActionCreator<SetCategoriesAction, Category[]> = categories => ({
  type: 'SET_CATEGORIES',
  categories,
});
