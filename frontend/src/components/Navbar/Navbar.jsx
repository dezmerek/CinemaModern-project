import React, { useState } from 'react';
import './Navbar.css';
import { FiSearch } from 'react-icons/fi';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);

    const films = localStorage.getItem('films');
    let allMovies = [];

    if (films) {
      allMovies = JSON.parse(films);
    }

    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredMovies(filtered);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar__logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="navbar__links">
          <li>
            <Link to="/kup-bilet">Kup Bilet</Link>
          </li>
          <li>
            <Link to="/repertuar">Repertuar</Link>
          </li>
          <li>
            <Link to="/cennik">Cennik</Link>
          </li>
          <li>
            <Link to="/o-nas">O nas</Link>
          </li>
        </ul>
        <div className="navbar__search">
          <input
            type="text"
            placeholder="Wyszukaj..."
            value={searchInput}
            onChange={handleInputChange}
          />
          <FiSearch className="search-icon" />
        </div>
        <div className="navbar__my-account">
          <a href="/moje-ekino">Moje e-kino</a>
          <BsBoxArrowInLeft className="arrow-icon" />
        </div>
      </nav>
      {filteredMovies.length > 0 && (
        <div className="filtered-movies">
          <h3>Filmy:</h3>
          <ul>
            {filteredMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
