import React from 'react';
import PropTypes from 'prop-types';

import { sendItemsToCloud } from '../services/cart';

class ProductCard extends React.Component {
  sendToCart = () => {
    const { productId } = this.props;
    sendItemsToCloud(productId);
  }

  render() {
    const {
      thumbnail,
      productId,
      title,
      price,
    } = this.props;

    return (
      <>
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
          data-testid="product-detail-add-to-cart"
        >
          Eu quero!
        </button>
      </>
    );
  }
}

ProductCard.propTypes = ({
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
});

export default ProductCard;
