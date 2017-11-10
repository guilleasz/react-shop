// @flow
import React from 'react';
import { type Category } from '../types';

const Sidebar = ({
  categories,
  changeCategory,
}: {
  categories: Category[],
  changeCategory: (selectedCategory: ?number) => void
}) => (
  <ul>
    <li>
      <button onClick={() => changeCategory(null)}>
        All
      </button>
    </li>
    {categories.map(category => (
      <li key={category.id}>
        <button onClick={() => changeCategory(category.id)}>
          {category.name}
        </button>
      </li>))}
  </ul>
);

export default Sidebar;
