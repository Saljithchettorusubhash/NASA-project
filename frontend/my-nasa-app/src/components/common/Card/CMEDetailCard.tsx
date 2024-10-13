import React from 'react';
import EventSummaryCard from './EventSummaryCard';

interface CMEDetailCardProps {
  activityID: string;
  sourceLocation: string;
  speed: string | number;
  latitude: string | number | null;  // Can be null
  longitude: string | number | null; // Can be null
  note: string;
  onClick: () => void;
}

const CMEDetailCard: React.FC<CMEDetailCardProps> = ({
  activityID,
  sourceLocation,
  speed,
  latitude,
  longitude,
  note,
  onClick,
}) => {
  // Handle null values for latitude and longitude
  const displayLatitude = latitude !== null ? latitude : 'N/A';
  const displayLongitude = longitude !== null ? longitude : 'N/A';

  return (
    <EventSummaryCard
      title={`CME ${activityID}`}
      totalEvents={1}
      strongestMetric={`Speed: ${speed} km/s, Location: ${sourceLocation} (${displayLatitude}, ${displayLongitude}), Note: ${note}`}
      onClick={onClick}
    />
  );
};

export default CMEDetailCard;
