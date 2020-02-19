import React from 'react';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import EmployeeContainer from './containers/EmployeeContainer';
import CompensationContainer from './containers/CompensationContainer';
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
          <Router path = "/compensation" component = { CompensationContainer } />
        </Switch>

    </Router>
  );
}

export default App;
