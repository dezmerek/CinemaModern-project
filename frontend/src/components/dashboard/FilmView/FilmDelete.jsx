import React from 'react';
import '../../../Styles/components/_UserDelete.scss';

const UserDelete = ({ item, onDelete, onCancel }) => {
  const handleDelete = () => {
    onDelete(item);
  };

  return (
    <div className="user-delete">
      <div className="user-delete__content user-delete__content--confirmation">
        <h3>Potwierdzenie</h3>
        <p className="user-delete__content__text">
          Czy na pewno chcesz usunąć ten element?
        </p>
        <div className="user-delete__content__buttons">
          <button
            className="user-delete__content__button user-delete__content__button--delete"
            onClick={handleDelete}
          >
            Tak
          </button>
          <button
            className="user-delete__content__button user-delete__content__button--cancel"
            onClick={onCancel}
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDelete;
