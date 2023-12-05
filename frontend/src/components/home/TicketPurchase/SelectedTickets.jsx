import React, { useState, useEffect } from 'react';
import Voucher from './Voucher';

const rowNumberToLetter = (number) => {
  return String.fromCharCode(65 + number - 1);
};

const ticketInfo = {
  NORMAL: { type: 'Normalny', price: 20.0 },
  REDUCED: { type: 'Ulgowy', price: 15.0 },
};

const SelectedTickets = ({ selectedSeats, onTicketTypeChange }) => {
  const [selectedTicketTypes, setSelectedTicketTypes] = useState({});
  const [selectedTicketPrices, setSelectedTicketPrices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [voucherDiscount, setVoucherDiscount] = useState(0);

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

      // Zastosuj zniżkę 10% do ceny pojedynczego biletu
      const discountedPrice = price - price * (voucherDiscount / 100);

      updatedPrices[`${seat.row}-${seat.seat}`] = discountedPrice.toFixed(2);
      total += discountedPrice;
    });
    setTotalPrice(total);
    setSelectedTicketPrices(updatedPrices);
  }, [selectedSeats, selectedTicketTypes, voucherDiscount]);

  const handleTicketTypeChange = (seat, event) => {
    const { value } = event.target;
    setSelectedTicketTypes((prevTypes) => ({
      ...prevTypes,
      [`${seat.row}-${seat.seat}`]: value,
    }));
    onTicketTypeChange(seat, value);
  };

  const applyVoucher = (voucherCode) => {
    // Tutaj możesz dodać logikę do sprawdzania poprawności vouchera
    // i obliczania zniżki na cenę biletów
    // W tym przykładzie zakładamy, że voucher o kodzie "test" obniża cenę o 10%
    const discount = voucherCode === 'test' ? 10 : 0;
    setVoucherDiscount(discount);
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
        <tfoot>
          <tr>
            <td colSpan="3">SUMA PLN biletów:</td>
            <td>{totalPrice.toFixed(2)} PLN</td>
          </tr>
        </tfoot>
      </table>
      <Voucher onApplyVoucher={applyVoucher} />
    </div>
  );
};

export default SelectedTickets;
