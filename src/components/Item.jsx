import React from 'react';
import { type Product } from '../types';

const Item = ({ product }: { product: Product }) => (
  <div>
    <img src={product.image} />
    <h1>{product.name}</h1>
    <p>{product.price}</p>
  </div>
);

export default Item;