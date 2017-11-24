// @flow
import React from 'react';
import { connect } from 'react-redux';
import axios, { type $AxiosXHR } from 'axios';
import { Route, Redirect, Switch, withRouter, type ContextRouter } from 'react-router';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import ProductComponent from '../components/Product';
import Cart from './Cart';
import { type Product, type Category } from '../types';
import s from './App.css';
import { getAllProducts, getAllCategories, receiveCategories, receiveProducts, addToCart } from '../actions/index.js';

const url = 'http://develop.plataforma5.la:3000/api/';

type Props = {};

type State = {
  products: Product[],
  categories: Category[],
  loading: boolean,
};

const mapStateToProps = (state) => {
  return {
    products: state.products.items,
    loading: state.products.isLoading,
    categories: state.products.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getAllProducts()),
    getCategories: () => dispatch(getAllCategories()),
    receiveProducts: products => dispatch(receiveProducts(products)),
    receiveCategories: categories => dispatch(receiveCategories(categories)),
    addToCart: product => dispatch(addToCart(product)),
  };
}

class App extends React.Component<Props, State> {

  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
    Promise.all([axios.get(`${url}/products`), axios.get(`${url}/categories`)])
      .then(([products, categories]) => {
        this.props.receiveProducts(products.data);
        this.props.receiveCategories(categories.data);
      });
  }

  render() {
    return (
      this.props.loading ?
        <div>Loading...</div>
        :
        <div className={s.layout}>
          <div>
            <Sidebar
              addProduct={this.addProduct}
              categories={this.props.categories}
            />
          </div>
          <div>
            <Switch>
              <Route
                path="/products"
                exact
                render={(props: ContextRouter) => (
                  <Grid
                    products={this.props.products}
                    selectedCategory={Number(new URLSearchParams(props.location.search).get('category'))}
                    {...props}
                  />
                )}
              />
              <Route
                path="/products/:id"
                render={(props: ContextRouter) => {
                  const product = this.props.products.find(product =>
                    String(product.id) === props.match.params.id);
                  return (
                    <ProductComponent
                      {...props}
                      product={product}
                      addProductToCart={() => this.props.addToCart(product)}
                    />
                );
              }}
              />
              <Route
                path="/cart"
                component={Cart}
              />
              <Redirect exact from="/" to="/products" />
              <Route render={() => <div>Page Not Found</div>} />
            </Switch>
          </div>
        </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
