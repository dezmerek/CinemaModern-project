import React from 'react';
import header from '../../../assets/images/header_3.png';
import '../../../Styles/layout/_Reservation.scss';

const Reservation = () => {
  return (
    <div className="reservation-ticket">
      <div className="reservation-ticket__container">
        <div className="reservation-ticket__header">
          <img src={header} alt="repertuar" />
          <h2>Wybierz miejsce</h2>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
