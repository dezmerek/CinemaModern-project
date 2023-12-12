import React, { useState } from 'react';
import '../../../Styles/components/_SeatLayout.scss';
import SeatLegend from './SeatLegend.jsx';
import SelectedTickets from './SelectedTickets.jsx';

const SeatLayout = ({ seatData, onSeatClick }) => {
  const maxRow = Math.max(...seatData.map((seat) => seat.row));
  const maxSeat = Math.max(...seatData.map((seat) => seat.seat));

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTicketTypes, setSelectedTicketTypes] = useState({});

  const seatsArray = Array.from(Array(maxRow), () => Array(maxSeat).fill(null));

  seatData.forEach((seat) => {
    seatsArray[seat.row - 1][seat.seat - 1] = seat;
  });

  const handleTicketTypeChange = (seat, ticketType) => {
    setSelectedTicketTypes((prevTypes) => ({
      ...prevTypes,
      [`${seat.row}-${seat.seat}`]: ticketType,
    }));
  };

  const handleClick = (seat) => {
    if (!seat.isReserved) {
      const isSelected = selectedSeats.some(
        (selectedSeat) =>
          selectedSeat.row === seat.row && selectedSeat.seat === seat.seat
      );

      console.log(`Row: ${seat.row} Seat: ${seat.seat} (${seat._id})`);

      if (isSelected) {
        // Odznacz miejsce
        const updatedSelectedSeats = selectedSeats.filter(
          (selectedSeat) =>
            !(selectedSeat.row === seat.row && selectedSeat.seat === seat.seat)
        );
        setSelectedSeats(updatedSelectedSeats);

        const { [`${seat.row}-${seat.seat}`]: removedTicketType, ...rest } =
          selectedTicketTypes;
        setSelectedTicketTypes(rest);
      } else {
        setSelectedSeats([...selectedSeats, seat]);

        setSelectedTicketTypes((prevTypes) => ({
          ...prevTypes,
          [`${seat.row}-${seat.seat}`]: 'NORMAL',
        }));
      }

      onSeatClick(seat.row, seat.seat, seat._id);
    }
  };

  return (
    <>
      <div className="seat-layout__screen">EKRAN</div>
      <div className="seat-layout-container">
        <div className="seat-layout">
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
      </div>
      <SeatLegend />
      {selectedSeats.length > 0 && (
        <SelectedTickets
          selectedSeats={selectedSeats}
          onTicketTypeChange={handleTicketTypeChange}
          selectedTicketTypes={selectedTicketTypes}
        />
      )}
    </>
  );
};
export default SeatLayout;
