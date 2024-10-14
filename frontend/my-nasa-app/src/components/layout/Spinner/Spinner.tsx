import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-10 h-10 border-4 border-t-4 border-gray-200 rounded-full animate-spin mb-4"></div>
      <p className="text-white text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default Spinner;
