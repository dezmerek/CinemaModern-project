import React from 'react';
import '../../Styles/components/_Banner.scss';
import { BsStar, BsPlay } from 'react-icons/bs';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__container">
        <img
          src={`${process.env.REACT_APP_API_URL}/images/adsBanners/banner-cat.png`}
          alt="banners"
        />
        <div className="banner__content">
          <div className="banner__genre">
            <div>Animacja</div>
            <div>Komedia</div>
            <div>Przygodowy</div>
          </div>
          <h1>Kot w butach: Ostatnie życzenie</h1>
          <p>
            Kot w Butach wyrusza w podróż, aby odnaleźć mityczne "ostatnie
            życzenie", dzięki któremu odzyska swoje dziewięć żyć.
          </p>
          <div className="banner__info">
            <h4>
              <BsStar />
              7.8
            </h4>
            <h4>2023</h4>
            <h4>100 min</h4>
          </div>
          <div className="banner__buttons">
            <button>Szczegóły</button>
            <button>
              <BsPlay />
              Zwiastun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
