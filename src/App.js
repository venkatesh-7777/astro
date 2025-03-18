import React from 'react';
import { BrowserRouter as Router, Route ,Routes,Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import PlanetSearch from './PlanetSearch'
import AstronomyPicture from './AstronomyPicture';

const App = () => {
  return (
    <Router>
    <div>
      <header>
        Space Explorer
      </header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Astronomy Picture of the day</Link>
          </li>
          <li>
            <Link to='/planet-search'>Planet Search</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<AstronomyPicture />} /> 
        <Route path="/planet-search" element={<PlanetSearch />} /> 
      </Routes>
    </div>
    </Router>
  );
};


export default App;


