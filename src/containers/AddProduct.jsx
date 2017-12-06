// @flow
import React from 'react';
import axios from 'axios';


export default class AddProduct extends React.Component {
  state = {
    name: '',
    description: '',
    price: '',
    image: '',
    availability: true,
    categoryId: this.props.categories[0] && this.props.categories[0].id,
    priceError: false,
  }

  handleChange = () => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit = () => {
    e.preventDefault();
    const { price } = this.state;
    const [num, cents] = price.split('.');
    if (Number.isNaN(Number(num)) || Number.isNaN(Number(cents)) || cents.length !== 2) {
      return this.setState({
        priceError: true,
      });
    }
    return axios.post('/products', this.state)
      .then(res => res.data)
      .then(this.props.addProduct)
      .then(() => {
        this.setState({
          priceError: false,
          name: '',
          description: '',
          price: '',
          image: '',
          availability: true,
          categoryId: this.props.categories[0] && this.props.categories[0].id,
        });
      });
  }
  render() {
    const {
      name,
      description,
      price,
      categoryId,
      image,
      availability,
      priceError,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input required id="name" name="name" value={name} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea id="description" name="description" value={description} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input required id="price" name="price" value={price} onChange={this.handleChange} />
          {priceError ? <div style={{ color: 'red' }}> Price should have 00.00 format</div> : null}
        </div>
        <div>
          <label htmlFor="categoryId">Category: </label>
          <select required id="categoryId" value={categoryId} name="categoryId" onChange={this.handleChange}>
            {this.props.categories.map(category =>
              <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="image">Image: </label>
          <input id="image" name="image" value={image} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="availability">Availability: </label>
          <select id="availability" value={availability} name="availability" onChange={this.handleChange}>
            <option value>Available</option>
            <option value={false}>Out of Stock</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    );
  }
}
