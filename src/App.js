import React from 'react';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import EmployeeContainer from './containers/EmployeeContainer';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {

  return (
    <Router>
      <Header />
      
        <Switch>
          <Route exact path = "/" component = { HomeContainer } />
          <Router path = "/employee" component = { EmployeeContainer } />
        </Switch>

    </Router>
  );
}

export default App;
