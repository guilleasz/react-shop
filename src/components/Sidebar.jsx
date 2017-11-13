// @flow
import React from 'react';
import { type Category } from '../types';
import s from './Sidebar.styl';

const Sidebar = ({
  categories,
  changeCategory,
}: {
  categories: Category[],
  changeCategory: (selectedCategory: ?number) => void
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
  </ul>
);

export default Sidebar;
