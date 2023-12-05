// SelectedTickets.jsx
import React, { useState, useEffect } from 'react';

const rowNumberToLetter = (number) => {
  return String.fromCharCode(65 + number - 1);
};

const ticketInfo = {
  NORMAL: { type: 'Normalny', price: 20.0 },
  REDUCED: { type: 'Ulgowy', price: 15.0 },
};

const SelectedTickets = ({ selectedSeats, onTicketTypeChange }) => {
  const [selectedTicketTypes, setSelectedTicketTypes] = useState({});
  const [selectedTicketPrices, setSelectedTicketPrices] = useState({}); // Dodaj tę linię
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Inicjalizacja stanu z typami biletów na podstawie wybranych miejsc
    const initialTypes = {};
    selectedSeats.forEach((seat) => {
      initialTypes[`${seat.row}-${seat.seat}`] = 'NORMAL';
    });
    setSelectedTicketTypes(initialTypes);
  }, [selectedSeats]);

  useEffect(() => {
    // Oblicz ceny biletów po każdej zmianie typu biletu
    const updatedPrices = {};
    let total = 0;
    selectedSeats.forEach((seat) => {
      const type = selectedTicketTypes[`${seat.row}-${seat.seat}`];
      const price = ticketInfo[type] ? ticketInfo[type].price : 0;
      updatedPrices[`${seat.row}-${seat.seat}`] = price.toFixed(2);
      total += price;
    });
    setSelectedTicketPrices(updatedPrices);
    setTotalPrice(total);
  }, [selectedSeats, selectedTicketTypes]);

  const handleTicketTypeChange = (seat, event) => {
    const { value } = event.target;
    setSelectedTicketTypes((prevTypes) => ({
      ...prevTypes,
      [`${seat.row}-${seat.seat}`]: value,
    }));
    onTicketTypeChange(seat, value);
  };

  return (
    <div className="selected-tickets">
      <h2>Wybrane bilety:</h2>
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
          {selectedSeats.map((seat) => (
            <tr key={`${seat.row}-${seat.seat}`}>
              <td>{rowNumberToLetter(seat.row)}</td>
              <td>{seat.seat}</td>
              <td>
                <select
                  value={selectedTicketTypes[`${seat.row}-${seat.seat}`]}
                  onChange={(e) => handleTicketTypeChange(seat, e)}
                >
                  <option value="NORMAL">Normalny</option>
                  <option value="REDUCED">Ulgowy</option>
                </select>
              </td>
              <td>{selectedTicketPrices[`${seat.row}-${seat.seat}`]} PLN</td>
            </tr>
          ))}
        </tbody>
        <p>Razem: {totalPrice.toFixed(2)} PLN</p>
      </table>
    </div>
  );
};

export default SelectedTickets;
