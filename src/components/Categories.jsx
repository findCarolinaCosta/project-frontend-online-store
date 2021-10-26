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
    const { categoryChange } = this.props;

    return (
      <div className="categories">
        <span>Categorias:</span>
        {
          categories.map((categorie) => (
            <div key={ categorie.id } className="categories-item">
              <label htmlFor={ categorie.id } data-testid="category">
                <input
                  type="radio"
                  name="categorie"
                  id={ categorie.id }
                  value={ categorie.id }
                  onChange={ categoryChange }
                />
                {categorie.name}
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
};
export default Categories;
