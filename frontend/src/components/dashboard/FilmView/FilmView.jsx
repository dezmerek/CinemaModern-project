import React, { useState } from 'react';
import UniversalTable from '../TableUniversal/TableUniversal';
import filmsData from '../../../data/filmsData';
import SearchBar from '../TableUniversal/TableSearch';
import FilmEdit from './FilmEdit';
import '../../../Styles/layout/_UserView.scss';
import FilmPreview from './FilmPreview';
import FilmDelete from './FilmDelete';

const UsersView = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const filmColumns = [
    'id',
    'title',
    'rating',
    'language',
    'tickets',
    'dateAdded',
  ];

  const translatedColumns = [
    'ID',
    'Tytuł',
    'Ocena',
    'Język',
    'Bilety',
    'Data dodania',
  ];

  const columnsMap = filmColumns.map((column, index) => ({
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

  const filteredUsersData = filmsData.filter((user) => {
    const userDataString = Object.values(user).join(' ').toLowerCase();
    return userDataString.includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div className="users">
        <div>
          <h2>Lista filmów</h2>
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
          <FilmEdit
            user={editedUser}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {selectedUser && (
        <FilmPreview user={selectedUser} onClose={handleClosePreview} />
      )}

      {userToDelete && (
        <FilmDelete
          item={userToDelete}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UsersView;
