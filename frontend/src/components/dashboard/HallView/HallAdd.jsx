import React, { useState } from 'react';
import HallSelector from './HallSelector';
import '../../../Styles/layout/_HallAdd.scss';

const HallAdd = () => {
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleBannerChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);
      image.onload = () => {
        if (image.width === 445 && image.height === 333) {
          reader.onload = (event) => {
            setSelectedBanner(event.target.result);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          alert('Obraz baneru musi mieć wymiary 445x333 pikseli.');
          event.target.value = '';
        }
      };
    }
  };

  return (
    <div>
      <h2>Dodaj salę kinową</h2>
      <form id="hallAddForm" className="hall-add">
        <div className="hall-add__container">
          <div className="hall-add__banner">
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              onChange={handleBannerChange}
              required
            />
            {selectedBanner && (
              <img src={selectedBanner} alt="Podgląd obrazu" />
            )}
            {!selectedBanner && (
              <label>
                Dodaj baner<br></br>(445 x 333)
              </label>
            )}
          </div>

          <div className="hall-add__content">
            <input type="text" placeholder="Nazwa sali" required />
            <textarea
              type="text"
              name="description"
              placeholder="Opis"
              required
            ></textarea>
          </div>
        </div>
        <HallSelector />
      </form>
    </div>
  );
};

export default HallAdd;
