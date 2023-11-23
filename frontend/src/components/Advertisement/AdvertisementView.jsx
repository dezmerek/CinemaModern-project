import React from 'react';
import { Link } from 'react-router-dom';

import '../../Styles/components/_Advertisement.scss';
import AdvertisementImage from '../../assets/images/advertisement-image.png';

const AdvertisementView = () => {
  return (
    <div className="advertisement">
      <div className="advertisement__container">
        <div>
          <h1>OH!</h1>
          <h3>Zyskaj więcej dzięki karcie Cinema Club</h3>
          <h2>Dołącz do naszego programu lojalnościowego</h2>

          <Link to="/">
            <button type="button">Czytaj więcej</button>
          </Link>
        </div>
        <img src={AdvertisementImage} alt="advertisement" />
      </div>
    </div>
  );
};

export default AdvertisementView;
