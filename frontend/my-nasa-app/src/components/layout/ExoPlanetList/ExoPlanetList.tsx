import React from 'react';

interface ExoPlanetListProps {
  exoplanets: any[];
}

const ExoPlanetList: React.FC<ExoPlanetListProps> = ({ exoplanets }) => {
  if (!exoplanets || exoplanets.length === 0) {
    return <div className="text-center text-gray-500">No Exoplanets Available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-white mt-8 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-indigo-700">
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm leading-4 tracking-wider uppercase">Name</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm leading-4 tracking-wider uppercase">Discovery Method</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm leading-4 tracking-wider uppercase">Planet Radius (Earth units)</th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm leading-4 tracking-wider uppercase">Discovery Year</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          {exoplanets.map((planet, index) => (
            <tr key={index} className="hover:bg-gray-700 transition duration-200">
              <td className="px-6 py-4 border-b border-gray-600">{planet.pl_name || 'Unknown'}</td>
              <td className="px-6 py-4 border-b border-gray-600">{planet.discoverymethod || 'Unknown'}</td>
              <td className="px-6 py-4 border-b border-gray-600">{planet.pl_rade !== undefined ? planet.pl_rade : 'N/A'}</td>
              <td className="px-6 py-4 border-b border-gray-600">{planet.disc_year || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExoPlanetList;
