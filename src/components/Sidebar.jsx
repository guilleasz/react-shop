/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import s from './Sidebar.styl';
import AddProduct from '../containers/AddProduct';

const ActiveLink = ({ to, label }) => (
  <Route path={to} exact>
    {({ location }) => (
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
}) => (
  <ul className={s.sidebar}>
    <li>
      <ActiveLink to="/products" label="All" />
    </li>
    {categories.map(category => (
      <li key={category.id}>
        <ActiveLink to={`/products?category=${category.id}`} label={category.name} />
      </li>))}
    <li>
      <ActiveLink to="/cart" label="Cart" />
    </li>
    <AddProduct addProduct={addProduct} categories={categories} />
  </ul>
);

export default Sidebar;
