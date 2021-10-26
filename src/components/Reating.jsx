import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    const { maxRating, setRating } = this.props;
    const ratingArray = [];

    for (let i = 0; i < maxRating; i += 1) {
      ratingArray.push(i + 1);
    }

    return (
      <div>
        {
          ratingArray.map((rating) => (
            <label key={ rating } htmlFor={ rating } className="rating-item">
              <input
                id={ rating }
                className="rating-radio"
                type="radio"
                name="rating"
                onClick={ (event) => {
                  setRating(event.target.value);
                } }
                value={ rating }
              />
              &nbsp;
              { rating }
            </label>
          ))
        }
      </div>
    );
  }
}

Rating.propTypes = {
  maxRating: PropTypes.number,
  setRating: PropTypes.func,
}.isRequired;

export default Rating;
