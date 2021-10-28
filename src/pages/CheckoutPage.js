import React, { Component } from 'react';
import { getItemsFromCloud } from '../services/cart';
import { getProductsFromCategoryAndQuery } from '../services/api';

class CheckoutPage extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      price: 0,
      id: '',
    };
  }

  componentDidMount() {
    this.getId();
  }

  getId = async () => {
    const storageIds = await getItemsFromCloud();
    storageIds.filter(async (item) => {
      const detail = await getProductsFromCategoryAndQuery(item.categoryId);
      const product = detail.results.find((elem) => elem.id === item.productId);
      this.setState({
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        id: item.productId,
      });
    });
  }

  render() {
    const {
      title,
      thumbnail,
      price,
      id,
    } = this.state;
    return (
      <form>
        <fieldset>
          <section>
            <h4>Revise seus Produtos</h4>
            <img
              src={ thumbnail }
              alt={ id }
            />
            <span>
              {title}
            </span>
            <span>
              {`R$ ${price}`}
            </span>
          </section>
        </fieldset>
        <fieldset>
          <label htmlFor="fullname">
            Name:
            <input
              id="fullname"
              type="text"
              data-testid="checkout-fullname"
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              data-testid="checkout-email"
            />
          </label>

          <label htmlFor="cpf">
            CPF:
            <input
              id="cpf"
              type="text"
              data-testid="checkout-cpf"
            />
          </label>

          <label htmlFor="phone">
            Phone number:
            <input
              id="phone"
              type="text"
              data-testid="checkout-phone"
            />
          </label>

          <label htmlFor="cep">
            CEP:
            <input
              id="cep"
              type="text"
              data-testid="checkout-cep"
            />
          </label>

          <label htmlFor="address">
            Address:
            <input
              id="address"
              type="text"
              data-testid="checkout-address"
            />
          </label>

          <button type="submit">
            Finalizar
          </button>
        </fieldset>
      </form>
    );
  }
}

export default CheckoutPage;
