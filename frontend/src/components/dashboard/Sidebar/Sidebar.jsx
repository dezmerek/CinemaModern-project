import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menuItemsData from './SidebarItems';
import '../../../Styles/components/_Sidebar.scss';
import logo from '../../../assets/images/logo.png';
import avatar from '../../../assets/images/avatar.png';

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isHamburgerActive, setHamburgerActive] = useState(false);
  const [menuItems, setMenuItems] = useState(menuItemsData);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setHamburgerActive(!isHamburgerActive);
  };

  const toggleSubmenu = (index) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].isExpanded = !updatedMenuItems[index].isExpanded;
    setMenuItems(updatedMenuItems);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">
          <img src={logo} alt="logo" />
        </div>
        <div
          className={`navbar__toggle ${isHamburgerActive ? 'is-active' : ''}`}
          onClick={toggleSidebar}
        >
          <div className="hamburger">
            <span></span>
          </div>
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'is-active' : ''}`}>
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
        <div className="sidebar__menu">
          {menuItems.map((item, index) => (
            <div className="sidebar__menu--links" key={index}>
              {item.submenu ? (
                <div
                  className={`sidebar__submenu ${
                    item.isExpanded ? 'is-expanded' : ''
                  }`}
                >
                  <p
                    onClick={() => toggleSubmenu(index)}
                    className={location.pathname === item.link ? 'active' : ''}
                  >
                    {item.icon} {item.name}
                  </p>
                  {item.isExpanded && (
                    <div className="sidebar__submenu--links">
                      {item.submenu.map((subitem, subindex) => (
                        <Link
                          to={subitem.link}
                          key={subindex}
                          className={
                            location.pathname === subitem.link ? 'active' : ''
                          }
                        >
                          {subitem.icon} {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.link}
                  key={index}
                  className={location.pathname === item.link ? 'active' : ''}
                >
                  {item.icon} {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
