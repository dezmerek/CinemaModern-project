import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch, BsBoxArrowInLeft } from 'react-icons/bs';
import '../../../Styles/components/_Navbar.scss';
import NavbarSearch from './NavbarSearch';
import Sidebar from './Sidebar';
import logo from '../../../assets/images/logo.png';
const apiUrl = process.env.REACT_APP_API_URL;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchContainerRef = useRef(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);

    if (isSearchVisible) {
      setSearchTerm('');
    }
  };

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

  const menuData = [
    { name: 'Strona Główna', link: '/' },
    { name: 'Kup Bilet', link: '/kup-bilet' },
    { name: 'Cennik', link: '/cennik' },
    { name: 'O nas', link: '/o-nas' },
  ];

  const menuItems = menuData.map((item, index) => (
    <Link key={index} to={item.link}>
      {item.name}
    </Link>
  ));

  const searchResultItems = searchResults.map((item) => (
    <Link key={item._id} to={`/movie/${item._id}`}>
      {item.title}
    </Link>
  ));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeSearch = () => {
    setIsSearchVisible(false);
    setSearchTerm('');
  };

  return (
    <div className="navbar-home">
      <div className="navbar-home__container">
        <div className="logo-menu-container">
          <img src={logo} alt="logo" />
          <div className="navbar-home__menu">{menuItems}</div>
        </div>
        <div className="search-container" ref={searchContainerRef}>
          <div className="search-content">
            <input
              type="text"
              placeholder="Szukaj..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <BsSearch onClick={toggleSearch} />
            {searchTerm && windowWidth >= 1024 && (
              <div className="navbar-home__search-results">
                {searchResultItems}
              </div>
            )}
          </div>

          <div
            className={`navbar-home__hamburger ${isOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <Link className="navbar-home__my-account" to="/moje-ekino">
            Moje e-kino
            <BsBoxArrowInLeft className="arrow-icon" />
          </Link>
        </div>
        <Sidebar isOpen={isOpen} menuItems={menuData} />
      </div>
      {isSearchVisible && windowWidth <= 1024 && (
        <NavbarSearch apiUrl={apiUrl} onCloseSearch={closeSearch} />
      )}
    </div>
  );
};

export default Navbar;
