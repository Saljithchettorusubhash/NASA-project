import React from 'react';

interface ModalViewProps {
  image: {
    title: string;
    description: string;
    date_created: string;
    nasa_id: string;
    links: { href: string; rel: string; render: string }[];
  };
  onClose: () => void;
}

const ModalView: React.FC<ModalViewProps> = ({ image, onClose }) => {
  // Explicitly define the type for 'link'
  const fullImage = image.links?.find((link: { href: string; rel: string }) => link.rel === 'preview')?.href || '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg relative p-6 max-w-4xl w-full h-[36rem] overflow-y-auto">
        <button className="absolute top-2 right-2 text-xl font-bold text-red-500" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{image.title || 'No Title Available'}</h2>
        
        <div className="flex justify-center items-center mb-4 h-80 overflow-hidden">
          {fullImage ? (
            <img src={fullImage} alt={image.title} className="max-h-full max-w-full object-contain" />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <p className="text-sm mb-2 text-gray-700">{image.description || 'No description available.'}</p>
        <p className="text-xs text-gray-500">Date Created: {image.date_created || 'Unknown'}</p>
        <p className="text-xs text-gray-500">NASA ID: {image.nasa_id}</p>
      </div>
    </div>
  );
};

export default ModalView;
