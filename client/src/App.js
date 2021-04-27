import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './css/styles.css';
import NavbarTop from './components/NavbarTop';
import Banner from "./components/Banner"
import ItemDetails from './components/ItemDetails';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <NavbarTop />
      <Switch>
        <Route exact path="/"><Banner /></Route>
        <Route path="/item/:postid" render={props => (
        <ItemDetails  {...props}/>
        )} />
        <Route exact path="/cart/"><Cart /></Route>
      </Switch>
    </Router>
  );
}

export default App;
