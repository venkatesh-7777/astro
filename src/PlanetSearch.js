// src/PlanetSearch.js
import React, { useState } from 'react';

const PlanetSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');      // State to store the search input (planet/moon name)
  const [planetData, setPlanetData] = useState(null);      // State to store data of the planet/moon
  const [loading, setLoading] = useState(false);           // State to track if data is loading
  const [error, setError] = useState(null);                // State to store any error that occurs during fetch

  // This function updates the search query whenever the user types in the input box
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // This function is triggered when the user clicks the search button
  const handleSearchClick = async () => {
    if (!searchQuery) return;  // If the search query is empty, do nothing
    setLoading(true);           // Set loading state to true while fetching
    setError(null);             // Reset any previous error message
    setPlanetData(null);        // Reset planet data to prevent showing old data

    try {
      // Make an API call to get planet/moon data
      const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${searchQuery}`);
      const data = await response.json(); // Parse the response to JSON

      // If the API response has an error (for example, planet not found), throw an error
      if (data.error) {
        throw new Error(data.error.message);
      }

      // Set the fetched data to state if successful
      setPlanetData(data);
    } catch (err) {
      // If there's an error, set an error message
      setError('Planet or moon not found. Please try again.');
    } finally {
      // Once the fetch is done, set loading state to false
      setLoading(false);
    }
  };

  // The return statement renders the UI of this component
  return (
    <div className="planet-search-container">
      <h2>Search for Planets or Moons</h2>

      {/* Input field to enter the planet/moon name */}
      <input
        type="text"
        placeholder="Enter planet or moon name"
        value={searchQuery}                // The value is controlled by the searchQuery state
        onChange={handleSearchChange}       // Updates the state when the user types
      />

      {/* Button that triggers the search */}
      <button onClick={handleSearchClick}>Search</button>

      {/* If the data is loading, display a loading message */}
      {loading && <div className="loading">Loading...</div>}

      {/* If there's an error, display the error message */}
      {error && <div className="error">{error}</div>}

      {/* If planet data is available, display it */}
      {planetData && (
        <div className="planet-info">
          <h3>{planetData.englishName}</h3> {/* Displays the English name of the planet/moon */}
          <p>Mass: {planetData.mass ? planetData.mass.massValue : 'N/A'} {planetData.mass ? planetData.mass.massExponent : ''} kg</p>
          <p>Density: {planetData.density ? planetData.density : 'N/A'} g/cm³</p>
          <p>Gravity: {planetData.gravity ? planetData.gravity : 'N/A'} m/s²</p>
          <p>Distance from Earth: {planetData.distance ? planetData.distance : 'N/A'} km</p>
        </div>
      )}
    </div>
  );
};

export default PlanetSearch;
