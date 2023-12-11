import React, { useState, useEffect } from 'react';
import header from '../../../assets/images/header_3.png';
import '../../../Styles/layout/_Reservation.scss';
import { useParams, Link } from 'react-router-dom';
import SeatLayout from './SeatLayout';
import PersonalDataForm from './PersonalDataForm';

const TicketPurchase = () => {
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsSelected, setSeatsSelected] = useState(false);

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

  const handleSeatClick = (row, seat) => {
    // Handle seat click logic
    // For example, you can update the state or perform other actions
    const isSeatSelected = selectedSeats.some(
      (selectedSeat) => selectedSeat.row === row && selectedSeat.seat === seat
    );

    if (isSeatSelected) {
      // Deselect the seat
      const updatedSelectedSeats = selectedSeats.filter(
        (selectedSeat) =>
          !(selectedSeat.row === row && selectedSeat.seat === seat)
      );
      setSelectedSeats(updatedSelectedSeats);
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, { row, seat }]);
    }
  };

  const handleZatwierdzClick = () => {
    // Set the state to indicate that seats have been selected
    setSeatsSelected(true);
  };

  const handleBackToSeatsClick = () => {
    // Set the state to indicate going back to seat selection
    setSeatsSelected(false);
    // Clear the selected seats
    setSelectedSeats([]);
  };

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

  /*   const handlePaymentTpay = async () => {
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
  }; */
  const handlePersonalDataSubmit = (
    formData,
    consentMarketing,
    consentEmail
  ) => {
    // Tutaj możesz wykonać działania z danymi osobowymi, np. przesłać do API
    console.log('Dane osobowe przekazane do TicketPurchase:', formData);
  };

  return (
    <div className="reservation-ticket">
      <div className="reservation-ticket__container">
        <div className="reservation-ticket__header">
          <img src={header} alt="repertuar" />
          <h2>{seatsSelected ? 'Dane osobiste' : 'Wybierz miejsce'}</h2>
        </div>
        <div className="navigation-buttons">
          {!seatsSelected && scheduleData && (
            <>
              <SeatLayout
                seatData={scheduleData.clonedHallLayout}
                onSeatClick={handleSeatClick}
              />
              <div className="reservation-ticket__btn">
                <Link to="/repertuar">
                  <button>Powrót do repertuaru</button>
                </Link>
                {selectedSeats.length > 0 && (
                  <button onClick={handleZatwierdzClick}>
                    Zatwierdź i podaj dane osobowe
                  </button>
                )}
              </div>
            </>
          )}
          {seatsSelected && (
            <PersonalDataForm
              onSubmit={handlePersonalDataSubmit}
              onBackToSeatsClick={handleBackToSeatsClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketPurchase;
