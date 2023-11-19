import React, { useState, useEffect } from 'react';
import '../../../Styles/layout/_HallSelector.scss';

const HallSelector = ({ onSelectSeats, seatLayout, setSeatLayout }) => {
  const [rows, setRows] = useState(1);
  const [seatsPerRow, setSeatsPerRow] = useState(1);

  useEffect(() => {
    const generateDefaultSeatLayout = () => {
      const defaultSeatLayout = [];
      for (let row = 1; row <= rows; row++) {
        for (let seat = 1; seat <= seatsPerRow; seat++) {
          defaultSeatLayout.push({ row, seat, isActive: true });
        }
      }
      setSeatLayout(defaultSeatLayout);
    };

    generateDefaultSeatLayout();
  }, [rows, seatsPerRow, setSeatLayout]);

  const handleRowsChange = (event) => {
    setRows(Number(event.target.value));
  };

  const handleSeatsPerRowChange = (event) => {
    setSeatsPerRow(Number(event.target.value));
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
      // Jeśli miejsce nie istnieje, dodaj je z aktywnością false (nieaktywne)
      updatedSeatLayout.push({ row, seat, isActive: false });
      console.log(`Seat at row ${row}, seat ${seat} added. Active: false`);
    }

    setSeatLayout(updatedSeatLayout);
  };

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
        <div className="hall-selector__seats-grid">
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className="hall-selector__seat-row">
              {[...Array(seatsPerRow)].map((_, seatIndex) => {
                const seatNumber = seatIndex + 1;
                const isSeatActive = seatLayout.some(
                  (s) =>
                    s.row === rowIndex + 1 &&
                    s.seat === seatNumber &&
                    s.isActive
                );

                return (
                  <div
                    key={seatIndex}
                    className={`hall-selector__seat ${
                      isSeatActive ? 'active' : 'inactive'
                    }`}
                    onClick={() =>
                      handleSeatSelection(rowIndex + 1, seatNumber)
                    }
                  >
                    {seatNumber}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HallSelector;
