/* eslint-disable react/no-unused-state */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Stories from './Stories';
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
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div id="app" className={theme}>
            <div className="container">
              <NavBar />
              <Switch>
                <Route exact path="/" component={Stories} />
                <Route exact path="/new" component={Stories} />
                <Route path="/user" component={User} />
                <Route path="/post" component={Post} />
                <Route render={() => <h1>404</h1>} />
              </Switch>

            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
