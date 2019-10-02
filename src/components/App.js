/* eslint-disable react/no-unused-state */
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Top from './Top';
import New from './New';
import User from './User';
import Post from './Post';
import { ThemeProvider } from '../contexts/theme';

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light',
      }));
    },
  }

  render() {
    const { theme } = this.state;
    const style = theme === 'light' ? { background: 'rgb(255, 215, 0)' } : { background: 'rgb(255, 191, 116)' };
    return (
      <Router basename={`${process.env.PUBLIC_URL}/`}>
        <ThemeProvider value={this.state}>
          <div style={style}>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Top} />
              <Route exact path="/new" component={New} />
              <Route path="/user" component={User} />
              <Route path="/post" component={Post} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
