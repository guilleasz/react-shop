import React from 'react';
import axios  from 'axios';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import s from './App.css';

export default class App extends React.Component {
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
      .then(res => res.data)
      .then(products => this.setState({ products }));
  }

  fetchCategories() {
    return axios.get('http://develop.plataforma5.la:3000/api/categories')
      .then(res => res.data)
      .then(categories => this.setState({ categories }));
  }

  changeCategory = (selectedCategory) => {
    this.setState({
      selectedCategory,
    });
  }

  addProduct = (product) => {
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
