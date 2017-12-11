// @flow

import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import Product from '../components/Product';
import Cart from '../components/Cart';
import s from './App.css';
import { fetchProducts, addProduct } from '../redux/actions/products';
import { fetchCategories } from '../redux/actions/categories';
import { addToCart, removeFromCart } from '../redux/actions/cart';
import { type Product as $Product, type Category, type CartItem, type ReduxState, type DispatchThunk } from '../types';

type State = {}

type Props = {
  products: $Product[],
  categories: Category[],
  cart: CartItem[],
  loading: boolean,
  fetchProducts: () => void,
  fetchCategories: () => void,
  addToCart: (product: $Product) => void,
  removeFromCart: (index: number) => void,
  addProduct: (product: $Product) => void,
}

class App extends React.Component<Props, State> {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  addProduct = (product: $Product) => {
    this.props.addProduct(product);
  }

  addToCart = (product: $Product) => {
    this.props.addToCart(product);
  }

  removeFromCart = (index: number) => {
    this.props.removeFromCart(index);
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
                render={props => (
                  <Grid
                    products={this.props.products}
                    selectedCategory={Number(new URLSearchParams(props.location.search).get('category'))}
                    {...props}
                  />
                )}
              />
              <Route
                path="/products/:id"
                render={props => (
                  <Product
                    {...props}
                    product={this.props.products.find(product =>
                      String(product.id) === props.match.params.id)}
                    addToCart={this.addToCart}
                  />
                )}
              />
              <Route
                path="/cart"
                render={props => (
                  <Cart
                    {...props}
                    cart={this.props.cart}
                    removeFromCart={this.removeFromCart}
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

const mapStateToProps = (state: ReduxState) => ({
  products: state.products.items,
  categories: state.categories.items,
  cart: state.cart,
  loading: state.products.loading || state.categories.loading,
});

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCategories: () => dispatch(fetchCategories()),
  addToCart: (product: $Product) => dispatch(addToCart(product)),
  removeFromCart: (index: number) => dispatch(removeFromCart(index)),
  addProduct: (product: $Product) => dispatch(addProduct(product)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
