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
      categorySelected: '',
    };
  }

  categoryChange = ({ target }) => {
    this.setState({ categorySelected: target.value });
  }

  onInputChange = ({ target }) => {
    this.setState({ inputSearch: target.value });
  }

  handleSearch = async () => {
    const { inputSearch } = this.state;
    const products = await getProductsFromCategoryAndQuery(false, inputSearch);

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
        <Categories categoryChange={ this.categoryChange } />

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
