import React, { useState } from 'react';
import '../../../Styles/components/_UserEdit.scss';

const UserEdit = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    onSave(editedUser);
  };

  return (
    <div className="user-edit">
      <div className="user-edit__content">
        <h3>Edycja filmu</h3>
        <form>
          <div>
            <label className="user-edit__label">ID:</label>
            <input
              type="text"
              name="id"
              value={editedUser.id}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="user-edit__label">Imię:</label>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="user-edit__label">Nazwisko:</label>
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="user-edit__label">Rola:</label>
            <input
              type="text"
              name="role"
              value={editedUser.role}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="user-edit__label">Numer telefonu:</label>
            <input
              type="text"
              name="phoneNumber"
              value={editedUser.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="user-edit__content__buttons">
            <button
              type="button"
              onClick={handleSave}
              className="user-edit__button"
            >
              Zapisz
            </button>
            <button
              type="button"
              className="user-edit__button"
              onClick={onCancel}
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
