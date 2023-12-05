// Seat.js
import React from 'react';

const Seat = ({ seat, row, seatNumber, onSeatClick }) => {
  const handleClick = () => {
    onSeatClick(row, seatNumber);
  };

  return (
    <div
      className={`seat ${seat.isActive ? 'active' : 'inactive'}`}
      onClick={handleClick}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;
