import React, { Component } from 'react';

import { getItemsFromCloud } from '../services/cart';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CartCard from '../components/CartCard';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      productIds: [],
      productsDetails: [],
      productsToSum: [],
      showResults: false,
      finalPrice: 0,
    };
  }

  componentDidMount() {
    this.handleCloudIds();
  }

  handleCloudIds = () => {
    this.setState({
      productIds: getItemsFromCloud(),
      showResults: true,
    }, this.handleItemsDetails);
  };

  // valor total da compra
  finalPriceTotal = (value = 0, id = '', inMount) => {
    if (!inMount) {
      const { productsToSum } = this.state;
      const attList = productsToSum.filter((product) => product.id !== id);
      attList.push({ id, value });
      const sumPrices = attList.reduce((acc, product) => acc + product.value, 0);

      this.setState({
        finalPrice: sumPrices,
        productsToSum: attList,
      });
    }
  }

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
      productsToSum,
    } = this.state;

    productIds.forEach(async ({ productId, categoryId }) => {
      const allProducts = await getProductsFromCategoryAndQuery(categoryId);
      const product = allProducts.results.find(({ id }) => id === productId);
      const details = {
        id: product.id,
        value: product.price,
      };

      productsDetails.push(product);
      productsToSum.push(details);

      this.setState({
        productsDetails,
        productsToSum,
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
      <div>
        <span>
          {productsDetails.length}
        </span>
        {productsDetails.map((product) => {
          const {
            id,
            title,
            price,
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
        { finalPrice }
      </div>
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
