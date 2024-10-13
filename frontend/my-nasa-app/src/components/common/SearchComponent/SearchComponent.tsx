import React from 'react';

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Exoplanets..."
          className="flex-grow p-2 text-black rounded-l-lg bg-gray-200 focus:outline-none"
        />
        <button type="submit" className="p-2 bg-indigo-600 text-white rounded-r-lg">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
