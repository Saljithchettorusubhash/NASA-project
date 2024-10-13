import React from 'react';

interface EventSummaryCardProps {
  title: string;
  totalEvents: number;
  strongestMetric: string;
  onClick: () => void;
}

const EventSummaryCard: React.FC<EventSummaryCardProps> = ({
  title,
  totalEvents,
  strongestMetric,
  onClick
}) => {
  return (
    <div
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p>Total Events: {totalEvents}</p>
      <p>Strongest Metric: {strongestMetric}</p>
    </div>
  );
};

export default EventSummaryCard;
