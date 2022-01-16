import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import DetailedProductView from './pages/DetailedProductView';
import CheckoutPage from './pages/CheckoutPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={ process.env.PUBLIC_URL }>
        <Switch>
          <Route
            exact
            path="/detailedproductview/:categoryId/:id"
            component={ DetailedProductView }
          />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route exact path="/" component={ Home } />
          <Route exact path="/shoppingcard/checkoutpage/" component={ CheckoutPage } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
