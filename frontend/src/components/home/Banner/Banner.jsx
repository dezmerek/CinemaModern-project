import React, { useState, useEffect } from 'react';
import '../../../Styles/components/_Banner.scss';
import BannerContent from './BannerContent';
const apiUrl = process.env.REACT_APP_API_URL;
const Banner = () => {
  const [adBanners, setAdBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    // Pobierz banery z bazy danych, które mają ustawione isAdBanner na true
    const fetchAdBanners = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/movies/ad-banners`);
        const data = await response.json();
        setAdBanners(data);
      } catch (error) {
        console.error('Error fetching ad banners:', error);
      }
    };

    fetchAdBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((currentBanner + 1) % adBanners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentBanner, adBanners]);

  return (
    <div className="banner">
      <div className="banner__container">
        {adBanners.length > 0 && (
          <>
            <img
              src={`${process.env.REACT_APP_API_URL}/images/adBanners/${adBanners[currentBanner].adBannerImage}`}
              alt="banners"
            />
            <BannerContent {...adBanners[currentBanner]} />
            <div className="banner__dots">
              {adBanners.map((_, index) => (
                <span
                  key={index}
                  className={`banner__dot ${
                    index === currentBanner ? 'active' : ''
                  }`}
                  onClick={() => setCurrentBanner(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
