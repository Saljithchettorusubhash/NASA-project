import React from 'react';
import HoverEffect from '../../../utils/HoverEffect';

interface ImageCardProps {
  image: {
    title: string;
    nasa_id: string;
    date_created: string;
    description: string;
    keywords: string[];
    links: { href: string; render: string; rel: string }[];
  };
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const thumbnail = image.links?.find((link) => link.rel === 'preview')?.href;

  return (
    <div className="image-card relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105" onClick={onClick}>
      <img
        src={thumbnail}
        alt={image.title}
        className="w-full h-48 object-cover rounded"
      />
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-lg">{image.title}</h3>
        <p className="text-sm text-gray-500">{image.date_created}</p>
        <p className="truncate text-sm text-gray-600 mt-2">{image.description}</p>
      </div>

      {/* HoverEffect */}
      <HoverEffect nasaId={image.nasa_id} keywords={image.keywords} />
    </div>
  );
};

export default ImageCard;
