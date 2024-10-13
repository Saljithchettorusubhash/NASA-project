import React from 'react';

interface CardProps {
    planetName: string;
    discoveryMethod: string;
    radius: number | string;
    orbitalPeriod: number | string;
    mass: number | string;
    density: number | string;
}

const Card: React.FC<CardProps> = ({
    planetName,
    discoveryMethod,
    radius,
    orbitalPeriod,
    mass,
    density,
}) => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            <div className="text-2xl font-bold mb-2">{planetName}</div>
            <p><strong>Discovery Method:</strong> {discoveryMethod}</p>
            <p><strong>Radius:</strong> {radius} Rj</p>
            <p><strong>Orbital Period:</strong> {orbitalPeriod} days</p>
            <p><strong>Mass:</strong> {mass} Mj</p>
            <p><strong>Density:</strong> {density} g/cm³</p>
        </div>
    );
};

export default Card;
