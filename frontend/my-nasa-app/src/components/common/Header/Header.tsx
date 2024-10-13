import React from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import Menu from './Menu';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div id="header" className="relative section">
      <div className="header-bg absolute inset-0 bg-cover bg-center bg-black"></div>
      
      <div className="header-inner flex justify-between items-center px-8 py-6 relative z-10">
        {/* Logo should be present in all views */}
        <Logo />

        {/* Hide NavLinks below 1024px */}
        <div className="hidden lg:flex">
          <NavLinks />
        </div>

        {/* Hamburger Menu - Always visible */}
        <button
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="menu"
          aria-label="Menu"
          className="flex flex-col space-y-1" // Visible in all screen sizes
        >
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
        </button>
      </div>

      {/* Mobile menu with Logo on top */}
      {menuOpen && <Menu onClose={closeMenu} />}
    </div>
  );
};

export default Header;
