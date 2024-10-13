import React from 'react';
import clsx from 'clsx';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  const baseStyles = clsx(
    'text-base md:text-lg lg:text-xl leading-relaxed text-gray-300',
    className
  );

  return <p className={baseStyles}>{children}</p>;
};

export default Paragraph;
