import React, { useState, useEffect } from 'react';
import '../../../Styles/components/_Banner.scss';
import TrailerPlayer from '../MovieRecommended/TrailerPlayer';
import BannerContent from './BannerContent';
const apiUrl = process.env.REACT_APP_API_URL;

const Banner = () => {
  const [adBanners, setAdBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const fetchAdBanners = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/movies/ad-banners`);
        const data = await response.json();

        const adBannersWithDefaultRating = data.map((adBanner) => ({
          ...adBanner,
          averageRating:
            adBanner.averageRating !== null &&
            adBanner.averageRating !== undefined
              ? adBanner.averageRating
              : 0,
        }));

        setAdBanners(adBannersWithDefaultRating);
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

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleTrailerClick = () => {
    setIsTrailerOpen(true);
  };

  return (
    <div className="banner">
      <div className="banner__container">
        {adBanners.length > 0 && (
          <>
            <img
              src={`${process.env.REACT_APP_API_URL}/images/adBanners/${adBanners[currentBanner].adBannerImage}`}
              alt="banners"
            />
            <BannerContent
              {...adBanners[currentBanner]}
              averageRating={adBanners[currentBanner].averageRating}
              handleTrailerClick={handleTrailerClick}
              _id={adBanners[currentBanner]._id}
            />
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
      {isTrailerOpen && (
        <TrailerPlayer
          movieId={adBanners[currentBanner]._id}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </div>
  );
};

export default Banner;
