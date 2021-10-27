import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    const { maxRating, defaultValue, setRating } = this.props;
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
                onChange={ (event) => {
                  setRating(parseInt(event.target.value, 10));
                } }
                checked={ defaultValue === rating }
                value={ rating }
              />
              &nbsp;
              {rating}
            </label>
          ))
        }
      </div>
    );
  }
}

Rating.propTypes = {
  maxRating: PropTypes.number.isRequired,
  defaultValue: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
};

export default Rating;
