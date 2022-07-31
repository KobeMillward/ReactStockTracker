//Kobe Millward (n10269746)
import React from 'react';
import {Collapse, Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle,
         DropdownMenu, DropdownItem, Container, Jumbotron} from 'reactstrap';
import Stocks from './stocks.js';
import Quote from './quote.js';
import LogIn from './login.js';
import Register from './register.js';
import PriceHistory from './pricehistory.js';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div> 
      <Router>
      <div>
          <Navbar color="primary" light expand="md">
              <Link to="/" className="navbar-brand">StockViewer</Link>
              <Collapse navbar>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <Link to="/stocks" className="nav-link">Stocks</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/quote" className="nav-link">Quote</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/pricehistory" className="nav-link">Price History (restricted)</Link>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Account
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link to="/login" className="nav-link">Log In</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/register" className="nav-link">Register</Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
          </Navbar>
        </div>
        <Switch>
          <Route path="/stocks">
            <Stocks />
          </Route>
          <Route path="/quote">
            <Quote />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/priceHistory">
            <PriceHistory />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Home() {

  return (
    <div>
      <Jumbotron fluid className="homeJT">
        <Container fluid>
          <h1 className="display-3">StockViewer</h1>
          <h4 className="lead">Welcome to StockViewer, a WebApp allowing you to view price history on stocks from many different companies and industries. 
          <br/>Click on "Stocks" to get started! </h4>
        </Container>
      </Jumbotron>
      </div>
    )
}

export default App;