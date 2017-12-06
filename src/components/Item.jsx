// @flow
import React from 'react';
import { type Match } from 'react-router';
import { Link } from 'react-router-dom';
import s from './Item.css';

const Item = ({ product, match }: { product: Product, match: Match }) => (
  <Link to={`${match.url}/${String(product.id)}`}>
    <div className={s.item}>
      <img alt={product.name} src={product.image} />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </div>
  </Link>
);

export default Item;
