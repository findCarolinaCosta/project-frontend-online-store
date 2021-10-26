import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
      inputSearch: '',
      showResults: false,
      category: '',
    };
  }

  categoryChange = ({ target }) => {
    this.setState({ category: target.value });
  }

  onInputChange = ({ target }) => {
    this.setState({ inputSearch: target.value });
  }

  handleSearch = async () => {
    const { inputSearch, category } = this.state;
    const products = await
    getProductsFromCategoryAndQuery(category, inputSearch);

    this.setState({
      productsList: products,
      showResults: true,
    });
  }

  handleProducts = () => {
    const { productsList } = this.state;
    const { results } = productsList;

    if (results.length === 0) {
      return <span>Nenhum produto foi encontrado</span>;
    }

    return results.map((product) => (
      <div
        key={ product.id }
        data-testid="product"
      >
        <Link
          to={ `/detailedproductview/${product.category_id}/${product.id}` }
          data-testid="product-detail-link"
        >
          <img
            src={ product.thumbnail }
            alt={ product.id }
          />
          <span>
            {product.title}
          </span>
          <span>
            {`R$ ${product.price}`}
          </span>
        </Link>
      </div>
    ));
  }

  render() {
    const {
      inputSearch,
      showResults,
    } = this.state;

    return (
      <div className="home-layout">
        <Categories
          categoryChange={ this.categoryChange }
          handleSearch={ this.handleSearch }
        />

        <div>
          <div className="d-flex jc-end">
            <Link className="cart" data-testid="shopping-cart-button" to="/shoppingcart">
              Carrinho de compras
              <span role="img" aria-label="Carrinho de compras">&#128722;</span>
            </Link>
          </div>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <form className="d-flex">
            <input
              className="form-control"
              type="text"
              data-testid="query-input"
              value={ inputSearch }
              onChange={ this.onInputChange }
            />
            <button
              className="search-button"
              type="submit"
              data-testid="query-button"
              onClick={ (event) => {
                event.preventDefault();
                this.handleSearch();
              } }
            >
              <span role="img" aria-label="Pesquisar">&#128270;</span>
            </button>
          </form>

          {showResults && this.handleProducts()}
        </div>
      </div>
    );
  }
}

export default Home;
