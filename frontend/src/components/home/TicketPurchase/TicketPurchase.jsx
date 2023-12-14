import React, { useState, useEffect, useMemo } from 'react';
import header from '../../../assets/images/header_3.png';
import '../../../Styles/layout/_Reservation.scss';
import { useParams, Link } from 'react-router-dom';

import SeatLegend from './SeatLegend';

const TicketPurchase = () => {
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [reservationId, setReservationId] = useState(null);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    repeatEmail: '',
    phone: '',
  });
  const [consents, setConsents] = useState({
    marketing: false,
    electronicCommunication: false,
  });
  const [showPersonalDataForm, setShowPersonalDataForm] = useState(false);

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

  const handleApplyVoucher = () => {
    const voucherCodeToDiscountMapping = {
      test: 10,
    };

    const discountPercentage = voucherCodeToDiscountMapping[voucherCode];

    if (discountPercentage !== undefined) {
      const updatedSelectedSeats = selectedSeats.map((seat) => ({
        ...seat,
        price: seat.price - (seat.price * discountPercentage) / 100,
      }));

      setVoucherDiscount(discountPercentage);
      setSelectedSeats(updatedSelectedSeats);

      setIsVoucherApplied(true);
    } else {
      console.error('Invalid voucher code');
    }
  };

  const handleRemoveVoucher = () => {
    const updatedSelectedSeats = selectedSeats.map((seat) => ({
      ...seat,
      price: ticketPrices[seat.ticketType],
    }));

    setVoucherDiscount(0);
    setVoucherCode('');
    setIsVoucherApplied(false);
    setSelectedSeats(updatedSelectedSeats);
  };
  const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);

  const ticketPrices = {
    ulgowy: 20,
    normalny: 25,
    'karta dużej rodziny normalny': 20,
    'karta dużej rodziny ulgowy': 18,
    'kino dla seniorów': 18,
  };

  const seatsArray = useMemo(() => {
    if (!scheduleData) return [];

    const maxRow = Math.max(
      ...scheduleData.clonedHallLayout.map((seat) => seat.row)
    );
    const maxSeat = Math.max(
      ...scheduleData.clonedHallLayout.map((seat) => seat.seat)
    );

    const array = Array.from(Array(maxRow), () => Array(maxSeat).fill(null));

    scheduleData.clonedHallLayout.forEach((seat) => {
      array[seat.row - 1][seat.seat - 1] = seat;
    });

    return array;
  }, [scheduleData]);

  const handleSeatClick = (row, seat) => {
    if (scheduleData) {
      const clickedSeat = scheduleData.clonedHallLayout.find(
        (s) => s.row === row && s.seat === seat
      );

      if (clickedSeat && !clickedSeat.isReserved) {
        const selectedIndex = selectedSeats.findIndex(
          (selectedSeat) =>
            selectedSeat.row === row && selectedSeat.seat === seat
        );

        if (selectedIndex !== -1) {
          const updatedSelectedSeats = [...selectedSeats];
          updatedSelectedSeats.splice(selectedIndex, 1);
          setSelectedSeats(updatedSelectedSeats);
        } else {
          const ticketType = 'normalny';
          const price =
            ticketPrices[ticketType] -
            (ticketPrices[ticketType] * voucherDiscount) / 100;

          setSelectedSeats([
            ...selectedSeats,
            { _id: clickedSeat._id, row, seat, ticketType, price },
          ]);

          console.log('Selected Seat:', {
            _id: clickedSeat._id,
            row,
            seat,
            ticketType,
            price,
          });
        }
      }
    }
  };

  const handleChangeTicketType = (newTicketType, seatIndex) => {
    if (seatIndex !== null) {
      const updatedSelectedSeats = selectedSeats.map((seat, index) => {
        if (index === seatIndex) {
          return {
            ...seat,
            ticketType: newTicketType,
            price:
              ticketPrices[newTicketType] -
              (ticketPrices[newTicketType] * voucherDiscount) / 100,
          };
        }
        return seat;
      });

      setSelectedSeats(updatedSelectedSeats);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setConsents({
      ...consents,
      [name]: checked,
    });
  };

  const handleConfirmSeats = async () => {
    setShowPersonalDataForm(true);
  };

  const handlePaymentTpay = async () => {
    try {
      const responseConfirm = await fetch(
        'http://localhost:3001/api/reservations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            scheduleId: id,
            selectedSeats: selectedSeats.map((seat) => ({
              _id: seat._id,
              row: seat.row,
              seat: seat.seat,
              ticketType: seat.ticketType,
              price: seat.price,
            })),
            voucherCode,
            voucherDiscount,
            totalPrice,
          }),
        }
      );

      if (!responseConfirm.ok) {
        console.error('Error saving reservation:', responseConfirm.statusText);
        return;
      }

      const responseDataConfirm = await responseConfirm.json();
      console.log('Rezerwacja zapisana pomyślnie!', responseDataConfirm);

      setReservationId(responseDataConfirm._id);
    } catch (error) {
      console.error('Error saving reservation:', error);
    }
  };

  useEffect(() => {
    if (reservationId) {
      const initiateTpayPayment = async () => {
        try {
          const response = await fetch(
            'http://localhost:3001/api/payments/create-session-transaction-tpay',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: totalPrice,
                description: scheduleData.movie.title,
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`,
                phone: formData.phone,
                hiddenDescription: reservationId,
                success: `http://localhost:3000/podsumowanie/${reservationId}`,
              }),
            }
          );

          if (!response.ok) {
            console.error(
              'Error initiating tpay payment:',
              response.statusText
            );
            return;
          }

          const responseData = await response.json();
          console.log('Tpay API Response:', responseData);
          console.log(
            'Redirecting to Tpay payment page:',
            responseData.transactionPaymentUrl
          );
          window.location.href = responseData.transactionPaymentUrl;
        } catch (error) {
          console.error('Error initiating Tpay payment:', error);
        }
      };

      initiateTpayPayment();
    }
  }, [reservationId, totalPrice, scheduleData, formData]);

  const handleGoBack = () => {
    setShowPersonalDataForm(false);
  };

  const headerText = showPersonalDataForm ? 'Dane osobiste' : 'Wybierz miejsce';

  return (
    <div className="reservation-ticket">
      <div className="reservation-ticket__container">
        <div className="reservation-ticket__header">
          <img src={header} alt="repertuar" />
          <h2>{headerText}</h2>
        </div>
        {scheduleData && (
          <>
            {!showPersonalDataForm && (
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
                              seat && seat.isActive && seat.isReserved
                                ? 'reserved'
                                : ''
                            } ${
                              seat && seat.isActive && !seat.isReserved
                                ? 'active'
                                : ''
                            } ${
                              seat && !seat.isActive && !seat.isReserved
                                ? 'inactive'
                                : ''
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
                            onClick={() =>
                              seat && handleSeatClick(seat.row, seat.seat)
                            }
                          >
                            {seat &&
                              (seat.isActive || seat.isReserved) &&
                              seat.seat}
                          </div>
                        ))}
                        <div className="seat-layout__row-number">
                          {String.fromCharCode(65 + rowIndex)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!showPersonalDataForm && <SeatLegend />}

            {selectedSeats.length > 0 && !showPersonalDataForm && (
              <div className="selected-seats">
                <h3>Wybrane miejsca</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Rząd</th>
                      <th>Miejsce</th>
                      <th>Typ biletu</th>
                      <th>Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSeats.map((selectedSeat, index) => (
                      <tr key={index}>
                        <td>{selectedSeat.row}</td>
                        <td>{selectedSeat.seat}</td>
                        <td>
                          <select
                            value={selectedSeat.ticketType}
                            onChange={(e) =>
                              handleChangeTicketType(e.target.value, index)
                            }
                          >
                            {Object.keys(ticketPrices).map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>{selectedSeat.price.toFixed(2)} PLN</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="sum-column">
                        Razem:
                      </td>
                      <td>{totalPrice.toFixed(2)} PLN</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="voucher-section">
                  <input
                    type="text"
                    value={voucherCode}
                    placeholder="Masz kupon/voucher? Wpisz jego kod"
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <button
                    onClick={
                      isVoucherApplied
                        ? handleRemoveVoucher
                        : handleApplyVoucher
                    }
                  >
                    {isVoucherApplied ? 'Usuń voucher' : 'Zastosuj voucher'}
                  </button>
                </div>
                <div className="reservation-ticket__btn">
                  {!showPersonalDataForm && (
                    <div className="go-back-button">
                      <Link to="/repertuar">
                        <button>Powrót</button>
                      </Link>
                    </div>
                  )}
                  <button onClick={handleConfirmSeats}>
                    Zatwierdź i podaj dane osobowe
                  </button>
                </div>
              </div>
            )}

            {showPersonalDataForm && (
              <div className="personal-data-form">
                <form>
                  <div className="personal-data-form__content">
                    <div className="personal-data-form__content--name">
                      <div>
                        <label>
                          Imię:
                          <span className="personal-data-form--red">*</span>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Nazwisko:
                          <span className="personal-data-form--red">*</span>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <div className="personal-data-form__content--mail">
                      <div>
                        <label>
                          Email:
                          <span className="personal-data-form--red">*</span>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Powtórz email:
                          <span className="personal-data-form--red">*</span>
                          <input
                            type="email"
                            name="repeatEmail"
                            value={formData.repeatEmail}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <div className="personal-data-form__content--phone">
                      <div>
                        <label>
                          Telefon:
                          <span className="personal-data-form--red">*</span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </label>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="personal-data-form__consent-checkboxes">
                    <p>
                      <span className="personal-data-form--red">*</span>Dane
                      wymagane
                    </p>
                    <label>
                      <input
                        type="checkbox"
                        name="marketing"
                        checked={consents.marketing}
                        onChange={handleConsentChange}
                      />
                      Wyrażam zgodę na przetwarzanie moich danych osobowych w
                      celach marketingowych i reklamowych
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="electronicCommunication"
                        checked={consents.electronicCommunication}
                        onChange={handleConsentChange}
                      />
                      Wyrażam zgodę na otrzymywanie od Cinema informacji
                      handlowych drogą elektroniczną na wskazany numer telefonu
                      i adres email
                    </label>
                  </div>
                </form>
                <div className="personal-data-form__btn">
                  {showPersonalDataForm && (
                    <div className="go-back-button">
                      <button onClick={handleGoBack}>Powrót</button>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      handlePaymentTpay();
                    }}
                  >
                    Przejdź do płatności
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TicketPurchase;
