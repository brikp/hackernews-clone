import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

const style = {
  color: '#FF6B6B',
};

export default function NavBar() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row nav">
          <ul className="row">
            <li>
              <NavLink exact to="/" activeStyle={style} className={`nav-link-${theme}`}>Top</NavLink>
            </li>
            <li>
              <NavLink to="/new" activeStyle={style} className={`nav-link-${theme}`}>New</NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            id="button-context"
            onClick={toggleTheme}
            type="button"
          >
            {theme === 'light' ? '🔦' : '💡'}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
