import React from 'react';

const HamburgerMenu: React.FC = () => {
  return (
   <button id='hamburger' aria-expanded='false' aria-controls='menu' aria-label='Menu' role='button' aria-haspopup='dialog'>
<div id="bar1" className="bar w-6 h-1 bg-white mb-1"></div>
      <div id="bar2" className="bar w-6 h-1 bg-white mb-1"></div>
      <div id="bar3" className="bar w-6 h-1 bg-white"></div>

   </button>

  );
};

export default HamburgerMenu;
