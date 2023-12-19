import React from 'react';
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { BsBoxArrowInLeft } from 'react-icons/bs';

const Sidebar = ({ isOpen, menuItems }) => {
  return (
    <div className={`navbar-sidebar ${isOpen ? 'is-open' : ''}`}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <Link className="navbar-sidebar__my-account" to="/moje-ekino">
        Moje e-kino
        <BsBoxArrowInLeft className="arrow-icon" />
      </Link>
      <div className="navbar-sidebar__menu">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
