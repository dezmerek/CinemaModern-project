import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import '../../../Styles/components/_TableSearch.scss';

const SearchBar = ({ onSearchChange }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
    onSearchChange(newValue);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Szukaj..."
        value={searchText}
        onChange={handleSearchChange}
      />
      <BsSearch />
    </div>
  );
};

export default SearchBar;
