import React from 'react';
import s from './Item.css';

const Item = ({ product }) => (
  <div className={s.item}>
    <img alt={product.name} src={product.image} />
    <h1>{product.name}</h1>
    <p>{product.price}</p>
  </div>
);

export default Item;
