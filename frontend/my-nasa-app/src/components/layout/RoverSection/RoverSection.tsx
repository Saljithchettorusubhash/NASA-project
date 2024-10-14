import React, { useState } from 'react';
import useMarsRoverData from '../../../hooks/useMarsRoverData';
import Filter from '../../common/Filter/Filter';
import Spinner from '../Spinner/Spinner';

interface RoverSectionProps {
  roverName: string;
}

const RoverSection: React.FC<RoverSectionProps> = ({ roverName }) => {
  const [filter, setFilter] = useState<{ sol: number; camera: string }>({ sol: 1000, camera: '' });
  const { roverPhotos, loading, error } = useMarsRoverData(roverName, filter.sol, filter.camera);

  // Use fetched rover photos directly without involving local storage
  const displayedPhotos = roverPhotos.slice(0, 6);

  return (
    <section className="rover-section container mx-auto py-12 px-6">
      <div className={`flex flex-col lg:flex-row items-center lg:justify-center gap-8 ${roverName === 'PERSEVERANCE' ? 'lg:flex-row-reverse' : ''}`}>
        {/* Filter Section */}
        <div className="flex flex-col items-center lg:w-1/3 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold mb-6">{roverName}</h1>
          <div className="w-full max-w-sm">
            <Filter filter={filter} setFilter={setFilter} />
          </div>
        </div>

        {/* Photos Section with Loader */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="col-span-3 flex justify-center items-center text-white">
              {error}
            </div>
          ) : displayedPhotos.length > 0 ? (
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
