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
          <Route path="/shoppingcart" component={ ShoppingCart } />
          <Route path="/" component={ Home } />
          <Route path="/DetailedProductView:id" component={ DetailedProductView } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
