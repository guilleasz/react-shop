import React from 'react';
import axios from 'axios';
import { Route, Redirect, Switch } from 'react-router';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import Product from '../components/Product';
import Cart from '../components/Cart';
import s from './App.css';
import store from '../redux/store';
import { setProducts, addProduct } from '../redux/actions/products';
import { setCategories } from '../redux/actions/categories';
import { addToCart, removeFromCart } from '../redux/actions/cart';

export default class App extends React.Component {
  state = {
    products: store.getState().products.items,
    categories: store.getState().categories.items,
    cart: store.getState().cart,
    loading: true,
  }

  componentWillMount() {
    this.subscription = store.subscribe(() => {
      const { products, categories, cart } = store.getState();
      this.setState({
        products: products.items,
        categories: categories.items,
        cart,
      });
    });
  }

  componentDidMount() {
    Promise.all([this.fetchProducts(), this.fetchCategories()])
      .then(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    store.unsubcribe(this.subscription);
  }
  fetchProducts() {
    return axios.get('http://develop.plataforma5.la:3000/api/products')
      .then(res => res.data)
      .then(products => store.dispatch(setProducts(products)));
  }

  fetchCategories() {
    return axios.get('http://develop.plataforma5.la:3000/api/categories')
      .then(res => res.data)
      .then(categories => store.dispatch(setCategories(categories)));
  }

  addProduct = (product) => {
    store.dispatch(addProduct(product))
  }

  addToCart = (product) => {
    store.dispatch(addToCart(product));
  }

  removeFromCart = (index) => {
    store.dispatch(removeFromCart(index));
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
                  <Product
                    {...props}
                    product={this.state.products.find(product =>
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
                    cart={this.state.cart}
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
