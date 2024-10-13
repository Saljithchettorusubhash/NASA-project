import React from 'react';
import Logo from './Logo';

interface MenuProps {
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
      {/* Logo at the top of the menu */}
      <div className="mb-8">
        <Logo />
      </div>

      {/* Responsive Navigation */}
      <nav className="text-center">
        <ul className="nav-links space-y-6 text-white">
          <li className="nav-item">
            <a 
              href="/mars-rover" 
              className="text-2xl sm:text-3xl lg:text-4xl hover:text-gray-400 transition duration-300"
            >
              Mars Rover
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="/exo-planet" 
              className="text-2xl sm:text-3xl lg:text-4xl hover:text-gray-400 transition duration-300"
            >
              Exo-Planet
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="/donki" 
              className="text-2xl sm:text-3xl lg:text-4xl hover:text-gray-400 transition duration-300"
            >
              DONKI
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="/nasaImage" 
              className="text-2xl sm:text-3xl lg:text-4xl hover:text-gray-400 transition duration-300"
            >
              NASA Image
            </a>
          </li>
        </ul>
      </nav>

      {/* Responsive Close Menu Button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-4 right-4 text-white text-3xl sm:text-4xl hover:text-gray-400 transition duration-300"
      >
        &times;
      </button>
    </div>
  );
};

export default Menu;
