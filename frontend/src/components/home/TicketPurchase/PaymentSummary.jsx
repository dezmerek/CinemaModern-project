import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import QRCode from 'react-qr-code';
import '../../../Styles/layout/_PaymentSummary.scss';
import header from '../../../assets/images/header_3.png';

const PaymentSummary = () => {
  const { id } = useParams();
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/reservations/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch transaction data');
        }

        const data = await response.json();
        console.log('Transaction Data:', data);
        setTransactionData(data);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchTransactionData();
  }, [id]);

  const convertRowNumberToLetter = (rowNumber) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[rowNumber - 1].toUpperCase();
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary__container">
        <div className="reservation-ticket__header">
          <img src={header} alt="repertuar" />
          <h2>Podsumowanie</h2>
        </div>
        {transactionData && (
          <div className="payment-summary__tickets">
            {transactionData.selectedSeats.map((seat, index) => {
              const seatDetails = transactionData.seatDetails[index];

              return (
                <div key={index} className="payment-summary__ticket">
                  <div className="payment-summary__content">
                    <h2>{transactionData.movieTitle}</h2>
                    <div className="payment-summary__content-qr">
                      <table>
                        <tbody>
                          <tr>
                            <td>Transakcja</td>
                            <td className="payment-summary__content--data">
                              {transactionData.transactionId}
                            </td>
                          </tr>
                          <tr>
                            <td>Data</td>
                            <td className="payment-summary__content--data">
                              {format(
                                new Date(transactionData.scheduleDate),
                                'dd.MM.yyyy'
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Sala</td>
                            <td className="payment-summary__content--data">
                              {transactionData.hallName}
                            </td>
                          </tr>
                          <tr>
                            <td>Rząd</td>
                            <td className="payment-summary__content--data">
                              {convertRowNumberToLetter(seatDetails.row)}
                            </td>
                          </tr>
                          <tr>
                            <td>Miejsce</td>
                            <td className="payment-summary__content--data">
                              {seatDetails.seat}
                            </td>
                          </tr>
                          <tr>
                            <td>Typ biletu</td>
                            <td className="payment-summary__content--data">
                              {seatDetails.ticketType}
                            </td>
                          </tr>
                          <tr>
                            <td>Cena</td>
                            <td className="payment-summary__content--data">
                              {seatDetails.ticketPrice.toFixed(2)} PLN
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="payment-summary__qr">
                        <QRCode
                          className="payment-summary__qr--qr"
                          value={`${transactionData.transactionId}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;
