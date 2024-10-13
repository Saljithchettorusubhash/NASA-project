import React, { useState, useEffect } from 'react';
import EpicCard from '../../common/Card/EpicCard';
import { useEpicImages } from '../../../hooks/useEpicHook';

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [validEpicImages, setValidEpicImages] = useState<any[]>([]);
  const { epicImages, loading, error } = useEpicImages();

  const AUTO_CHANGE_INTERVAL = 5000;

  useEffect(() => {
    const validateImages = async () => {
      const validImages = await Promise.all(
        epicImages?.slice(0, 10).map((image: any) => {
          return new Promise((resolve) => {
            const img = new Image();
            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${new Date(image.date).getUTCFullYear()}/${String(new Date(image.date).getUTCMonth() + 1).padStart(2, '0')}/${String(new Date(image.date).getUTCDate()).padStart(2, '0')}/jpg/${image.image}.jpg`;

            img.src = imageUrl;
            img.onload = () => resolve(image);
            img.onerror = () => resolve(null);
          });
        })
      );

      setValidEpicImages(validImages.filter((image) => image !== null) as any[]);
    };

    if (epicImages?.length) {
      validateImages();
    }
  }, [epicImages]);

  useEffect(() => {
    if (validEpicImages.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % validEpicImages.length);
      }, AUTO_CHANGE_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [validEpicImages.length]);

  if (loading) {
    return <div className="h-screen w-full flex justify-center items-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="h-screen w-full flex justify-center items-center text-white">Error: {error}</div>;
  }

  if (!validEpicImages.length) {
    return <div className="h-screen w-full flex justify-center items-center text-white">No valid images to display</div>;
  }

  const backgroundImage = `https://epic.gsfc.nasa.gov/archive/natural/${new Date(validEpicImages[activeIndex].date).getUTCFullYear()}/${String(new Date(validEpicImages[activeIndex].date).getUTCMonth() + 1).padStart(2, '0')}/${String(new Date(validEpicImages[activeIndex].date).getUTCDate()).padStart(2, '0')}/jpg/${validEpicImages[activeIndex].image}.jpg`;

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Centered Heading (middle of the carousel, above the cards) */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full text-center text-white z-30">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          Witness Earth in Motion: NASA's Stunning Views from Space
        </h2>
      </div>

      {/* Cards Section - Responsive with Card Count Adjustment */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center space-x-6 overflow-x-auto px-6">
        {validEpicImages.map((data, index) => {
          const cardImage = `https://epic.gsfc.nasa.gov/archive/natural/${new Date(data.date).getUTCFullYear()}/${String(new Date(data.date).getUTCMonth() + 1).padStart(2, '0')}/${String(new Date(data.date).getUTCDate()).padStart(2, '0')}/jpg/${data.image}.jpg`;

          return (
            <EpicCard
              key={data.identifier}
              data={{ ...data, image: cardImage }}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
