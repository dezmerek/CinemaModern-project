// TicketPurchase.js
import React, { useState, useEffect } from 'react';
import header from '../../../assets/images/header_3.png';
import '../../../Styles/layout/_Reservation.scss';
import { useParams } from 'react-router-dom';
import SeatLayout from './SeatLayout'; // Import SeatLayout component

const TicketPurchase = () => {
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/schedules/${id}`
        );
        const data = await response.json();
        setScheduleData(data);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchScheduleData();
  }, [id]);

  return (
    <div className="reservation-ticket">
      <div className="reservation-ticket__container">
        <div className="reservation-ticket__header">
          <img src={header} alt="repertuar" />
          <h2>Wybierz miejsce</h2>
        </div>
        {scheduleData && (
          <>
            <SeatLayout
              seatData={scheduleData.clonedHallLayout}
              onSeatClick={(row, seat) => {}}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TicketPurchase;
