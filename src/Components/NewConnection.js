import React from 'react';
import Logo from './Logo';
import Header from './Header';
import './App.css';
import Address from './Address';
import Row1 from './Row1';
import Row2 from './Row2';
import User_Details from './User_Details';
import ConnectionDetails from './ConnectionDetails';
import MyRequest from './MyRequest';
import { BrowserRouter as Router, Route, Routes, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import Product from './Product';
import ProductTable from './ProductList';
import MyForm from './Test';
const NewConnection=()=> {
  return (
    <div className="App" style={{ margin: '20px 10px', alignContent: 'center' }}>
      <div style={{ display: 'flex', padding: '10px', alignItems: 'center' }}>
        <Logo />
        <div>
          <Header />
        </div>
      </div>
      <div className='row' style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'left' }}>
        <Row1 />
      </div>
      <div className="first-section" ><br />
        <Router>
          <div className="list">
            <ul>
              <li>
                <Link to="/User_Details">Apply For New Connection</Link>
              </li>
              <li>
                <Link to="/MyRequest">My Requests</Link>
              </li>
            </ul>
          </div>
          <br />
          <Switch>
            <Route path="/User_Details" component={User_Details} />
            <Route path="/MyRequest" component={MyRequest} />
          </Switch>
        </Router>
      </div>
      {/* <div>
        <Address />
      </div>
      <br />
      <div>
        <ConnectionDetails />
      </div>
      <br /> */}
      {/* <div>
        <Sample_Login />
        <Sample_Login_Table />
      </div><br />
      <div>
        <ProductList /> 
      </div><br /> */}
    </div>


  );
}

export default NewConnection;
