import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  label: string;
  link: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, link, className }) => {
  const baseStyles = clsx(
    'bg-primary hover:bg-accent text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out',
    className
  );

  return (
    <a href={link} className={baseStyles}>
      {label}
    </a>
  );
};

export default Button;
