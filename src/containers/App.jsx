// @flow
import React from 'react';
import { connect } from 'react-redux'
import axios, { type $AxiosXHR } from 'axios';
import { Route, Redirect, Switch, type ContextRouter } from 'react-router';
import Grid from '../components/Grid';
import Sidebar from '../components/Sidebar';
import ProductComponent from '../components/Product';
import Cart from './Cart';
import { type Product, type Category } from '../types';
import s from './App.css';
import { getAllProducts } from '../actions/index.js';

type Props = {};

type State = {
  products: Product[],
  categories: Category[],
  loading: boolean,
};

const mapStateToProps = state => {
  return {
    products: state.products.items,
    loading: state.products.isLoading,
    categories: state.products.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getAllProducts()),
  };
}

class App extends React.Component<Props, State> {

  componentDidMount() {
    this.props.getProducts();
    // Promise.all([this.fetchCategories()])
    //   .then(() => this.setState({ loading: false }));
  }

  addProduct = (product: Product) => {
    this.setState({
      products: [product, ...this.state.products],
    });
  }

  addProductToCart = (productId: ?string) => {
    axios.post('/api/cart/', { productId });
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
                render={(props: ContextRouter) => (
                  <ProductComponent
                    {...props}
                    product={this.props.products.find(product =>
                      String(product.id) === props.match.params.id)}
                    addProductToCart={() => this.addProductToCart(props.match.params.id)}
                  />
                )}
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


export default connect(mapStateToProps, mapDispatchToProps)(App);
