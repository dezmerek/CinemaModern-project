import React, { useState } from 'react';
import UniversalTable from '../UniversalTable/UniversalTable';
import usersData from '../../../data/usersData';
import SearchBar from '../UniversalTable/TableSearch';
import '../../../Styles/layout/_UsersView.scss';
import UserPreview from './UserPreview';
import DeleteConfirmationDialog from '../UsersView/UsersDelete';

const UsersView = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); // Dodaj stan userToDelete

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
    console.log(`Previewing user with ID ${user.id}`);
    setSelectedUser(user);
  };

  const handleClosePreview = () => {
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    console.log(`Editing user with ID ${user.id}`);
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
      <UniversalTable
        data={filteredUsersData}
        columns={columnsMap}
        onPreview={handlePreview}
        onEdit={handleEdit}
        onDelete={showDeleteConfirmation}
      />

      {selectedUser && (
        <UserPreview user={selectedUser} onClose={handleClosePreview} />
      )}

      {userToDelete && (
        <DeleteConfirmationDialog
          item={userToDelete}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UsersView;
