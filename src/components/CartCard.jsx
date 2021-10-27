import React, { Component } from 'react';

class CartCard extends Component {
  constructor() {
    super();
    this.state = {
      quantityOfProduct: 1,
    };
  }

  decreaseCartQuantity = () => {
    this.setState((prevState) => ({
      quantityOfProduct: prevState.quantityOfProduct - 1,
    }));
  }

  increaseCartQuantity = () => {
    this.setState((prevState) => ({
      quantityOfProduct: prevState.quantityOfProduct + 1,
    }));
  }

  emptyCart = () => {
    // pega lista do local storage, separa o que for diferente do ID do X; retorna lista sem o produto e renderiza carrinho de novo
    
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
        </div>
      </div>
    );
  }

}

export default CartCard;
