import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

export default function NavBar() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact>Top</NavLink>
            </li>
            <li>
              <NavLink to="/new">New</NavLink>
            </li>
          </ul>
          <button
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
