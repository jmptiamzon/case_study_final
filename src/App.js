import React from 'react';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import EmployeeContainer from './containers/EmployeeContainer';
import CompensationContainer from './containers/CompensationContainer';
import Header from './components/Header';
import Container from '@material-ui/core/Container';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {

  return (
    <Router>
      <Header />

        <Container style = {{marginTop: 30}}>
          <Switch>
            <Route exact path = "/" component = { HomeContainer } />
            <Route path = "/employee" component = { EmployeeContainer } />
            <Route path = "/compensation" component = { CompensationContainer } />
          </Switch>
        </Container>


    </Router>
  );
}

export default App;
