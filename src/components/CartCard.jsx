import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  totalAmount = (action) => {
    const {
      quantityOfProduct,
      totalValue,
    } = this.state;

    const {
      price,
      finalPriceTotal,
    } = this.props;

    this.setState({
      totalValue: Number(price) * Number(quantityOfProduct),
    }, finalPriceTotal(totalValue, action));
  }

  decreaseCartQuantity = ({ target }) => {
    const { quantityOfProduct } = this.state;
    if (quantityOfProduct < 1) {
      this.setState({
        quantityOfProduct: 1,
      });
    }
    this.setState((prevState) => ({
      quantityOfProduct: prevState.quantityOfProduct - 1,
    }), () => {
      this.totalAmount(target.name);
    });
  }

  increaseCartQuantity = ({ target }) => {
    this.setState((prevState) => ({
      quantityOfProduct: prevState.quantityOfProduct + 1,
    }), () => {
      this.totalAmount(target.name);
    });
  }

  emptyCart = () => {
    const {
      id,
    } = this.props;
    removeProduct(id);
    window.location.reload();
  }

  render() {
    const {
      title,
      price,
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
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ this.decreaseCartQuantity }
            name="decreaseButton"
          >
            -
          </button>
          <span
            data-testid="shopping-cart-product-quantity"
          >
            { quantityOfProduct }
          </span>
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ this.increaseCartQuantity }
            name="increaseButton"
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

CartCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  finalPriceTotal: PropTypes.func.isRequired,
};

export default CartCard;
