import React, { Component } from 'react';
import { removeProduct } from '../services/cart';

class CartCard extends Component {
  constructor() {
    super();
    this.state = {
      totalValue: 0,
      quantityOfProduct: 1,
    };
  }

  componentDidMount() {
    this.totalAmount();
  }

  totalAmount = () => {
    const {
      quantityOfProduct,
    } = this.state;

    const {
      price,
    } = this.props;

    this.setState({
      totalValue: parseFloat(price) * parseFloat(quantityOfProduct),
    });
  }

  decreaseCartQuantity = () => {
    const { quantityOfProduct } = this.state;
    if (quantityOfProduct < 1) {
      this.setState({
        quantityOfProduct: 1,
      });
    }
    this.setState((prevState) => ({
      quantityOfProduct: prevState.quantityOfProduct - 1,
    }), () => { this.totalAmount(); });
  }

  increaseCartQuantity = () => {
    this.setState((prevState) => ({
      quantityOfProduct: prevState.quantityOfProduct + 1,
    }), () => { this.totalAmount(); });
  }

  emptyCart = () => {
    const {
      id,
      handleCloudIds,
    } = this.props;
    removeProduct(id);
    handleCloudIds();
    window.location.reload();
  }

  render() {
    const {
      id,
      title,
      price,
      quantityOfEachProduct,
    } = this.props;

    const {
      quantityOfProduct,
      totalValue,
    } = this.state;

    return (
      <div>
        <div>
          <span data-testid="shopping-cart-product-name">
            {title}
          </span>
          <span>
            {price}
          </span>
        </div>
        <div>
          <span data-testid="shopping-cart-product-quantity">
            { quantityOfEachProduct }
          </span>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ this.decreaseCartQuantity }
          >
            -
          </button>
          <span>
            { quantityOfProduct }
          </span>
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ this.increaseCartQuantity }
          >
            +
          </button>
          <button
            type="button"
            onClick={ this.emptyCart }
          >
            X
          </button>
          <div>
            {/* mostra valor total por produto */}
            { totalValue }
          </div>
        </div>
      </div>
    );
  }

}

export default CartCard;
