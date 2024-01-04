import React, { useEffect, useState } from 'react';
import './../../../Styles/components/_UniversalPreview.scss';

const TicketPreview = ({ ticket, onClose }) => {
  const [seatDetails, setSeatDetails] = useState([]);

  useEffect(() => {
    const fetchSeatDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/schedules/${ticket.scheduleId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch seat details');
        }

        const scheduleData = await response.json();
        const selectedSeatsDetails = ticket.selectedSeats.map((seatId) =>
          scheduleData.clonedHallLayout.find((seat) => seat._id === seatId)
        );
        setSeatDetails(selectedSeatsDetails);
      } catch (error) {
        console.error('Error fetching seat details:', error);
      }
    };

    fetchSeatDetails();
  }, [ticket.scheduleId, ticket.selectedSeats]);

  return (
    <div className="universal-preview">
      <div className="universal-preview__content">
        <h3>Podgląd biletu</h3>
        <p>ID: {ticket._id}</p>
        <p>Email: {ticket.customerEmail}</p>
        <p>Film: {ticket.movieName}</p>
        <p>Koszt biletów: {ticket.totalPrice}</p>
        <p>Data zakupu: {ticket.createdAt}</p>
        <p>Voucher kod: {ticket.voucherCode}</p>
        <p>Wybrane miejsca:</p>
        <ul>
          {seatDetails.map((seat, index) => (
            <li key={index}>
              {seat
                ? `Miejsce: ${seat.seat}, Rząd: ${seat.row}, Typ biletu: ${seat.ticketType}`
                : 'Informacje o miejscu niedostępne'}
            </li>
          ))}
        </ul>
        <button className="universal-preview__btn--close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default TicketPreview;
