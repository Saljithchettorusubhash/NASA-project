import React, { useState, useEffect } from 'react';
import useMarsRoverData from '../../../hooks/useMarsRoverData';
import Filter from '../../common/Filter/Filter';

interface RoverSectionProps {
  roverName: string;
}

const RoverSection: React.FC<RoverSectionProps> = ({ roverName }) => {
  const [filter, setFilter] = useState<{ sol: number; camera: string }>({ sol: 1000, camera: '' });
  const [initialPhotos, setInitialPhotos] = useState<any[]>([]);
  const { roverPhotos, loading, error } = useMarsRoverData(roverName, filter.sol, filter.camera);

  // Save initial data to localStorage and useEffect to persist initial state
  useEffect(() => {
    const savedPhotos = localStorage.getItem(`${roverName}-photos`);
    if (savedPhotos) {
      setInitialPhotos(JSON.parse(savedPhotos));
    } else if (roverPhotos.length > 0) {
      setInitialPhotos(roverPhotos);
      localStorage.setItem(`${roverName}-photos`, JSON.stringify(roverPhotos));
    }
  }, [roverPhotos, roverName]);

  // Use either fetched or stored initial photos
  const displayedPhotos = roverPhotos.length > 0 ? roverPhotos.slice(0, 6) : initialPhotos.slice(0, 6);

  if (loading && !initialPhotos.length) {
    return <div className="h-screen w-full flex justify-center items-center">Loading...</div>;
  }

  if (error && !initialPhotos.length) {
    return <div className="h-screen w-full flex justify-center items-center">{error}</div>;
  }

  return (
    <section className="rover-section container mx-auto py-12 px-6">
      <div className={`flex flex-col lg:flex-row items-center lg:justify-center gap-8 ${roverName === 'PERSEVERANCE' ? 'lg:flex-row-reverse' : ''}`}>
        
        <div className="flex flex-col items-center lg:w-1/3 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold mb-6">{roverName}</h1>
          <div className="w-full max-w-sm">
            <Filter filter={filter} setFilter={setFilter} />
          </div>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayedPhotos.length > 0 ? (
            displayedPhotos.map((photo: any) => (
              <div key={photo.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img
                  src={photo.img_src}
                  alt={`Taken by ${photo.camera.full_name} on ${photo.earth_date}`}
                  className="w-full h-96 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center text-white p-4 text-sm font-semibold">
                  <div className="text-center">
                    {photo.camera.full_name} <br /> {photo.earth_date}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 flex justify-center items-center text-white">
              No photos available for the selected filter criteria.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoverSection;
