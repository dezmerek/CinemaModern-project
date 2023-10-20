import React, { useState } from 'react';
import UniversalTable from '../UniversalTable/UniversalTable';
import usersData from '../../../data/usersData';
import SearchBar from '../UniversalTable/TableSearch';
import '../../../Styles/layout/_UsersView.scss';

const UsersView = () => {
  const [searchText, setSearchText] = useState('');

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

  const filteredUsersData = usersData.filter((user) => {
    const userDataString = Object.values(user).join(' ').toLowerCase();
    return userDataString.includes(searchText.toLowerCase());
  });

  const handlePreview = (user) => {
    console.log(`Previewing user with ID ${user.id}`);
  };

  const handleEdit = (user) => {
    console.log(`Editing user with ID ${user.id}`);
  };

  const handleDelete = (user) => {
    console.log(`Deleting user with ID ${user.id}`);
  };

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
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UsersView;
