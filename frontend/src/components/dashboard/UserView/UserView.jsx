import React, { useState } from 'react';
import UniversalTable from '../UniversalTable/UniversalTable';
import usersData from '../../../data/usersData';
import SearchBar from '../UniversalTable/TableSearch';
import UserEdit from './UserEdit';
import '../../../Styles/layout/_UserView.scss';
import UserPreview from './UserPreview';
import UserDelete from './UserDelete';

const UsersView = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const userColumns = ['id', 'firstName', 'lastName', 'role', 'phoneNumber'];

  const translatedColumns = [
    'ID',
    'Imię',
    'Nazwisko',
    'Rola',
    'Numer telefonu',
  ];

  const columnsMap = userColumns.map((column, index) => ({
    label: translatedColumns[index],
    value: column,
  }));

  const handleSearchChange = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const handlePreview = (user) => {
    setSelectedUser(user);
  };

  const handleClosePreview = () => {
    setSelectedUser(null);
  };

  const startEditing = (user) => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSaveEdit = (editedUser) => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const showDeleteConfirmation = (user) => {
    setUserToDelete(user);
  };

  const handleDelete = () => {
    if (userToDelete) {
      console.log(`Deleting user with ID ${userToDelete.id}`);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  const filteredUsersData = usersData.filter((user) => {
    const userDataString = Object.values(user).join(' ').toLowerCase();
    return userDataString.includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div className="users">
        <div>
          <h2>Lista użytkowników</h2>
        </div>
        <SearchBar onSearchChange={handleSearchChange} />
      </div>
      <div className="user-list-container">
        <UniversalTable
          data={filteredUsersData}
          columns={columnsMap}
          onPreview={handlePreview}
          onEdit={startEditing}
          onDelete={showDeleteConfirmation}
        />
      </div>
      {isEditing && (
        <div className="user-edit-container">
          <UserEdit
            user={editedUser}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {selectedUser && (
        <UserPreview user={selectedUser} onClose={handleClosePreview} />
      )}

      {userToDelete && (
        <UserDelete
          item={userToDelete}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UsersView;
