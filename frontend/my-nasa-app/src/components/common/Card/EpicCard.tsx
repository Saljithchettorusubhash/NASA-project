import React from 'react';

interface CardProps {
  data: {
    image: string;
    caption: string;
    identifier: string;
  };
  isActive: boolean;
  onClick: () => void;
}

const EpicCard: React.FC<CardProps> = ({ data, isActive, onClick }) => {
  return (
    <div
      className={`transform transition-all duration-500 cursor-pointer ${
        isActive ? 'scale-110' : 'scale-100'
      } hover:scale-105`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-800 w-64 h-48">
        <img
          src={data.image}
          alt={data.caption}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-4">
          <h3 className="text-white text-lg font-semibold text-center">{data.identifier}</h3>
        </div>
      </div>
    </div>
  );
};

export default EpicCard;
