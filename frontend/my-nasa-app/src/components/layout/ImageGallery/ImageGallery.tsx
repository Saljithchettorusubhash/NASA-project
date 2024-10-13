import React, { useState } from 'react';
import ModalView from '../../common/ModalView/ModalView';
import useNasaImageData from '../../../hooks/useNasaImage';
import ImageCard from '../../common/ImageGallery/ImageGallery';

const ImageGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('earth');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const { data, loading, error } = useNasaImageData(searchQuery, 'image');
  
  const itemsPerPage = 20;
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  const paginatedData = data
    ? data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div className="flex items-center justify-center mb-6 space-x-4">
        <label className="text-lg font-semibold text-gray-800">
          Search for NASA images by keyword:
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g., 'mars', 'moon'"
          className="p-2 rounded-md shadow-lg w-72 text-gray-800 focus:ring-2 focus:ring-yellow-500 transition focus:outline-none"
        />
      </div>

      {loading && <p className="text-center text-lg text-gray-800">Loading images...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData.map((image: any) => (
          <ImageCard
            key={image.nasa_id}
            image={image}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md text-white ${page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
        >
          Previous
        </button>
        <span className="text-lg text-gray-800">Page {page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md text-white ${page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
        >
          Next
        </button>
      </div>

      {selectedImage && (
        <ModalView
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default ImageGallery;
