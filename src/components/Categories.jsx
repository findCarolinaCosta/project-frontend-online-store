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

    return (
      <div className="categories">
        <span>Categorias:</span>
        {
          categories.map((categorie) => (
            <div key={ categorie.id } className="categories-item">
              <label htmlFor={ categorie.id } data-testid="category">
                <input type="radio" id={ categorie.id } />
                {categorie.name}
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}
export default Categories;
