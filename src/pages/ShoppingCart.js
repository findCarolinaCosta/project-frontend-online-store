import React, { Component } from 'react';

import { getItemsFromCloud } from '../services/cart';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      productIds: [],
      showResults: false,
    };
  }

  componentDidMount() {
    this.handleCloudIds();
  }

  handleItemDetails = () => {
    const { productIds } = this.state;
    productIds.forEach(async ({ productId, categoryId }) => {
      const details = await getProductsFromCategoryAndQuery(categoryId, productId);
      return details;
    });
  }

  handleCloudIds = () => {
    this.setState({
      productIds: getItemsFromCloud(),
      showResults: true,
    });
  };

  handleCartList = () => {
    const { productIds } = this.state;

    if (productIds.lenth === 0) {
      return (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      );
    }

    return (
      productIds.map(async ({ productId, categoryId }) => {
        const categories = await getProductsFromCategoryAndQuery(categoryId);
        const { results } = categories;
        const product = results.find(({ id }) => id === productId);

        return (
          <div key={ productId }>
            <span>{product.name}</span>
          </div>
        );
      }));
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
