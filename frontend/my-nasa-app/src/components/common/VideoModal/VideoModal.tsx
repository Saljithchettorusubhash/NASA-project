import React from 'react';
import ReactPlayer from 'react-player';

interface VideoModalProps {
  video: {
    title: string;
    links: { href: string }[]; // Define the type for `links`
    date_created: string;
    nasa_id: string;
  };
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const videoLink = video.links?.find((link: { href: string }) => link.href.includes('.mp4'))?.href;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-lg relative w-full max-w-4xl p-6">
        <button className="absolute top-2 right-2 text-2xl text-white" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">{video.title}</h2>

        {videoLink ? (
          <ReactPlayer url={videoLink} playing controls className="w-full my-4" />
        ) : (
          <p className="text-red-500">Video not available for playback</p>
        )}

        <p className="text-xs text-gray-400">Date Created: {video.date_created}</p>
        <p className="text-xs text-gray-400">NASA ID: {video.nasa_id}</p>
      </div>
    </div>
  );
};

export default VideoModal;
