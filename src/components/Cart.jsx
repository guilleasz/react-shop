// @flow
import React from 'react';
import { type CartItem } from '../types';

const Cart = ({
  cart,
  removeFromCart,
}:
{
  cart: CartItem[],
  removeFromCart: (index: number) => void,
}) => (
  <div>
    <ul>
      {cart.map((item, i) => (
        <li key={item.product.id}>{item.product.name}. Quantity: {item.quantity} <button onClick={() => removeFromCart(i)}>X</button></li>
      ))}
    </ul>
  </div>
);


export default Cart;