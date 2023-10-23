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
    <div className="overlay">
      <div className="user-edit">
        <h3>Edycja użytkownika</h3>
        <form>
          <div>
            <label>ID:</label>
            <input
              type="text"
              name="id"
              value={editedUser.id}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Imię:</label>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Nazwisko:</label>
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Rola:</label>
            <input
              type="text"
              name="role"
              value={editedUser.role}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Numer telefonu:</label>
            <input
              type="text"
              name="phoneNumber"
              value={editedUser.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button onClick={handleSave}>Zapisz</button>
            <button className="cancel" onClick={onCancel}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
