/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import s from './Sidebar.styl';
import AddProduct from '../containers/AddProduct';

const Sidebar = ({
  categories,
  changeCategory,
  addProduct,
}) => (
  <ul className={s.sidebar}>
    <li>
      <button onClick={() => changeCategory(null)}>
        All
      </button>
    </li>
    {categories.map(category => (
      <li key={category.id}>
        <h2 onClick={() => changeCategory(category.id)}>
          {category.name}
        </h2>
      </li>))}
    <AddProduct addProduct={addProduct} categories={categories} />
  </ul>
);

export default Sidebar;
