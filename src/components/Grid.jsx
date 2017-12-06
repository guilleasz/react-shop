import React from 'react';
import Item from './Item';
import s from './Grid.css';

const Grid = ({
  products,
  selectedCategory,
}) => (
  <div className={s.grid}>
    {products
        .filter(product => !selectedCategory || product.categoryId === selectedCategory)
        .map(product => <Item key={product.id} product={product} />)}
  </div>
);

export default Grid;
