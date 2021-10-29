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
  sumTotalPrice = () => {
    const { productsToSum } = this.state;

    const sum = productsToSum.reduce((acc, item) => acc + item.value, 0);

    this.setState({ finalPrice: sum });
  }

  changeTotalPrice = (id, value) => {
    const { productsToSum } = this.state;

    const attList = productsToSum.filter((product) => product.id !== id);
    attList.push({ id, value });

    this.setState({
      productsToSum: attList,
    }, this.sumTotalPrice);
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

      productsToSum.push(details);
      productsDetails.push(product);
      product.quantityOfThis = 1;

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
      <>
        <div>
          <span>
            {productsDetails.length}
          </span>
          {productsDetails.map((product) => {
            const {
              id,
              title,
              price,
              quantityOfThis,
            } = product;

            return (
              <CartCard
                key={ id }
                id={ id }
                title={ title }
                price={ price }
                quantityOfThis={ quantityOfThis }
                maxQuantity={ product.available_quantity }
                changeTotalPrice={ this.changeTotalPrice }
              />
            );
          })}
          {/* valor total da compra */}
          <p>Valor total da compra: </p>
          { finalPrice }
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
