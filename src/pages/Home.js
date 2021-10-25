import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
      inputSearch: '',
      showResults: false,
    };
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

    if (results.lenght === 0) {
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
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/shoppingcart">
          Carrinho de Compras
        </Link>
        <form>
          <input
            type="text"
            data-testid="query-input"
            value={ inputSearch }
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleSearch }
          >
            pesquisar
          </button>
        </form>

        {showResults && this.handleProducts()}
      </div>
    );
  }
}

export default Home;
