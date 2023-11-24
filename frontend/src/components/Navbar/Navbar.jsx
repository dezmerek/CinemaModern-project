import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/components/_Navbar.scss';
import logo from '../../assets/images/logo.png';
import { BsSearch, BsBoxArrowInLeft } from 'react-icons/bs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuData = [
    { name: 'Kup Bilet', link: '/kup-bilet' },
    { name: 'Repertuar', link: '/repertuar' },
    { name: 'Cennik', link: '/cennik' },
    { name: 'O nas', link: '/o-nas' },
  ];

  const menuItems = menuData.map((item, index) => (
    <Link key={index} to={item.link}>
      {item.name}
    </Link>
  ));

  return (
    <div className="navbar-home">
      <div className="navbar-home__container">
        <div className="logo-menu-container">
          <img src={logo} alt="logo" />
          <div className="navbar-home__menu">{menuItems}</div>
        </div>
        <div className="search-container">
          <div className="search-content">
            <input
              type="text"
              placeholder="Szukaj..."
              className="search-input"
            />
            <BsSearch />
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
      </div>
    </div>
  );
};

export default Navbar;
