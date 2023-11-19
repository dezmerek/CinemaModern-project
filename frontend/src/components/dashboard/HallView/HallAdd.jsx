import React, { useState } from 'react';
import HallSelector from './HallSelector';
import '../../../Styles/layout/_HallAdd.scss';
const apiUrl = process.env.REACT_APP_API_URL;

const HallAdd = () => {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [seatLayout, setSeatLayout] = useState([]);
  const [hallName, setHallName] = useState('');
  const [hallDescription, setHallDescription] = useState('');
  const [bannerName, setBannerName] = useState('');

  const handleBannerChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);
      image.onload = () => {
        if (image.width === 445 && image.height === 333) {
          const bannerFileName = selectedFile.name;
          setBannerName(bannerFileName);

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

  const handleSeatSelection = (row, seat) => {
    const updatedSeatLayout = [...seatLayout];
    const seatIndex = updatedSeatLayout.findIndex(
      (s) => s.row === row && s.seat === seat
    );

    if (seatIndex !== -1) {
      updatedSeatLayout[seatIndex].isActive =
        !updatedSeatLayout[seatIndex].isActive;
      console.log(
        `Seat at row ${row}, seat ${seat} toggled. Active: ${updatedSeatLayout[seatIndex].isActive}`
      );
    } else {
      updatedSeatLayout.push({ row, seat, isActive: false });
      console.log(`Seat at row ${row}, seat ${seat} added. Active: false`);
    }

    setSeatLayout(updatedSeatLayout);
  };

  const handleSaveHall = async () => {
    const newHallData = {
      name: hallName,
      description: hallDescription,
      bannerName: bannerName,
      seatLayout: seatLayout.map((seat) => ({
        ...seat,
        isActive: !seat.isActive,
      })),
    };

    try {
      const response = await fetch(`${apiUrl}/api/halls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHallData),
      });

      if (response.ok) {
        console.log('Sala została pomyślnie zapisana!');
      } else {
        console.error('Błąd podczas zapisywania sali:', response.status);
      }
    } catch (error) {
      console.error('Błąd podczas zapisywania sali:', error.message);
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
            <input
              type="text"
              placeholder="Nazwa sali"
              value={hallName}
              onChange={(e) => setHallName(e.target.value)}
              required
            />
            <textarea
              type="text"
              name="description"
              placeholder="Opis"
              value={hallDescription}
              onChange={(e) => setHallDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <HallSelector
          seatLayout={seatLayout}
          setSeatLayout={setSeatLayout}
          onSelectSeats={handleSeatSelection}
        />

        <button type="button" onClick={handleSaveHall}>
          Zapisz salę
        </button>
      </form>
    </div>
  );
};

export default HallAdd;
