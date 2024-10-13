import React from 'react';
import CMEDetailCard from './CMEDetailCard';

interface CMEData {
  activityID: string;
  sourceLocation: string;
  speed?: number;
  latitude?: number | null;
  longitude?: number | null;
  note?: string;
}

interface CMECardProps {
  cmeData: CMEData[];
}

const CmeCard: React.FC<CMECardProps> = ({ cmeData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {cmeData.map((cme, index) => (
        <CMEDetailCard
          key={index}
          activityID={cme.activityID}
          sourceLocation={cme.sourceLocation || 'Unknown'}
          speed={cme.speed !== undefined ? cme.speed : 'N/A'}
          latitude={cme.latitude !== undefined ? cme.latitude : 'N/A'}
          longitude={cme.longitude !== undefined ? cme.longitude : 'N/A'}
          note={cme.note || 'No additional information'}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};

export default CmeCard;
