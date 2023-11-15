import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LogIn from './Components/LoginPage';
import NewConnection from './Components/NewConnection';
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/LogIn" component={LogIn} />
          <Route path="/NewConnection" component={NewConnection} />
          <Redirect to="/LogIn" />
        </Switch>
      </div>
    </Router>


  );
}

export default App;
