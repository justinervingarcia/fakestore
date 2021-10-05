import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import ProductDetails from './components/productDetails';
import Cart from './components/cart';

function App() {
  return (
    <Router>
      <Header />
      <hr />
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </React.StrictMode>
      <hr />
      <Footer />
    </Router>
  );
}

export default App;
