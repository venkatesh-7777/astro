import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling

const AstronomyPicture = () => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);  // New state for button click

  const handleClick = () => {
    setButtonClicked(!buttonClicked);  // Toggle the state to refetch the image
    setLoading(true);  // Reset loading state on button click
    setError(null);    // Reset error state on button click
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=q1f9Bgh37BBtDLDYCoweoIKgnT6NNxuMn0m3o8zL');
        const data = await response.json();
        setImageData(data);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [buttonClicked]);  // This effect runs every time the button is clicked

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>Astronomy Picture of the Day</h1>
      <h2>{imageData.title}</h2>
      <img src={imageData.url} alt={imageData.title} />
      <p>{imageData.explanation}</p>

      {/* Button to fetch a new image */}
      <button onClick={handleClick}>Get New Picture</button>
    </div>
  );
};
export default AstronomyPicture;
