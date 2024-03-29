import React, { useState, useEffect, useMemo } from 'react';
import header from '../../../assets/images/header_3.png';
import '../../../Styles/layout/_Reservation.scss';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import SeatLegend from './SeatLegend';

const TicketPurchase = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [scheduleData, setScheduleData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [reservationId, setReservationId] = useState(null);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [voucherError, setVoucherError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
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
  const [consentError, setConsentError] = useState(null);

  useEffect(() => {
    if (scheduleData && scheduleData.movie) {
      document.title = `CinemaModern - ${scheduleData.movie.title}`;
    }
  }, [scheduleData]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/schedules/${id}`
        );
        const data = await response.json();
        setScheduleData(data);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchScheduleData();
  }, [id]);

  const handleApplyVoucher = async () => {
    try {
      setVoucherError(null);

      const responseVouchers = await fetch(`${apiUrl}/api/vouchers`);
      if (!responseVouchers.ok) {
        throw new Error(`Failed to fetch vouchers: ${responseVouchers.status}`);
      }
      const vouchersData = await responseVouchers.json();

      const voucher = vouchersData.find((v) => v.code === voucherCode);

      if (voucher) {
        const updatedSelectedSeats = selectedSeats.map((seat) => ({
          ...seat,
          price: seat.price - (seat.price * voucher.discountValue) / 100,
        }));

        setVoucherDiscount(voucher.discountValue);
        setSelectedSeats(updatedSelectedSeats);
        setIsVoucherApplied(true);
      } else {
        setVoucherError('Nieprawidłowy kod vouchera');
        console.error('Invalid voucher code');
      }
    } catch (error) {
      console.error('Error applying voucher:', error.message);
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

    setConsentError(null);
  };

  const isConsentsGiven =
    consents.marketing && consents.electronicCommunication;

  const handleConfirmSeats = async () => {
    setShowPersonalDataForm(true);
  };

  const { user: loggedInUser } = useAuth();
  console.log('loggedInUser:', loggedInUser);
  const userId = loggedInUser ? loggedInUser._id : null;
  console.log('userId:', userId);

  const handlePaymentTpay = async () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        const responseConfirm = await fetch(
          `${process.env.REACT_APP_API_URL}/api/reservations`,
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
              userId: userId,
            }),
          }
        );

        if (!responseConfirm.ok) {
          console.error(
            'Error saving reservation:',
            responseConfirm.statusText
          );
          return;
        }

        const responseDataConfirm = await responseConfirm.json();
        console.log('Rezerwacja zapisana pomyślnie!', responseDataConfirm);

        setReservationId(responseDataConfirm._id);
      } catch (error) {
        console.error('Error initiating Tpay payment:', error);
      }
    }
  };

  useEffect(() => {
    if (reservationId) {
      const initiateTpayPayment = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/payments/create-session-transaction-tpay`,
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
                success: `${process.env.REACT_APP_API_URL_SUCCESS}/podsumowanie/${reservationId}`,
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

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'Pole Imię jest wymagane.';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Pole Nazwisko jest wymagane.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Pole Email jest wymagane.';
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = 'Podaj poprawny adres email.';
    }

    if (!formData.repeatEmail.trim()) {
      errors.repeatEmail = 'Pole Powtórz email jest wymagane.';
    } else if (formData.repeatEmail !== formData.email) {
      errors.repeatEmail = 'Adresy email nie są identyczne.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Pole Telefon jest wymagane.';
    } else if (!/^\d{9}$/.test(formData.phone)) {
      errors.phone = 'Numer telefonu musi składać się z 9 cyfr.';
    }

    if (!consents.marketing || !consents.electronicCommunication) {
      errors.consents = 'Proszę udzielić obu zgód przed przejściem dalej.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
                  <div>
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
                  <div>
                    {voucherError && (
                      <div className="voucher-error">{voucherError}</div>
                    )}
                  </div>
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
                          {formErrors.firstName && (
                            <div className="error-message">
                              {formErrors.firstName}
                            </div>
                          )}
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
                          {formErrors.lastName && (
                            <div className="error-message">
                              {formErrors.lastName}
                            </div>
                          )}
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
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            onChange={handleInputChange}
                            required
                          />
                          {formErrors.email && (
                            <div className="error-message">
                              {formErrors.email}
                            </div>
                          )}
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
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            onChange={handleInputChange}
                            required
                          />
                          {formErrors.repeatEmail && (
                            <div className="error-message">
                              {formErrors.repeatEmail}
                            </div>
                          )}
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
                          {formErrors.phone && (
                            <div className="error-message">
                              {formErrors.phone}
                            </div>
                          )}
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

                    {consentError && (
                      <div className="error-message2">{consentError}</div>
                    )}
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
                      if (isConsentsGiven) {
                        handlePaymentTpay();
                      } else {
                        setConsentError(
                          'Proszę udzielić obu zgód przed przejściem dalej.'
                        );
                      }
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
