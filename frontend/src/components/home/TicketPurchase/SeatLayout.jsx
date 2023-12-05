// _SeatLayout.js
import React, { useState } from 'react';
import '../../../Styles/components/_SeatLayout.scss';
import SeatLegend from './SeatLegend.jsx';

const SeatLayout = ({ seatData, onSeatClick }) => {
  const maxRow = Math.max(...seatData.map((seat) => seat.row));
  const maxSeat = Math.max(...seatData.map((seat) => seat.seat));

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatsArray = Array.from(Array(maxRow), () => Array(maxSeat).fill(null));

  seatData.forEach((seat) => {
    seatsArray[seat.row - 1][seat.seat - 1] = seat;
  });

  const handleClick = (seat) => {
    if (!seat.isReserved) {
      const isSelected = selectedSeats.some(
        (selectedSeat) =>
          selectedSeat.row === seat.row && selectedSeat.seat === seat.seat
      );

      if (isSelected) {
        // Odznacz miejsce
        const updatedSelectedSeats = selectedSeats.filter(
          (selectedSeat) =>
            !(selectedSeat.row === seat.row && selectedSeat.seat === seat.seat)
        );
        setSelectedSeats(updatedSelectedSeats);
      } else {
        // Zaznacz miejsce
        setSelectedSeats([...selectedSeats, seat]);
      }

      onSeatClick(seat.row, seat.seat);
    }
  };

  return (
    <>
      <div className="seat-layout">
        <div className="seat-layout__screen">EKRAN</div>
        {seatsArray.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-layout__row">
            <div className="seat-layout__row-number">
              {String.fromCharCode(65 + rowIndex)}
            </div>

            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat-layout__seat ${
                  seat && seat.isActive
                    ? 'active'
                    : seat && seat.isReserved
                    ? 'reserved'
                    : 'inactive'
                } ${
                  seat &&
                  selectedSeats.some(
                    (selectedSeat) =>
                      selectedSeat.row === seat.row &&
                      selectedSeat.seat === seat.seat
                  )
                    ? 'selected'
                    : ''
                }`}
                onClick={() => seat && handleClick(seat)}
              >
                {seat && (seat.isActive || seat.isReserved) ? seat.seat : ''}
              </div>
            ))}

            <div className="seat-layout__row-number">
              {String.fromCharCode(65 + rowIndex)}
            </div>
          </div>
        ))}
      </div>
      <SeatLegend />
    </>
  );
};

export default SeatLayout;
