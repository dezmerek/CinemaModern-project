import React from 'react';
import GenericTable from '../UniversalTable/UniversalTable';
import usersData from '../../../data/usersData';

const UsersView = () => {
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

  return (
    <div className="users-page">
      <h2>Lista użytkowników</h2>
      <GenericTable data={usersData} columns={columnsMap} />
    </div>
  );
};

export default UsersView;
