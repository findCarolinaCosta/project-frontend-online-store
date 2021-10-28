import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { getItemsFromCloud } from '../services/cart';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CartCard from '../components/CartCard';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      productIds: [],
      showResults: false,
      productsDetails: [],
      finalPrice: 0,
    };
  }

  componentDidMount() {
    this.handleCloudIds();
  }

  // valor total da compra
  finalPriceTotal = (value, action) => {
    if (action === 'decreaseButton') {
      this.setState((prevState) => ({
        finalPrice: prevState.finalPrice - value,
      }));
    } else {
      this.setState((prevState) => ({
        finalPrice: prevState.finalPrice + value,
      }));
    }
  }

  handleCloudIds = () => {
    this.setState({
      productIds: getItemsFromCloud(),
      showResults: true,
    }, this.handleItemsDetails);
  };

  sumTotalPrice = () => {
    const {
      productsDetails,
    } = this.state;

    const sum = productsDetails.reduce((acc, item) => acc + item.price, 0);

    this.setState({ finalPrice: sum });
  }

  handleItemsDetails = () => {
    const {
      productIds,
      productsDetails,
    } = this.state;

    productIds.forEach(async ({ productId, categoryId }) => {
      const allProducts = await getProductsFromCategoryAndQuery(categoryId);
      const product = allProducts.results.find(({ id }) => id === productId);
      productsDetails.push(product);

      this.setState({
        productsDetails,
      }, this.sumTotalPrice);
    });
  }

  handleCartList = () => {
    const {
      productIds,
      productsDetails,
      finalPrice,
    } = this.state;

    if (productIds.length === 0) {
      return (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      );
    }

    return (
      <>
        <div>
          <span>
            {productsDetails.length}
          </span>
          {productsDetails.map((product) => {
            const {
              id, title, price,
            } = product;
            return (
              <CartCard
                key={ id }
                id={ id }
                title={ title }
                price={ price }
                finalPriceTotal={ this.finalPriceTotal }
              />
            );
          })}
          {/* valor total da compra */}
          <p>Valor total da compra: </p>
          {finalPrice}
        </div>
        <Link to="/shoppingcard/checkoutpage/">
          <button data-testid="checkout-products" type="button">
            Finalizar compra
          </button>
        </Link>

      </>
    );
  }

  render() {
    const {
      showResults,
    } = this.state;

    return (
      <div>
        {(showResults) && this.handleCartList()}
      </div>
    );
  }
}

export default ShoppingCart;
