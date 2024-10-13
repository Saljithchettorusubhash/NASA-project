import React from 'react';
import useApodData from '../../../hooks/useApodData';
import Heading from '../../common/Typography/Heading';
import Paragraph from '../../common/Typography/Paragraph';

const BackgroundImage: React.FC = () => {
  const { apodData, loading, error } = useApodData();

  // Fallback content if no data is available
  const fallbackData = {
    title: 'Explore the Cosmos',
    explanation: 'Discover the wonders of the universe through stunning images and detailed explanations of celestial events.',
  };

  // Determine background image or a fallback image
  const backgroundImageUrl = apodData?.hdurl || apodData?.url || '/fallback-image.jpg';

  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Background Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 section-inner text-white max-w-xl px-4 md:px-8 lg:px-16 py-12 rounded-lg ml-4 lg:ml-16">
        {/* Show loading or error message */}
        {loading && <div className="text-center text-xl">Loading...</div>}
        {error && <div className="text-center text-xl text-red-500">Error: {error}</div>}

        {/* Show data if available, otherwise show fallback content */}
        <Heading level={1} className="text-white shadow-lg">
          {apodData?.title || fallbackData.title}
        </Heading>

        <Paragraph className="mt-4 text-lg md:text-xl lg:text-2xl shadow-md leading-relaxed">
          {apodData?.explanation ? (
            apodData.explanation.length > 400
              ? `${apodData.explanation.slice(0, 400)}...`
              : apodData.explanation
          ) : (
            fallbackData.explanation
          )}
        </Paragraph>

      </div>
    </div>
  );
};

export default BackgroundImage;
