import React from 'react';
import './../../../Styles/components/_UniversalPreview.scss';

const TicketPreview = ({ ticket, onClose }) => {
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
          {ticket.selectedSeats.map((seat, index) => (
            <li key={index}>{seat}</li>
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
