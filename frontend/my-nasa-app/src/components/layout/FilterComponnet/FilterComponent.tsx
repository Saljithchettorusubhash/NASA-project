import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';

interface FilterComponentProps {
  discoveryMethods: string[];
  planetSizes: string[];
  filters: {
    discoveryMethod: string;
    planetSize: string;
    year: number | null;
  };
  onFilterChange: (name: string, value: string | number | null) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  discoveryMethods = [],
  planetSizes = [],
  filters,
  onFilterChange,
}) => {
  return (
    <div className="filter-container flex flex-col lg:flex-row gap-6 p-6 bg-gray-800 rounded-lg shadow-md text-white justify-center">
      {/* Discovery Method Filter */}
      <div className="flex flex-col items-center w-full lg:w-1/3">
        <label className="mb-2 text-sm">Discovery Method</label>
        <select
          value={filters.discoveryMethod}
          onChange={(e) => onFilterChange('discoveryMethod', e.target.value)}
          className="p-2 bg-gray-700 rounded-lg text-sm w-full lg:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          <option value="">All Discovery Methods</option>
          {discoveryMethods.map((method, index) => (
            <option key={index} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      {/* Planet Size Filter */}
      <div className="flex flex-col items-center w-full lg:w-1/3">
        <label className="mb-2 text-sm">Planet Size</label>
        <select
          value={filters.planetSize}
          onChange={(e) => onFilterChange('planetSize', e.target.value)}
          className="p-2 bg-gray-700 rounded-lg text-sm w-full lg:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          <option value="">All Sizes</option>
          {planetSizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Discovery Year Filter with Date Picker */}
      <div className="flex flex-col items-center w-full lg:w-1/3">
        <label className="mb-2 text-sm">Discovery Year</label>
        <div className="p-2 bg-gray-700 rounded-lg w-full lg:w-48 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
          <DatePicker
            selected={filters.year ? new Date(filters.year, 0) : null}
            onChange={(date) => onFilterChange('year', date ? date.getFullYear() : null)}
            showYearPicker
            dateFormat="yyyy"
            placeholderText="Select Year"
            className="bg-gray-700 text-white focus:outline-none w-full"
            minDate={new Date(2000, 0)}
            maxDate={new Date(2024, 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
