import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { sendItemsToCloud } from '../services/cart';

class DetailedProductView extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      price: 0,
      availableQuantity: 0,
      condition: '',
      categoryId: '',
      id: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id, categoryId } } } = this.props;
    this.handleAPI(categoryId, id);
  }

  handleAPI = async (categoryId, id) => {
    const detail = await getProductsFromCategoryAndQuery(categoryId);
    const product = detail.results.find((item) => item.id === id);
    this.setState({
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      availableQuantity: product.available_quantity,
      condition: product.condition,
      categoryId,
      id,
    });
  }

  sendToCart = () => {
    const { categoryId, id } = this.state;

    sendItemsToCloud(id, categoryId);
  }

  render() {
    const { title, thumbnail, price, availableQuantity, condition } = this.state;
    return (
      <div>
        <div className="d-flex jc-end">
          <Link className="cart" data-testid="shopping-cart-button" to="/shoppingcart">
            Carrinho de compras
            <span role="img" aria-label="Carrinho de compras">&#128722;</span>
          </Link>
        </div>
        <h3 data-testid="product-detail-name">{ title }</h3>
        <img src={ thumbnail } alt={ title } />
        <h3>{ `R$ ${price}` }</h3>
        <h4>Especificações: </h4>
        <p>
          { `Quantidade disponível: ${availableQuantity}` }
          { `Condição do produto: ${condition}` }
        </p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.sendToCart }
        >
          Adicionar Ao Carrinho
        </button>
      </div>
    );
  }
}

DetailedProductView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      categoryId: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedProductView;
