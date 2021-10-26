import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
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
