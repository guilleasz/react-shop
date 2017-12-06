import * as React from 'react';
import Item from './Item';
import s from './Grid.css';

const Grid = ({
  products,
  selectedCategory,
  ...props
}) => (
  <div className={s.grid}>
    {products
        .filter(product => !selectedCategory || product.categoryId === selectedCategory)
        .map(product => <Item {...props} key={product.id} product={product} />)}
  </div>
);

export default Grid;
