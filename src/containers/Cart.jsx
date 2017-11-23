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
    error: state.cart.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromCart: () => dispatch(removeFromCart()),
  };
}

const Cart = (props) => (
  <ul>
      {props.items.map((cartItem,index) =>
        <li key={cartItem.id}>Name: {cartItem.product.name} Quantity: {cartItem.quantity}
        <button onClick={()=>{this.props.removeFromCart(index)}}>Remove from cart</button></li>)}
    </ul>
  );

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
