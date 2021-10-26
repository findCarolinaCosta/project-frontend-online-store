import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

class DetailedProductView extends Component {
  constructor() {
    super();
    const { match: { params: { id } } } = this.props;
    this.state = {
      title: '',
      thumbnail: '',
      price: 0,
      id,
    };
  }

  componentDidMount() {
    this.handleAPI();
  }

  handleAPI = async () => {
    const { id } = this.state;
    const detail = await getProductsFromCategoryAndQuery(id, '');
    this.setState({
      title: detail.title,
      thumbnail: detail.thumbnail,
      price: detail.price,
      availableQuantity: detail.available_quantity,
      condition: detail.condition,
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
    }),
  }).isRequired,
};

export default DetailedProductView;
