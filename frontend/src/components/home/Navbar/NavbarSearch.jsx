import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../../Styles/components/__NavbarSearch.scss';

const NavbarSearch = ({ apiUrl, onCloseSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef(null);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      const response = await fetch(
        `${apiUrl}/api/movies/search/?title=${term}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Błąd pobierania wyników wyszukiwania:', error);
    }
  };

  const searchResultItems = searchResults.map((item) => (
    <Link
      key={item._id}
      to={`/movie/${item._id}`}
      className="search-result-item"
    >
      {item.title}
    </Link>
  ));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        onCloseSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCloseSearch]);

  return (
    <div className="search-content-2" ref={searchContainerRef}>
      <div className="search-input-container2">
        <input
          type="text"
          placeholder="Szukaj..."
          className="search-input2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {searchTerm && (
        <div className="navbar-home__search-results2">{searchResultItems}</div>
      )}
    </div>
  );
};

export default NavbarSearch;
