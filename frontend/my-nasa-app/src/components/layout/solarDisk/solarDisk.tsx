import React, { useState } from 'react';

interface CMEData {
  activityID: string;
  sourceLocation: string;
  latitude: number | null;
  longitude: number | null;
  speed?: number; // Optional speed
}

interface SolarDiskProps {
  cmeData: CMEData[];
}

const RADIUS = 150;
const CENTER_X = RADIUS;
const CENTER_Y = RADIUS;

// Dummy fallback coordinates for testing
const DUMMY_COORDINATES = [
  { latitude: 10, longitude: -30 },
  { latitude: -20, longitude: 45 },
  { latitude: 30, longitude: 60 },
  { latitude: -40, longitude: -80 },
  { latitude: 50, longitude: 100 },
];

const SolarDisk: React.FC<SolarDiskProps> = ({ cmeData }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Helper function to map lat/lon to disk coordinates
  const mapToDiskCoordinates = (lat: number | null, lon: number | null, index: number) => {
    // Use fallback dummy coordinates if lat or lon is missing
    const latitude = lat ?? DUMMY_COORDINATES[index % DUMMY_COORDINATES.length].latitude;
    const longitude = lon ?? DUMMY_COORDINATES[index % DUMMY_COORDINATES.length].longitude;

    const x = CENTER_X + RADIUS * Math.cos((longitude * Math.PI) / 180);
    const y = CENTER_Y - RADIUS * Math.sin((latitude * Math.PI) / 180);
    return { x, y };
  };

  return (
    <div className="flex justify-center items-center mb-8">
      <svg
        width={RADIUS * 2}
        height={RADIUS * 2}
        viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
        className="solar-disk"
        style={{ background: 'radial-gradient(circle at center, #ffeb3b, #ff9800)', borderRadius: '50%' }}
      >
        <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS} fill="yellow" stroke="red" strokeWidth="3" />

        {/* Plot CME data points */}
        {cmeData.map((cme, index) => {
          const { latitude, longitude, speed } = cme;
          const { x, y } = mapToDiskCoordinates(latitude, longitude, index);

          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="blue"
                stroke="white"
                strokeWidth="1"
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {/* Tooltip appears when the user hovers over a point */}
              {hoveredPoint === index && (
                <foreignObject x={x - 50} y={y - 30} width="100" height="50">
                  <div style={{ backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px' }}>
                    <strong>{cme.activityID}</strong><br />
                    Speed: {speed ? `${speed} km/s` : 'N/A'}<br />
                    Location: {latitude ? latitude : 'N/A'}, {longitude ? longitude : 'N/A'}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SolarDisk;
