import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import ProductDetails from './components/productDetails';

function App() {
  return (
    <Router>
      <Header />
      <hr />
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product/:id" component={ProductDetails} />
          {/* <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={App} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/apply" component={ApplyLeave} /> */}
        </Switch>
      </React.StrictMode>
      <hr />
      <Footer />
    </Router>
  );
}

export default App;
