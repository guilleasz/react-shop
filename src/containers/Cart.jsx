// @flow
import React from 'react';
import { type ContextRouter } from 'react-router';
import axios, { type $AxiosXHR } from 'axios';
import { type CartItem } from '../types';

type Props = ContextRouter;

type State = {
  cartItems: CartItem[],
};

export default class Cart extends React.Component<Props, State> {
  state = {
    cartItems: [],
  }

  componentDidMount() {
    axios.get('/api/cart')
      .then((res: $AxiosXHR<CartItem[]>) => res.data)
      .then(cartItems => this.setState({ cartItems }));
  }

  render() {
    return (
      <ul>
        {this.state.cartItems.map(cartItem =>
          <li>Name: {cartItem.product.name} Quantity: {cartItem.quantity}</li>)}
      </ul>
    );
  }
}
