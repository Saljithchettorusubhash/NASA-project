import React from 'react';
import clsx from 'clsx';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ level, children, className }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseStyle = clsx(
    {
      'text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight': level === 1,
      'text-2xl md:text-4xl lg:text-5xl font-bold': level === 2,
      'text-xl md:text-3xl lg:text-4xl font-semibold': level === 3,
    },
    className
  );

  return <Tag className={baseStyle}>{children}</Tag>;
};

export default Heading;
