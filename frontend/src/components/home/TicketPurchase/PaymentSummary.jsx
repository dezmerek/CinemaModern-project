import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import QRCode from 'react-qr-code';

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

  // Function to convert row number to corresponding letter
  const convertRowNumberToLetter = (rowNumber) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[rowNumber - 1].toUpperCase(); // Assuming row 1 corresponds to 'A'
  };

  return (
    <div>
      <h2>Podsumowanie płatności</h2>
      {transactionData && (
        <>
          {transactionData.selectedSeats.map((seat, index) => {
            const seatDetails = transactionData.seatDetails[index];

            return (
              <div key={index}>
                <h2>{transactionData.movieTitle}</h2>

                <table>
                  <tbody>
                    <tr>
                      <td>Transakcja</td>
                      <td>{transactionData.transactionId}</td>
                    </tr>
                    <tr>
                      <td>Data</td>
                      <td>
                        {format(
                          new Date(transactionData.scheduleDate),
                          'dd.MM.yyyy'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Sala</td>
                      <td>{transactionData.hallName}</td>
                    </tr>
                    <tr>
                      <td>Rząd</td>
                      <td>{convertRowNumberToLetter(seatDetails.row)}</td>
                    </tr>
                    <tr>
                      <td>Miejsce</td>
                      <td>{seatDetails.seat}</td>
                    </tr>
                    <tr>
                      <td>Typ biletu</td>
                      <td>{seatDetails.ticketType}</td>
                    </tr>
                    <tr>
                      <td>Cena</td>
                      <td>{seatDetails.ticketPrice.toFixed(2)} PLN</td>
                    </tr>
                  </tbody>
                </table>

                <QRCode value={`${transactionData.transactionId}`} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PaymentSummary;
