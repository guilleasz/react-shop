// @flow
import React from 'react';
import { type RouterHistory, Redirect } from 'react-router';
import { type Product as ProductType } from '../types';
import s from './Product.styl';

const Product = ({
  product,
  history,
}: {
  product: ProductType,
  history: RouterHistory,
}) => (
  product ?
    <div>
      <div className={s.image}>
        <img alt={product.image} src={product.image} />
      </div>
      <div className={s.description}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <div>${product.price}</div>
        <div>{product.availability ? 'Available' : 'Out of Stock'}</div>
        <button onClick={history.goBack}>Go Back</button>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
    :
    <Redirect to="/NotFound" />
);

export default Product;
