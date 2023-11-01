import React, { useState } from 'react';
import UniversalTable from '../TableUniversal/TableUniversal';
import data from '../../../data/usersData';
import SearchBar from '../TableUniversal/TableSearch';
import UserEdit from './UserEdit';
import UserPreview from './UserPreview';
import UserDelete from './UserDelete';

import '../../../Styles/layout/_ListUniversal.scss';

const UsersView = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

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

  const handlePreview = (item) => {
    setSelectedItem(item);
  };

  const handleClosePreview = () => {
    setSelectedItem(null);
  };

  const startEditing = (item) => {
    setIsEditing(true);
    setEditedItem(item);
  };

  const handleSaveEdit = (editedItem) => {
    setIsEditing(false);
    setEditedItem(null);
  };

  const showDeleteConfirmation = (item) => {
    setItemToDelete(item);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const filteredData = data.filter((item) => {
    const itemDataString = Object.values(item).join(' ').toLowerCase();
    return itemDataString.includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div className="universal-list--header">
        <div>
          <h2>Lista użytkowników</h2>
        </div>
        <SearchBar onSearchChange={handleSearchChange} />
      </div>

      <UniversalTable
        data={filteredData}
        columns={columnsMap}
        onPreview={handlePreview}
        onEdit={startEditing}
        onDelete={showDeleteConfirmation}
      />

      {isEditing && (
        <div>
          <UserEdit
            user={editedItem}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {selectedItem && (
        <UserPreview user={selectedItem} onClose={handleClosePreview} />
      )}

      {itemToDelete && (
        <UserDelete
          item={itemToDelete}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UsersView;
