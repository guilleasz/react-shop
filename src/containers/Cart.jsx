// @flow
import React from 'react';
import { connect } from 'react-redux'
import { type ContextRouter } from 'react-router';
import axios, { type $AxiosXHR } from 'axios';
import { type CartItem } from '../types';
import { removeFromCart } from '../actions/index.js';

type Props = ContextRouter;

const mapStateToProps = state => {
  return {
    items: state.cart.items,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromCart: (index) => dispatch(removeFromCart(index)),
  };
}

const Cart = (props) => (
  <ul>
      {props.items.map((cartItem, index) =>
        <li key={cartItem.product.id}>Name: {cartItem.product.name} Quantity: {cartItem.quantity}
        <button onClick={()=>{props.removeFromCart(index)}}>Remove from cart</button></li>)}
    </ul>
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
