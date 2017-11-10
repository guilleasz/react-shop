// @flow
import React from 'react';
import axios, { type $AxiosXHR } from 'axios';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import { type Product, type Category } from '../types';

type Props = {};

type State = {
  products: Product[],
  categories: Category[],
  selectedCategory: ?number
};

export default class App extends React.Component<Props, State> {
  state = {
    products: [],
    categories: [],
    selectedCategory: null,
  }

  componentDidMount() {
    axios.get('/products')
      .then((res: $AxiosXHR<Product[]>) => res.data)
      .then((products: Product[]) => this.setState({ products }));
  }

  changeCategory = (selectedCategory: ?number) => {
    this.setState({
      selectedCategory,
    });
  }

  render() {
    return (
      <div>
        <Grid products={this.state.products} selectedCategory={this.state.selectedCategory} />
        <Sidebar categories={this.state.categories} changeCategory={this.changeCategory} />
      </div>
    );
  }
}
