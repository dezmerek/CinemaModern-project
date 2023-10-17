import React, { useState } from 'react';
import UniversalTable from '../UniversalTable/UniversalTable';
import usersData from '../../../data/usersData';

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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredUsersData = usersData.filter((user) => {
    const userDataString = Object.values(user).join(' ').toLowerCase();
    return userDataString.includes(searchText.toLowerCase());
  });

  return (
    <div>
      <h2>
        Lista użytkowników
        <input
          type="text"
          placeholder="Szukaj..."
          value={searchText}
          onChange={handleSearchChange}
        />
      </h2>
      <UniversalTable data={filteredUsersData} columns={columnsMap} />
    </div>
  );
};

export default UsersView;
