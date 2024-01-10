import React, { useState, useEffect } from 'react';
import UniversalTable from '../TableUniversal/TableUniversal';
import SearchBar from '../TableUniversal/TableSearch';
import UserEdit from './UserEdit';
import UserPreview from './UserPreview';
import UserDelete from './UserDelete';
import { format } from 'date-fns';

import '../../../Styles/layout/_ListUniversal.scss';

const apiUrl = process.env.REACT_APP_API_URL;

const formatDate = (dateString, withTime = false) => {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return format(date, withTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd');
  } else {
    return 'Invalid Date';
  }
};

const userColumns = [
  'userId',
  'displayName',
  'role',
  'phoneNumber',
  'registrationDate',
];
const translatedColumns = [
  'ID',
  'imię i nazwisko',
  'Rola',
  'Numer telefonu',
  'Data rejestracji',
];

const columnsMap = userColumns.map((column, index) => ({
  label: translatedColumns[index],
  value: column,
  formatter: column === 'registrationDate' ? formatDate : undefined,
}));

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

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
      const userId = itemToDelete._id;
      fetch(`${apiUrl}/api/users/${userId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete user');
          }
          return fetch(`${apiUrl}/api/users`);
        })
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error deleting user:', error))
        .finally(() => setItemToDelete(null));
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const filteredData = users.filter((item) => {
    const itemDataString = Object.values(item).join(' ').toLowerCase();
    return itemDataString.includes(searchText.toLowerCase());
  });

  const formattedData = filteredData.map((item) => ({
    ...item,
    registrationDate: formatDate(item.registrationDate),
  }));

  return (
    <div>
      <div className="universal-list--header">
        <div>
          <h2>Lista użytkowników</h2>
        </div>
        <SearchBar onSearchChange={handleSearchChange} />
      </div>

      <UniversalTable
        data={formattedData}
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
