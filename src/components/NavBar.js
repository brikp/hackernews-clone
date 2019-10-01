import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact>Top</NavLink>
        </li>
        <li>
          <NavLink to="/new">New</NavLink>
        </li>
      </ul>
    </nav>
  );
}
