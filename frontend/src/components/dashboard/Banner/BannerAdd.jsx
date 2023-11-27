import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../../Styles/layout/_BannerAdd.scss';

const BannerAdd = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [adDescription, setAdDescription] = useState('');
  const [adBannerImage, setAdBannerImage] = useState(null);
  const [isAdBanner, setIsAdBanner] = useState(false);
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

  const handleIsAdBannerChange = (event) => {
    setIsAdBanner(event.target.checked);
  };

  const handleAdDescriptionChange = (event) => {
    setAdDescription(event.target.value);
  };

  const handleAdBannerImageChange = (event) => {
    setAdBannerImage(event.target.files[0]);
  };

  const options = movies.map((movie) => ({
    value: movie._id,
    label: movie.title,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedMovie) {
      console.error('Please select a movie');
      return;
    }

    const movieId = selectedMovie.value;

    try {
      const formData = new FormData();
      formData.append('movieId', movieId);
      formData.append('adDescription', adDescription);
      formData.append('adBannerImage', adBannerImage);
      formData.append('isAdBanner', isAdBanner);

      const response = await fetch(`${apiUrl}/api/movies/ad-banners`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add ad banner');
      }

      console.log('Ad banner added successfully');
    } catch (error) {
      console.error('Error adding ad banner:', error);
    }
  };

  return (
    <>
      <h2>Dodaj banner reklamowy</h2>

      <div className="banner-ad">
        <form onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label htmlFor="adDescription">Opis baneru reklamowego:</label>
            <textarea
              id="adDescription"
              name="adDescription"
              value={adDescription}
              onChange={handleAdDescriptionChange}
              placeholder="Wprowadź opis baneru reklamowego"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="adBannerImage">
              Wybierz obrazek baneru reklamowego:
            </label>
            <input
              type="file"
              id="adBannerImage"
              name="adBannerImage"
              accept="image/*"
              onChange={handleAdBannerImageChange}
              required
            />
          </div>

          <label>
            <input
              type="checkbox"
              checked={isAdBanner}
              onChange={handleIsAdBannerChange}
            />
            Czy baner ma być wyświetlany jako reklama?
          </label>

          <button type="submit">Dodaj banner</button>
        </form>
      </div>
    </>
  );
};

export default BannerAdd;
