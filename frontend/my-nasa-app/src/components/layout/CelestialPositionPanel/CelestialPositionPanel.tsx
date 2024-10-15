import React, { useState } from 'react';

interface CelestialPositionPanelProps {
    identifier?: string;
    centroidCoordinates?: { lat: number; lon: number };
    dscovrPosition?: { x: number; y: number; z: number };
    lunarPosition?: { x: number; y: number; z: number };
    sunPosition?: { x: number; y: number; z: number };
    additionalInfo?: {
      missDistance: string;
      velocity: string;
      diameter: string;
    };
  }
  
  const CelestialPositionPanel: React.FC<CelestialPositionPanelProps> = ({
    identifier = 'Unknown Identifier',
    centroidCoordinates = { lat: 0, lon: 0 },
    dscovrPosition = { x: 0, y: 0, z: 0 },
    lunarPosition = { x: 0, y: 0, z: 0 },
    sunPosition = { x: 0, y: 0, z: 0 },
    additionalInfo = { missDistance: 'N/A', velocity: 'N/A', diameter: 'N/A' },
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
  
    return (
      <div className="mb-4 border border-gray-600 rounded-lg transition-all w-full lg:w-96">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors p-2 w-full text-left text-white rounded-t-md font-bold"
          style={{ height: '50px' }}
        >
          {identifier}
        </button>
        {isOpen && (
          <div className="p-4 bg-gray-800 text-white rounded-b-md space-y-2">
            <p><strong>Centroid Coordinates:</strong> Lat: {centroidCoordinates.lat}, Lon: {centroidCoordinates.lon}</p>
            <p><strong>DSCOVR Position:</strong> X: {dscovrPosition.x}, Y: {dscovrPosition.y}, Z: {dscovrPosition.z}</p>
            <p><strong>Lunar Position:</strong> X: {lunarPosition.x}, Y: {lunarPosition.y}, Z: {lunarPosition.z}</p>
            <p><strong>Sun Position:</strong> X: {sunPosition.x}, Y: {sunPosition.y}, Z: {sunPosition.z}</p>
            {/* Additional Info */}
            <p><strong>Miss Distance:</strong> {additionalInfo.missDistance} km</p>
            <p><strong>Velocity:</strong> {additionalInfo.velocity} km/h</p>
            <p><strong>Diameter:</strong> {additionalInfo.diameter} meters</p>
          </div>
        )}
      </div>
    );
  };
  
  export default CelestialPositionPanel;
  