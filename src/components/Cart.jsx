import React from 'react';

const Cart = ({
  cart,
  removeFromCart,
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