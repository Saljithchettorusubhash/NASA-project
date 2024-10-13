import React from 'react';

interface FilterProps {
  filter: { sol: number; camera: string };
  setFilter: React.Dispatch<React.SetStateAction<{ sol: number; camera: string }>>;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  return (
    <div className="filter-section mb-6 p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-black text-lg font-semibold mb-2" htmlFor="sol">
          Sol:
        </label>
        <input
          type="number"
          id="sol"
          name="sol"
          value={filter.sol}
          onChange={handleInputChange}
          className="w-full p-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-black text-lg font-semibold mb-2" htmlFor="camera">
          Camera:
        </label>
        <select
          id="camera"
          name="camera"
          value={filter.camera}
          onChange={handleInputChange}
          className="w-full p-2 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">All</option>
          <option value="FHAZ">Front Hazard Avoidance Camera</option>
          <option value="RHAZ">Rear Hazard Avoidance Camera</option>
          <option value="MAST">Mast Camera</option>
          <option value="CHEMCAM">Chemistry and Camera Complex</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
