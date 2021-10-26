import PropTypes from 'prop-types';
import React from 'react';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setCategoriesInState(categories);
  }

  setCategoriesInState(categories) {
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { categoryChange, handleSearch } = this.props;

    return (
      <div className="categories">
        <span>Categorias:</span>
        {
          categories.map((category) => (
            <div key={ category.id } className="categories-item">
              <label htmlFor={ category.id } data-testid="category">
                <input
                  type="radio"
                  name="category"
                  id={ category.id }
                  value={ category.id }
                  onChange={ (event) => {
                    categoryChange(event);
                    handleSearch();
                  } }
                />
                {category.name}
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

Categories.propTypes = {
  categoryChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
export default Categories;
