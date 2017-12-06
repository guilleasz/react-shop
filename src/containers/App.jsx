import React from 'react';
import axios from 'axios';
import { Route, Redirect, Switch } from 'react-router';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import ProductComponent from '../components/Product';
import s from './App.css';

export default class App extends React.Component {
  state = {
    products: [],
    categories: [],
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
            />
          </div>
          <div>
            <Switch>
              <Route
                path="/products"
                exact
                render={props => (
                  <Grid
                    products={this.state.products}
                    selectedCategory={Number(new URLSearchParams(props.location.search).get('category'))}
                    {...props}
                  />
                )}
              />
              <Route
                path="/products/:id"
                render={props => (
                  <ProductComponent
                    {...props}
                    product={this.state.products.find(product =>
                      String(product.id) === props.match.params.id)}
                  />
                )}
              />
              <Redirect exact from="/" to="/products" />
              <Route render={() => <div>Page Not Found</div>} />
            </Switch>
          </div>
        </div>
    );
  }
}
