import React from 'react';
import Button from '../../common/Button/Button';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  altText: string;
  buttonText: string;
  buttonLink: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImageUrl,
  altText,
  buttonText,
  buttonLink,
}) => {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, color: 'white' }}
      aria-label={altText}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-2xl text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 font-light">
            {subtitle}
          </h2>
          <Button
            label={buttonText}
            link={buttonLink}
            className="bg-transparent border border-white text-white py-2 px-6 rounded-md text-lg hover:bg-white hover:text-black transition-colors"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
