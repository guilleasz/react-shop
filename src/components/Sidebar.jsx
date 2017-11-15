// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Route, type ContextRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { type Category, type Product } from '../types';
import s from './Sidebar.styl';
import AddProduct from '../containers/AddProduct';

const ActiveLink = ({ to, label }: {to: string, label: string }) => (
  <Route path={to} exact>
    {({ location }: ContextRouter) => (
      <Link to={to}>
        <h2 className={(location.pathname + location.search) === to ? s.active : ''}>
          {label}
        </h2>
      </Link>
    )}
  </Route>
);

const Sidebar = ({
  categories,
  addProduct,
}: {
  categories: Category[],
  addProduct: (product: Product) => void,
}) => (
  <ul className={s.sidebar}>
    <li>
      <ActiveLink to="/products" label="All" />
    </li>
    {categories.map(category => (
      <li key={category.id}>
        <ActiveLink to={`/products?category=${category.id}`} label={category.name} />
      </li>))}
    <AddProduct addProduct={addProduct} categories={categories} />
  </ul>
);

export default Sidebar;
