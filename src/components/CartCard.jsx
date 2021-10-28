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
      totalValue: parseFloat(price) * parseFloat(quantityOfProduct),
    }, () => {
      finalPriceTotal(totalValue, action);
    });
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
    // const { finalPriceTotal } = this.props;
    this.setState((prevState) => ({
      quantityOfProduct: prevState.quantityOfProduct + 1,
    }), () => {
      this.totalAmount(target.name);
    });
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
      // id,
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
            name="decreaseButton"
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
  quantityOfEachProduct: PropTypes.number.isRequired,
  finalPriceTotal: PropTypes.func.isRequired,
  handleCloudIds: PropTypes.func.isRequired,
};

export default CartCard;
