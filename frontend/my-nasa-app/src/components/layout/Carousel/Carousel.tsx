import React, { useState, useEffect } from 'react';
import EpicCard from '../../common/Card/EpicCard';
import useCarouselApodData from '../../../hooks/fetchCarouselApodData';

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { carouselApodData, loading, error } = useCarouselApodData();
  const AUTO_CHANGE_INTERVAL = 5000;

  // Filter images that don't have a valid URL or HDURL
  const validApodData = carouselApodData.filter(
    (data) => data.url || data.hdurl
  );

  useEffect(() => {
    if (validApodData.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % validApodData.length);
      }, AUTO_CHANGE_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [validApodData.length]);

  if (loading) {
    return <div className="h-screen w-full flex justify-center items-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="h-screen w-full flex justify-center items-center text-white">Error: {error}</div>;
  }

  if (!validApodData.length) {
    return <div className="h-screen w-full flex justify-center items-center text-white">No images to display</div>;
  }

  const backgroundImage = validApodData[activeIndex]?.hdurl || validApodData[activeIndex]?.url;

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Centered Heading */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full text-center text-white z-30">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          Astronomy Picture of the Day
        </h2>
      </div>

      {/* Cards Section */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center space-x-6 overflow-x-auto px-6">
        {validApodData.map((data, index) => (
          <EpicCard
            key={data.date}
            data={{
              image: data.url || data.hdurl, // Map the correct image URL
              caption: data.title, // Use 'title' as caption
              identifier: data.date, // Use 'date' as identifier
            }}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            // Highlight the active card
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
