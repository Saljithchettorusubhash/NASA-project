import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/common/Header/Header";
import AppRoutes from "./router/routes";
import Footer from "./components/common/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <Footer/>
    </Router>
  );
}

export default App;
