import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Top from './Top';
import New from './New';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Top} />
        <Route exact path="/new" component={New} />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
