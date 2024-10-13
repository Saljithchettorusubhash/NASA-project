import React, { useEffect } from 'react';
import Card from '../../common/Card/Card';
import CustomBarChart from '../../charts/BarChart';
import { useExoPlanetTransitOrVelocity } from '../../../hooks/useexpoPlanetVelocity';

const Velocity: React.FC = () => {
    const { data, loading, error } = useExoPlanetTransitOrVelocity();

    useEffect(() => {
        if (data) {
            console.log('Velocity Data:', data);
        }
    }, [data]);

    // Provide dummy data in case data is not available
    const dummyData = [
        { pl_name: 'Planet X', discoverymethod: 'Radial Velocity', pl_radj: 1.2, pl_orbper: 365, pl_bmassj: 2.1, pl_dens: 5.51 },
        { pl_name: 'Planet Y', discoverymethod: 'Transit', pl_radj: 0.9, pl_orbper: 225, pl_bmassj: 1.0, pl_dens: 3.0 },
        // Add more dummy planets here if needed
    ];

    // Ensure that data is always an array and map through it
    const velocityData = (Array.isArray(data) && data.length > 0 ? data : dummyData)
        .filter((planet) => planet.pl_name)
        .map((planet, index) => ({
            planetName: planet.pl_name,
            discoveryMethod: planet.discoverymethod || 'Unknown',
            radius: planet.pl_radj || 'N/A',
            orbitalPeriod: planet.pl_orbper || 'N/A',
            mass: planet.pl_bmassj || 'N/A',
            density: planet.pl_dens || 'N/A',
            key: `${planet.pl_name}-${index}`,
        }))
        .slice(0, 8);

    return (
        <div className="p-8 min-h-screen mt-20 text-white">
            <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Exoplanet Discoveries: Velocity</h1>

            <div className="mb-12">
                {loading ? (
                    <div className="text-center text-lg">Loading data...</div>
                ) : error ? (
                    <div className="text-center text-lg text-red-400">Error: {error}</div>
                ) : (
                    <CustomBarChart data={velocityData} xKey="planetName" yKey="radius" />
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {velocityData.map((planet) => (
                    <Card
                        key={planet.key}
                        planetName={planet.planetName}
                        discoveryMethod={planet.discoveryMethod}
                        radius={planet.radius}
                        orbitalPeriod={planet.orbitalPeriod}
                        mass={planet.mass}
                        density={planet.density}
                    />
                ))}
            </div>
        </div>
    );
};

export default Velocity;
