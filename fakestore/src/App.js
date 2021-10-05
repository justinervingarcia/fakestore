import React, {useEffect, useState} from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';

import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import ProductDetails from './components/productDetails';
import Cart from './components/cart';

function App() {

  // Initialize cart state
  const [cart, updateCart] = useState({
      itemCount: 0,
      items: [],
      totalPrice: 0,
  });

  // Extracts data from local storage and updates cart state
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart-justingarcia'));

    // Check if there is existing data in local storage
    if(cart != null){
      let itemCount = 0;
      let price = 0;

      // Compute for total quantity and price
      for(const item of cart){
          itemCount += item.qty;
          price += (item.product.price * item.qty);
      }
      
      // Update cart state
      updateCart({
          itemCount: itemCount,
          items: cart,
          totalPrice: price,
      });
    }
  }, [])

  return (
    <Router>
      <Header cart={cart}/>
      <hr />
      <React.StrictMode>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/product/:id" component={ProductDetails} /> */}
          <Route path="/product/:productID">
            <ProductDetails myCart={cart} updateCart={updateCart} />
          </Route>
          <Route path="/cart" component={Cart}>
            <Cart myCart={cart} updateCart={updateCart} />
          </Route>
        </Switch>
      </React.StrictMode>
      <hr />
      <Footer />
    </Router>
  );
}

export default App;
