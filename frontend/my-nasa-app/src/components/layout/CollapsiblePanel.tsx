// components/common/CollapsiblePanel.tsx
import React, { useState } from 'react';

interface CollapsiblePanelProps {
  flareDetails: {
    flrID: string;
    instruments: string[];
    sourceLocation: string;
    linkedEvents: string[];
  }[];
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({ flareDetails }) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const togglePanel = (index: number) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <div>
      {flareDetails.map((flare, index) => (
        <div key={flare.flrID} className="mb-4">
          <button
            onClick={() => togglePanel(index)}
            className="bg-indigo-600 p-2 w-full text-left text-white rounded-md"
          >
            {flare.flrID}
          </button>
          {isOpen === index && (
            <div className="p-4 bg-gray-700 rounded-md mt-2">
              <p><strong>Instruments:</strong> {flare.instruments.join(', ')}</p>
              <p><strong>Source Location:</strong> {flare.sourceLocation}</p>
              <p><strong>Linked Events:</strong> {flare.linkedEvents.join(', ')}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CollapsiblePanel;
