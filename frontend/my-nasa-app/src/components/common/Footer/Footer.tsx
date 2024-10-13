import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Header/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-10 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <Logo />
          <p className="text-gray-400 max-w-md text-center lg:text-left">
            Discover the universe with Cosmos Explorer. Explore data from NASA's Open APIs, Mars Rover photos, Exoplanets, and more.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 text-center lg:text-left">
          <Link to="/mars-rover" className="hover:text-yellow-500 transition-colors duration-300">
            Mars Rover
          </Link>
          <Link to="/exo-planet" className="hover:text-yellow-500 transition-colors duration-300">
            Exoplanets
          </Link>
          <Link to="/donki" className="hover:text-yellow-500 transition-colors duration-300">
             DONKI
          </Link>
          <Link to="/nasaImage" className="hover:text-yellow-500 transition-colors duration-300">
            NASA Gallery
          </Link>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Cosmos Explorer. All rights reserved.
      </div>

      {/* Background styling */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div
          className="w-full h-full bg-cover opacity-10"
          style={{
            backgroundImage:
              "url('https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png')",
          }}
        ></div>
      </div>

      {/* Enhanced Keyframe Animation for shooting stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shooting-stars">
          <div className="star w-2 h-2 bg-yellow-400 rounded-full animate-shooting-star-1 shadow-lg"></div>
          <div className="star w-3 h-3 bg-yellow-500 rounded-full animate-shooting-star-2 shadow-lg"></div>
          <div className="star w-2.5 h-2.5 bg-yellow-300 rounded-full animate-shooting-star-3 shadow-lg"></div>
          <div className="star w-4 h-4 bg-yellow-600 rounded-full animate-shooting-star-4 shadow-lg"></div>
        </div>
      </div>

      {/* Inline animation styles */}
      <style>
        {`
          @keyframes shooting-star-1 {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            70% {
              opacity: 1;
            }
            100% {
              transform: translate(150vw, 150vh) scale(1.5);
              opacity: 0;
            }
          }

          @keyframes shooting-star-2 {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            70% {
              opacity: 1;
            }
            100% {
              transform: translate(200vw, 170vh) scale(1.8);
              opacity: 0;
            }
          }

          @keyframes shooting-star-3 {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            70% {
              opacity: 1;
            }
            100% {
              transform: translate(180vw, 140vh) scale(1.7);
              opacity: 0;
            }
          }

          @keyframes shooting-star-4 {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            70% {
              opacity: 1;
            }
            100% {
              transform: translate(220vw, 190vh) scale(2);
              opacity: 0;
            }
          }

          .animate-shooting-star-1 {
            animation: shooting-star-1 4s linear infinite;
          }

          .animate-shooting-star-2 {
            animation: shooting-star-2 5s linear infinite;
          }

          .animate-shooting-star-3 {
            animation: shooting-star-3 6s linear infinite;
          }

          .animate-shooting-star-4 {
            animation: shooting-star-4 7s linear infinite;
          }

          .star {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0.9;
            filter: blur(2px);
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
