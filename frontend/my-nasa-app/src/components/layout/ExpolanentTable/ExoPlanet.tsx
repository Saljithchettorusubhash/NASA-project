import React, { useState, useMemo, useEffect } from 'react';
import { useExoplanetData } from '../../../hooks/useExoplanetData';
import SearchComponent from '../../common/SearchComponent/SearchComponent';
import ExoPlanetList from '../ExoPlanetList/ExoPlanetList';
import FilterComponent from '../FilterComponnet/FilterComponent';
import { useDebouncedEffect } from '../../../hooks/useDebounceEffect';

const ExoPlanet: React.FC = () => {
  const [filter, setFilter] = useState({
    discoveryMethod: '',
    planetSize: '',
    year: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { exoPlanetData, loading } = useExoplanetData(limit, offset);

  const handleFilterChange = (name: string, value: string | number | null) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useDebouncedEffect(() => {
    setDebouncedSearchQuery(searchQuery);
  }, [searchQuery], 500);

  const filteredData = useMemo(() => {
    if (!filter.discoveryMethod && !filter.planetSize && !filter.year && !debouncedSearchQuery) {
      return exoPlanetData;
    }

    return exoPlanetData.filter((planet: any) => {
      let planetSizeCategory = '';

      if (planet.pl_rade < 1) {
        planetSizeCategory = 'Small';
      } else if (planet.pl_rade >= 1 && planet.pl_rade <= 2.5) {
        planetSizeCategory = 'Medium';
      } else if (planet.pl_rade > 2.5) {
        planetSizeCategory = 'Large';
      }

      return (
        (!filter.discoveryMethod || (planet.discoverymethod && planet.discoverymethod.toLowerCase() === filter.discoveryMethod.toLowerCase())) &&
        (!filter.planetSize || planetSizeCategory === filter.planetSize) &&
        (!filter.year || planet.disc_year === filter.year) &&
        (!debouncedSearchQuery || (planet.pl_name && planet.pl_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())))
      );
    });
  }, [exoPlanetData, filter, debouncedSearchQuery]);

  useEffect(() => {
    console.log('Filtered Data Updated:', filteredData);
  }, [filteredData]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="relative exoplanet-page p-8 bg-gray-900 text-white min-h-screen">
      <div className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Exoplanets</div>

      <SearchComponent onSearch={handleSearch} />

      <FilterComponent
        discoveryMethods={['Transit', 'Radial Velocity']}
        planetSizes={['Small', 'Medium', 'Large']}
        filters={filter}
        onFilterChange={handleFilterChange}
      />

      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75">
          <div className="text-center">
            <div className="flex justify-center items-center">
              <div className="w-16 h-16 border-4 border-t-transparent border-purple-600 border-solid rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-xl font-semibold text-white animate-pulse">Loading, please wait...</div>
          </div>
        </div>
      )}

      {!loading && filteredData.length > 0 ? (
        <>
          <ExoPlanetList exoplanets={filteredData} />

          <div className="pagination-controls text-center mt-8">
            <button
              className="mr-4 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition duration-300 disabled:opacity-50"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-4 text-lg">Page {currentPage}</span>
            <button
              className="ml-4 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition duration-300 disabled:opacity-50"
              onClick={handleNextPage}
              disabled={filteredData.length < limit}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        !loading && <div className="text-center text-lg text-gray-400">No Exoplanets Found</div>
      )}
    </div>
  );
};

export default ExoPlanet;
