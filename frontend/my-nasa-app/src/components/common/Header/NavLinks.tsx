import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks: React.FC = () => {
  return (
    <nav id="navigation">
      <ul className="nav-links flex space-x-8 text-white">
        <li className="nav-item text-lg">
          <Link to="/mars-rover">Mars Rover</Link>
        </li>
        <li className="nav-item text-lg">
          <Link to="/exo-planet">Exo-Planet</Link>
        </li>
        <li className="nav-item text-lg">
          <Link to="/donki">DONKI</Link>
        </li>
        <li className="nav-item text-lg">
          <Link to="/nasaImage">NASA Gallery</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
