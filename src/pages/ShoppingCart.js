import React, { Component } from 'react';

import { getItemsFromCloud } from '../services/cart';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      productIds: [],
      showResults: false,
      productsDetails: [],
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
      });
    });
  }

  handleCartList = () => {
    const {
      productIds,
      productsDetails,
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
        <span data-testid="shopping-cart-product-quantity">
          {productsDetails.length}
        </span>
        {productsDetails.map((product) => {
          const {
            id,
            title,
            price,
          } = product;
          return (
            <div key={ id }>
              <span data-testid="shopping-cart-product-name">
                {title}
              </span>
              <span>
                {price}
              </span>
            </div>
          );
        })}
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
