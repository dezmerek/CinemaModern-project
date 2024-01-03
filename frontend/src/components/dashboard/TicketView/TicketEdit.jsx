import React, { useState } from 'react';
import '../../../Styles/components/_UniversalEdit.scss';

const TicketEdit = ({ ticket, onSave, onCancel }) => {
  const [editedTicket, setEditedTicket] = useState(ticket);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket({ ...editedTicket, [name]: value });
  };

  const handleSave = () => {
    onSave(editedTicket);
  };

  return (
    <div className="universal-edit">
      <div className="universal-edit__content">
        <h3>Edycja biletu</h3>
        <form>
          <div>
            <label className="universal-edit__label">ID:</label>
            <input
              type="number"
              name="_id"
              value={editedTicket._id}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="universal-edit__label">Movie Name:</label>
            <input
              type="text"
              name="movieName"
              value={editedTicket.movieName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Total Price:</label>
            <input
              type="number"
              name="totalPrice"
              value={editedTicket.totalPrice}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Created At:</label>
            <input
              type="text"
              name="createdAt"
              value={editedTicket.createdAt}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="universal-edit__label">Selected Seats:</label>
            <input
              type="text"
              name="selectedSeats"
              value={editedTicket.selectedSeats}
              onChange={handleInputChange}
            />
          </div>
          <div className="universal-edit__buttons">
            <button type="button" onClick={handleSave}>
              Zapisz
            </button>
            <button type="button" onClick={onCancel}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketEdit;
