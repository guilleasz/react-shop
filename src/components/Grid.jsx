// @flow
import React from 'react';
import Item from './Item';
import { type Product } from '../types';

const Grid = ({ products }: { products: Product[] }) => (
  <div>
    {products.map(product => <Item key={product.id} product={product} />)}
  </div>
);

export default Grid;