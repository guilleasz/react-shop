// @flow
import React from 'react';
import axios, { type $AxiosXHR } from 'axios';
import Grid from '../components/Grid';
import { type Product } from '../types';

type Props = {};

type State = {
  products: Product[]
}



export default class App extends React.Component<Props, State> {
  state = {
    products: [],
  }

  componentDidMount() {
    axios.get('/products')
      .then((res: $AxiosXHR<Product[]>)  => res.data)
      .then((products: Product[]) => this.setState({ products }))

  }

  render() {
    return (
      <div>
        <Grid products={this.state.products} />
      </div>
    )
  }
}
