import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import DetailedProductView from './pages/DetailedProductView';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/detailedproductview/:categoryId/:id"
            component={ DetailedProductView }
          />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
