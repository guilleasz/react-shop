// @flow
import React from 'react';
import axios, { type $AxiosXHR } from 'axios';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import { type Product, type Category } from '../types';
import s from './App.css';

type Props = {};

type State = {
  products: Product[],
  categories: Category[],
  selectedCategory: ?number,
  loading: boolean,
};

export default class App extends React.Component<Props, State> {
  state = {
    products: [],
    categories: [],
    selectedCategory: null,
    loading: true,
  }

  componentDidMount() {
    Promise.all([this.fetchProducts(), this.fetchCategories()])
      .then(() => this.setState({ loading: false }));
  }

  fetchProducts() {
    return axios.get('http://develop.plataforma5.la:3000/api/products')
      .then((res: $AxiosXHR<Product[]>) => res.data)
      .then((products: Product[]) => this.setState({ products }));
  }

  fetchCategories() {
    return axios.get('http://develop.plataforma5.la:3000/api/categories')
      .then((res: $AxiosXHR<Category[]>) => res.data)
      .then((categories: Category[]) => this.setState({ categories }));
  }

  changeCategory = (selectedCategory: ?number) => {
    this.setState({
      selectedCategory,
    });
  }

  addProduct = (product: Product) => {
    this.setState({
      products: [product, ...this.state.products],
    });
  }

  render() {
    return (
      this.state.loading ?
        <div>Loading...</div>
        :
        <div className={s.layout}>
          <div>
            <Sidebar
              addProduct={this.addProduct}
              categories={this.state.categories}
              changeCategory={this.changeCategory}
            />
          </div>
          <div>
            <Grid products={this.state.products} selectedCategory={this.state.selectedCategory} />
          </div>
        </div>
    );
  }
}
