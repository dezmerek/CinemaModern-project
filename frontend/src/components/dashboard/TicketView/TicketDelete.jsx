import React from 'react';
import '../../../Styles/components/_UniversalDelete.scss';

const TicketDelete = ({ item, onDelete, onCancel }) => {
  const handleDelete = () => {
    onDelete(item);
  };

  return (
    <div className="universal-delete">
      <div className="universal-delete__content">
        <h3>Potwierdzenie</h3>
        <p>Czy na pewno chcesz usunąć ten element?</p>
        <div className="universal-delete__buttons">
          <button onClick={handleDelete}>Tak</button>
          <button onClick={onCancel}>Anuluj</button>
        </div>
      </div>
    </div>
  );
};

export default TicketDelete;
