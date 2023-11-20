import React from 'react';
import '../../../Styles/components/_HallLayout.scss';

const HallLayout = ({ seatLayout }) => {
  const maxRow = Math.max(...seatLayout.map((seat) => seat.row));
  const maxSeat = Math.max(...seatLayout.map((seat) => seat.seat));

  const seatsArray = Array.from(Array(maxRow), () => Array(maxSeat).fill(null));

  seatLayout.forEach((seat) => {
    seatsArray[seat.row - 1][seat.seat - 1] = seat.isActive
      ? 'active'
      : 'inactive';
  });

  return (
    <div className="hall-layout">
      {seatsArray.map((row, rowIndex) => (
        <div key={rowIndex} className="hall-layout__row">
          <div className="hall-layout__row-number">{rowIndex + 1}</div>

          {row.map((seatStatus, seatIndex) => (
            <div
              key={seatIndex}
              className={`hall-layout__seat hall-layout__seat--${seatStatus}`}
            >
              {seatIndex + 1}
            </div>
          ))}

          <div className="hall-layout__row-number">{rowIndex + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default HallLayout;
