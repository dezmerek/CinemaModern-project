import React, { useState } from 'react';
import '../../../Styles/layout/_HallSelector.scss';

const HallSelector = ({ onSelectSeats }) => {
  const [rows, setRows] = useState(1);
  const [seatsPerRow, setSeatsPerRow] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleRowsChange = (event) => {
    setRows(Number(event.target.value));
    setSelectedSeats([]);
  };

  const handleSeatsPerRowChange = (event) => {
    setSeatsPerRow(Number(event.target.value));
    setSelectedSeats([]);
  };

  const handleSeatSelection = (row, seat) => {
    const seatIdentifier = `${row}-${seat}`;
    if (selectedSeats.includes(seatIdentifier)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seatIdentifier)
      );
    } else {
      setSelectedSeats([...selectedSeats, seatIdentifier]);
    }
  };

  const totalSeats = rows * seatsPerRow;
  const availableSeats = totalSeats - selectedSeats.length;

  return (
    <div className="hall-selector">
      <h3>Wybierz układ miejsc</h3>
      <div className="hall-selector__settings">
        <label>
          Ilość rzędów:
          <input
            type="number"
            min="1"
            value={rows}
            onChange={handleRowsChange}
          />
        </label>

        <label>
          Miejsc w rzędzie:
          <input
            type="number"
            min="1"
            value={seatsPerRow}
            onChange={handleSeatsPerRowChange}
          />
        </label>
      </div>

      <div>
        <h4>Wybierz miejsca:</h4>
        <p>Liczba dostępnych miejsc: {availableSeats}</p>
        <div className="hall-selector__seats-grid">
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className="hall-selector__seat-row">
              <div className="hall-selector__seat-number">{rowIndex + 1}</div>
              {[...Array(seatsPerRow)].map((_, seatIndex) => {
                const seatNumber = seatIndex + 1;
                const seatIdentifier = `${rowIndex + 1}-${seatNumber}`;
                const isSeatSelected = selectedSeats.includes(seatIdentifier);
                return (
                  <div
                    key={seatIndex}
                    className={`hall-selector__seat ${
                      isSeatSelected ? 'selected' : ''
                    }`}
                    onClick={() =>
                      handleSeatSelection(rowIndex + 1, seatNumber)
                    }
                  >
                    {isSeatSelected ? '' : seatNumber}
                  </div>
                );
              })}
              <div className="hall-selector__seat-number">{rowIndex + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HallSelector;
