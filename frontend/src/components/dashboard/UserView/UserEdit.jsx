import React, { useState } from 'react';
import '../../../Styles/components/_UniversalEdit.scss';
const apiUrl = process.env.REACT_APP_API_URL;

const UserEdit = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    fetch(`${apiUrl}/api/users/${editedUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        return response.json();
      })
      .then((data) => onSave(data))
      .catch((error) => console.error('Error updating user:', error));
  };

  return (
    <div className="universal-edit">
      <div className="universal-edit__content">
        <h3>Edycja użytkownika</h3>
        <form>
          <div>
            <label className="universal-edit__label">ID:</label>
            <input
              type="number"
              name="userId"
              value={editedUser.userId}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="universal-edit__label">Imię:</label>
            <input
              type="text"
              name="displayName"
              value={editedUser.displayName}
              onChange={handleInputChange}
              disabled
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
