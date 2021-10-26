import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { sendItemsToCloud } from '../services/cart';

class ProductCard extends React.Component {
  sendToCart = () => {
    const {
      productId,
      categoryId,
    } = this.props;
    sendItemsToCloud(productId, categoryId);
  }

  render() {
    const {
      thumbnail,
      productId,
      categoryId,
      title,
      price,
    } = this.props;

    return (
      <Link
        to={ `/detailedproductview/${categoryId}/${productId}` }
        data-testid="product-detail-link"
      >
        <img
          src={ thumbnail }
          alt={ productId }
        />
        <span>
          {title}
        </span>
        <span>
          {`R$ ${price}`}
        </span>
        <button
          type="button"
          onClick={ this.sendToCart }
          data-testid="product-add-to-cart"
        >
          Eu quero!
        </button>
      </Link>
    );
  }
}

ProductCard.propTypes = ({
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
});

export default ProductCard;
