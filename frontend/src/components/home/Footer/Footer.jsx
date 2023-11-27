import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import '../../../Styles/components/_Footer.scss';
import { BsArrowUp } from 'react-icons/bs';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
    console.log('test');
  };

  return (
    <div className="footer">
      <div className="footer__container">
        <img src={logo} alt="logo" />
        <div>
          <Link to="/regulamin">Regulamin</Link>
          <Link to="/polityka-prywatnosci">Polityka Prywatności</Link>
          <button>
            <BsArrowUp onClick={scrollToTop} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
