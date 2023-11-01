import React, { useState } from 'react';
import '../../../Styles/components/_UniversalEdit.scss';

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
    <div className="universal-edit">
      <div className="universal-edit__content">
        <h3>Edycja użytkownika</h3>
        <form>
          <div>
            <label className="universal-edit__label">ID:</label>
            <input
              type="text"
              name="id"
              value={editedUser.id}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="universal-edit__label">Imię:</label>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Nazwisko:</label>
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Rola:</label>
            <input
              type="text"
              name="role"
              value={editedUser.role}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Numer telefonu:</label>
            <input
              type="text"
              name="phoneNumber"
              value={editedUser.phoneNumber}
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

export default UserEdit;
