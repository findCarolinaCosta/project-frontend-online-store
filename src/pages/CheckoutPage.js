import React, { Component } from 'react';

class CheckoutPage extends Component {
  render() {
    return (
      <form>
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
      </form>
    );
  }
}

export default CheckoutPage;
