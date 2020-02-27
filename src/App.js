import React from 'react';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import EmployeeContainer from './containers/EmployeeContainer';
import CompensationContainer from './containers/CompensationContainer';
import CompensationHistoryContainer from './containers/CompensationHistoryContainer';
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
            <Route path = "/employee" component = { EmployeeContainer } />
            <Route path = "/compensation" component = { CompensationContainer } />
            <Route path = "/compensation-history" component = { CompensationHistoryContainer } />
          </Switch>


    </Router>
  );
}

export default App;
