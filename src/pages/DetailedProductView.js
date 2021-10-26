import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class DetailedProductView extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      thumbnail: '',
      price: 0,
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
    });
  }

  render() {
    const { title, thumbnail, price, availableQuantity, condition } = this.state;
    return (
      <div>
        <h3 data-testid="product-detail-name">{ title }</h3>
        <img src={ thumbnail } alt={ title } />
        <h3>{ `R$ ${price}` }</h3>
        <h4>Especificações: </h4>
        <p>
          { `Quantidade disponível: ${availableQuantity}` }
          { `Condição do produto: ${condition}` }
        </p>
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
