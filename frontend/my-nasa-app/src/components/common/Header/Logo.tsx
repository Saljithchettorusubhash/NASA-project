import React from 'react';

const Logo: React.FC = () => {
  return (
    <a href="/" id="logo" aria-label="Cosmos Explorer Homepage" className="text-center">
      <span style={{
        fontFamily: 'Arial, sans-serif',
        fontWeight: '900',
        fontSize: 'clamp(24px, 5vw, 36px)', // Responsive size
        letterSpacing: '0.25em',
        background: 'linear-gradient(90deg, #00f0ff, #0070ff)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        textTransform: 'uppercase',
        display: 'inline-block',
      }}>
        Cosmos
      </span>

      <span style={{
        fontFamily: 'Arial, sans-serif',
        fontWeight: '300',
        fontSize: 'clamp(16px, 4vw, 28px)', // Responsive size
        letterSpacing: '0.15em',
        color: '#ffffff',
        textTransform: 'uppercase',
        marginLeft: '0.15em',
        opacity: '0.9',
        display: 'inline-block',
      }}>
        Explorer
      </span>
    </a>
  );
};

export default Logo;
