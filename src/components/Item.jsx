// @flow
import React from 'react';
import { type Product } from '../types';

const Item = ({ product }: { product: Product }) => (
  <div>
    <img alt={product.name} src={product.image} />
    <h1>{product.name}</h1>
    <p>{product.price}</p>
  </div>
);

export default Item;
