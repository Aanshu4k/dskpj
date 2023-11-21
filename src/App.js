import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LogIn from './Components/LoginPage';
import NewConnection from './Components/NewConnection';
import ProductList from './Components/ProductList'
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/LogIn" component={LogIn} />
          <Route path="/NewConnection" component={NewConnection} />
          <Route path="/products" component={ProductList} />
          <Redirect to="/LogIn" />
        </Switch>
      </div>
    </Router>


  );
}

export default App;
