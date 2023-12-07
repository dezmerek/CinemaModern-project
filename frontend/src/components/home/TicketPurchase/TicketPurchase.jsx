import React, { useState, useEffect } from 'react';
import header from '../../../assets/images/header_3.png';
import '../../../Styles/layout/_Reservation.scss';
import { useParams } from 'react-router-dom';
import SeatLayout from './SeatLayout';
// import { loadStripe } from '@stripe/stripe-js';

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

  /*   const handlePaymentStripe = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    const response = await fetch(
      'http://localhost:3001/api/payments/create-session-transaction-stripe',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }),
      }
    );

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  }; */

  const handlePaymentTpay = async () => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/payments/create-session-transaction-tpay',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 1000,
            crc: 1224,
            description: 'test',
            email: 'jan.kowalski@example.com',
            name: 'Jan Kowalski',
            phone: '00123456',
          }),
        }
      );

      if (!response.ok) {
        console.error('Error initiating tpay payment:', response.statusText);
        return;
      }

      const responseData = await response.json();

      window.location.href = responseData.payment_url;
    } catch (error) {
      console.error('Error initiating tpay payment:', error);
    }
  };

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
      <button onClick={handlePaymentTpay}>Przejdź do płatności</button>
    </div>
  );
};

export default TicketPurchase;
