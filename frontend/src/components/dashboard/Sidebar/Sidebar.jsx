import React from 'react';
import { Link } from 'react-router-dom';
import menuItems from './SidebarItems';
import '../../../Styles/components/_Sidebar.scss';
import logo from '../../../assets/images/logo.png';
import avatar from '../../../assets/images/avatar.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="profile">
        <img src={avatar} alt="avatar" />
        <div className="profile__info">
          <p className="profile__info-role">Admin</p>
          <p>Jan Kowalski</p>
        </div>
      </div>
      <div className="menu">
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index}>
            {item.icon} {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
