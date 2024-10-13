import React from 'react';

interface VideoCardProps {
  video: {
    title: string;
    nasa_id: string;
    date_created: string;
    description: string;
    links: { href: string, rel: string }[];
  };
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const thumbnail = video.links?.find((link) => link.rel === 'preview')?.href;

  return (
    <div className="video-card relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 bg-gray-800 text-white" onClick={onClick}>
      <img
        src={thumbnail}
        alt={video.title}
        className="w-full h-48 object-cover rounded-t"
      />
      <div className="p-4">
        <h3 className="font-semibold truncate">{video.title}</h3>
        <p className="text-sm text-gray-400">{video.date_created}</p>
        <p className="truncate text-sm text-gray-300 mt-2">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
