import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../../Styles/layout/_BannerAdd.scss';

const BannerAdd = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`${apiUrl}/api/movies`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, [apiUrl]);

  const handleSelectChange = (selectedOption) => {
    setSelectedMovie(selectedOption);
  };

  const options = movies.map((movie) => ({
    value: movie._id,
    label: movie.title,
  }));

  return (
    <>
      <h2>Dodaj banner reklamowy</h2>

      <div className="banner-ad">
        <form>
          <div className="form-group">
            <label htmlFor="movieSelect">Wybierz film:</label>
            <Select
              id="movieSelect"
              name="movie"
              value={selectedMovie}
              onChange={handleSelectChange}
              options={options}
              isSearchable
              placeholder="Wybierz film"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default BannerAdd;
