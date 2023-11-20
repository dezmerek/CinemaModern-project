import React, { useState, useEffect } from 'react';
import HallSelector from './HallSelector';
import '../../../Styles/layout/_HallAdd.scss';
import UniversalAddConfirmation from '../Universal/UniversalAddConfirmation';
const apiUrl = process.env.REACT_APP_API_URL;

const HallAdd = () => {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [bannerName, setBannerName] = useState('');
  const [seatLayout, setSeatLayout] = useState([]);
  const [hallName, setHallName] = useState('');
  const [hallDescription, setHallDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [rows, setRows] = useState(1);
  const [seatsPerRow, setSeatsPerRow] = useState(1);
  const [totalSeats, setTotalSeats] = useState(0);

  useEffect(() => {
    const numberOfActiveSeats = seatLayout.filter(
      (seat) => seat.isActive
    ).length;
    setTotalSeats(numberOfActiveSeats);
  }, [seatLayout]);

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    clearForm();
    window.location.reload();
  };

  const clearForm = () => {
    setSelectedBanner(null);
    setBannerName('');
    setSeatLayout([]);
    setHallName('');
    setHallDescription('');
  };

  const handleBannerChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          if (image.width === 445 && image.height === 333) {
            setSelectedBanner(event.target.result);
            setBannerName(selectedFile);
          } else {
            alert('Obraz sali kinowej musi mieć wymiary 445x333 piksele.');
            setSelectedBanner(null);
            setBannerName('');
          }
        };
      };
      reader.readAsDataURL(selectedFile);
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
    } else {
      updatedSeatLayout.push({ row, seat, isActive: false });
    }

    setSeatLayout(updatedSeatLayout);

    setTimeout(() => {
      const numberOfActiveSeats = updatedSeatLayout.filter(
        (seat) => seat.isActive
      ).length;
      setTotalSeats(numberOfActiveSeats);
    }, 0);
  };

  const handleSaveHall = async (event) => {
    event.preventDefault();
    try {
      if (!hallName || !hallDescription || seatLayout.length === 0) {
        console.error('Enter all required data.');
        return;
      }

      if (!selectedBanner) {
        console.error('Select a file with a banner.');
        return;
      }

      const formData = new FormData();
      formData.append('bannerImage', bannerName);

      const response = await fetch(`${apiUrl}/api/halls/uploadBanner`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Error uploading banner:', await response.text());
        return;
      }

      const responseData = await response.json();
      const newHallData = {
        name: hallName,
        description: hallDescription,
        bannerName: responseData.bannerPath,
        seatLayout: seatLayout.map((seat) => ({
          ...seat,
          isActive: !seat.isActive,
        })),
        rows,
        seatsPerRow,
      };

      const numberOfActiveSeats = newHallData.seatLayout.filter(
        (seat) => seat.isActive
      ).length;

      newHallData.numberOfSeats = numberOfActiveSeats;
      setTotalSeats(numberOfActiveSeats);

      const saveHallResponse = await fetch(`${apiUrl}/api/halls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHallData),
      });

      if (saveHallResponse.ok) {
        setShowConfirmation(true);
        console.log('Hall successfully saved!');
      } else {
        console.error('Error saving the hall:', saveHallResponse.status);
        const errorResponseData = await saveHallResponse.json();
        console.error('Error details:', errorResponseData);
      }
    } catch (error) {
      console.error('Error during hall creation:', error.message);
    }
  };

  return (
    <div>
      <h2>Dodaj salę kinową</h2>
      <form id="hallAddForm" className="hall-add" onSubmit={handleSaveHall}>
        <div className="hall-add__container">
          <div className="hall-add__banner">
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              onChange={handleBannerChange}
              required
            />
            {selectedBanner && <img src={selectedBanner} alt="Preview" />}
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
          rows={rows}
          seatsPerRow={seatsPerRow}
          setRows={setRows}
          setSeatsPerRow={setSeatsPerRow}
          seatLayout={seatLayout}
          setSeatLayout={setSeatLayout}
          onSelectSeats={handleSeatSelection}
        />

        <div>Liczba miejsc: {totalSeats}</div>

        <button className="hall-add__btn-save" type="submit">
          Zapisz sale
        </button>
      </form>
      {showConfirmation && (
        <UniversalAddConfirmation
          onClose={handleConfirmationClose}
          confirmationText="Sala kinowa została pomyślnie zapisana!"
        />
      )}
    </div>
  );
};

export default HallAdd;
