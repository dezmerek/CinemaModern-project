import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
        setTransactionData(data);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchTransactionData();
  }, [id]);

  return (
    <div>
      <h2>Podsumowanie płatności</h2>
      {transactionData && (
        <>
          <p>Identyfikator transakcji: {transactionData._id}</p>
          <p>Email klienta: {transactionData.customerEmail}</p>
          <p>Kwota płatności: {transactionData.amountPaid}</p>
          <p>Identyfikator transakcji Tpay: {transactionData.transactionId}</p>
          {/* Dodaj inne informacje, które chcesz wyświetlić */}
        </>
      )}
    </div>
  );
};

export default PaymentSummary;
