import React from 'react';
import GenericTable from '../UniversalTable/UniversalTable';

const UsersView = () => {
  const usersData = [
    {
      id: 1,
      firstName: 'Konrad',
      lastName: 'Górski',
      role: 'Użytkownik',
      phoneNumber: '349566253',
    },
    {
      id: 2,
      firstName: 'Patryk',
      lastName: 'Baranowski',
      role: 'Pracownik',
      phoneNumber: '253349566',
    },
    {
      id: 3,
      firstName: 'Oliwier',
      lastName: 'Wojciechowski',
      role: 'Analityk',
      phoneNumber: '696345253',
    },
    {
      id: 4,
      firstName: 'Adrian',
      lastName: 'Kwiatkowski',
      role: 'Administrator',
      phoneNumber: '566234953',
    },
  ];

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
