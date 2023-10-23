import React from 'react';
import '../../../Styles/components/_UserDelete.scss';

const UserDelete = ({ item, onDelete, onCancel }) => {
  const handleDelete = () => {
    onDelete(item);
  };

  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog__content">
        <p>Czy na pewno chcesz usunąć ten element?</p>
        <button onClick={handleDelete}>Tak</button>
        <button onClick={onCancel}>Anuluj</button>
      </div>
    </div>
  );
};

export default UserDelete;
