import React from 'react';
import CelestialPositionPanel from '../CelestialPositionPanel/CelestialPositionPanel';
import { useEpicImages } from '../../../hooks/useEpicHook';

const GlobeDetailsWrapper: React.FC = () => {
  const { epicImages, loading, error } = useEpicImages();

  const defaultContent = (
    <CelestialPositionPanel
      identifier="Default Identifier"
      centroidCoordinates={{ lat: 0, lon: 0 }}
      dscovrPosition={{ x: 0, y: 0, z: 0 }}
      lunarPosition={{ x: 0, y: 0, z: 0 }}
      sunPosition={{ x: 0, y: 0, z: 0 }}
    />
  );

  const getEpicImageData = (image: any) => ({
    identifier: image.identifier || "Unknown Identifier",
    centroidCoordinates: image.centroid_coordinates || { lat: 0, lon: 0 },
    dscovrPosition: image.dscovr_j2000_position || { x: 0, y: 0, z: 0 },
    lunarPosition: image.lunar_j2000_position || { x: 0, y: 0, z: 0 },
    sunPosition: image.sun_j2000_position || { x: 0, y: 0, z: 0 },
  });

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row text-white">
      {/* Left section with heading */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-4 bg-gradient-to-r from-gray-800 to-black">
        <h1
          className="text-3xl lg:text-5xl font-bold text-white text-center p-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 animate-pulse"
          style={{ lineHeight: '1.2' }} // Apply line height here
        >
          NASA EPIC Celestial Positions
        </h1>
      </div>
      
      {/* Right section with panels */}
      <div className="w-full lg:w-2/3 overflow-y-auto p-8 bg-black flex flex-wrap justify-center">
        {loading && <div>Loading celestial data...</div>}
        {error && <div>Error loading celestial data: {error}</div>}

        {epicImages.length > 0
          ? epicImages.map((image) => {
              const data = getEpicImageData(image);
              return (
                <div className="w-full lg:w-96"> {/* Set width here for each panel */}
                  <CelestialPositionPanel
                    key={data.identifier}
                    identifier={data.identifier}
                    centroidCoordinates={data.centroidCoordinates}
                    dscovrPosition={data.dscovrPosition}
                    lunarPosition={data.lunarPosition}
                    sunPosition={data.sunPosition}
                  />
                </div>
              );
            })
          : defaultContent}
      </div>
    </div>
  );
};

export default GlobeDetailsWrapper;
