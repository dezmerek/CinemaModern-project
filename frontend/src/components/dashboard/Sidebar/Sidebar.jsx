import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../home/Auth/AuthContext';
import menuItemsData from './SidebarItems';
import '../../../Styles/components/_Sidebar.scss';
import logo from '../../../assets/images/logo_dashboard.png';

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isHamburgerActive, setHamburgerActive] = useState(false);
  const [menuItems, setMenuItems] = useState(menuItemsData);
  const { user, setUser } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setHamburgerActive(!isHamburgerActive);
  };

  const toggleSubmenu = (index) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].isExpanded = !updatedMenuItems[index].isExpanded;
    setMenuItems(updatedMenuItems);
  };

  const handleLogout = () => {
    setUser(null);
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
          <Link to="/dashboard">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="profile">
          <img src={user ? user.picture : ''} alt="avatar" />
          <div className="profile__info">
            <p className="profile__info-role">{user ? user.role : ''}</p>
            <p>{user ? user.displayName : ''}</p>
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
          <div className="sidebar__menu__buttons">
            <div className="sidebar__menu--home">
              <Link to="/">
                <button>Strona Główna</button>
              </Link>
            </div>
            <div className="sidebar__menu--logout">
              <button onClick={handleLogout}>Wyloguj się</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
