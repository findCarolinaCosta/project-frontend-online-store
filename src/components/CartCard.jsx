import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeProduct } from '../services/cart';

class CartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalValue: 0,
      quantityOfProduct: props.quantityOfThis,
    };
  }

  componentDidMount() {
    this.totalAmount();
  }

  totalAmount = () => {
    const { quantityOfProduct } = this.state;
    const {
      price,
      id,
      changeTotalPrice,
    } = this.props;

    const total = price * Number(quantityOfProduct);

    this.setState({
      totalValue: total,
    }, () => { changeTotalPrice(id, total); });
  }

  decreaseCartQuantity = () => {
    const { quantityOfProduct } = this.state;

    if (quantityOfProduct < 1) {
      this.setState({ quantityOfProduct: 1 });
    }

    this.setState((prevState) => ({
      quantityOfProduct: prevState.quantityOfProduct - 1,
    }), this.totalAmount);
  }

  increaseCartQuantity = () => {
    const { maxQuantity } = this.props;
    const { quantityOfProduct } = this.state;
    if (quantityOfProduct + 1 <= maxQuantity) {
      this.setState((prevState) => ({
        quantityOfProduct: prevState.quantityOfProduct + 1,
      }), this.totalAmount);
    }
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
  quantityOfThis: PropTypes.number.isRequired,
  maxQuantity: PropTypes.number.isRequired,
  changeTotalPrice: PropTypes.func.isRequired,
};

export default CartCard;
