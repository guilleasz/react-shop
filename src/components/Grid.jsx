// @flow
import * as React from 'react';
import { type ContextRouter } from 'react-router';
import Item from './Item';
import { type Product } from '../types';
import s from './Grid.css';

const Grid = ({
  products,
  selectedCategory,
  ...props
}: {
  products: Product[],
  selectedCategory: ?number,
  ...ContextRouter,
}) => (
  <div className={s.grid}>
    {products
        .filter(product => !selectedCategory || product.categoryId === selectedCategory)
        .map(product => <Item {...props} key={product.id} product={product} />)}
  </div>
);

export default Grid;
