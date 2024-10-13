import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/pages/HomePage/Home';
import MarsRover from '../components/pages/MarsRover/MarsRover';
import ExoPlanetPage from '../components/pages/ExoPlanet/ExoPlanetPage';
import DonkiPage from '../components/pages/DonkiPage/DonkiPage';
import NasaImage from '../components/pages/NasaImages/NasaImage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mars-rover" element={<MarsRover />} />
      <Route path="/exo-planet" element={<ExoPlanetPage />} />
      <Route path="/donki" element={<DonkiPage />} />
      <Route path="/nasaImage" element={<NasaImage />} />
    </Routes>
  );
};

export default AppRoutes;
