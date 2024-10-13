import React, { useState } from 'react';
import VideoCard from '../../common/Card/VideoCard'; // VideoCard component
import VideoModal from '../../common/VideoModal/VideoModal'; // Modal for video playback
import useNasaVideoData from '../../../hooks/useVideoNasaHook';

const VideoGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('earth');
  const [page, setPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [itemsPerPage] = useState(20);

  const { data, loading, error } = useNasaVideoData(searchQuery);

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const paginatedData = data
    ? data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  return (
    <div className="p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen">
      <div className="flex items-center justify-center mb-6 space-x-4">
        <label className="text-lg font-medium text-white">
          Search for NASA videos by keyword:
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g., 'space', 'mars'"
          className="p-2 rounded-md shadow-lg w-72 text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition focus:outline-none"
        />
      </div>

      {loading && <p className="text-center text-lg text-white">Loading videos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedData && paginatedData.length > 0 && paginatedData.map((video: any) => (
          <VideoCard
            key={video.nasa_id}
            video={video}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      <div className="pagination-controls mt-6 flex justify-center space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md text-white ${page === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
        >
          Previous
        </button>
        <span className="text-lg text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md text-white ${page === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
        >
          Next
        </button>
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default VideoGallery;
