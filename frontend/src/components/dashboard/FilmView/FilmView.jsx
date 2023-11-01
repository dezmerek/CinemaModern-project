import React, { useState } from 'react';
import UniversalTable from '../TableUniversal/TableUniversal';
import data from '../../../data/filmsData';
import SearchBar from '../TableUniversal/TableSearch';
import FilmEdit from './FilmEdit';
import FilmPreview from './FilmPreview';
import FilmDelete from './FilmDelete';

import '../../../Styles/layout/_ListUniversal.scss';

const FilmView = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

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
    'Data Dodatnia',
  ];

  const columnsMap = filmColumns.map((column, index) => ({
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
          <h2>Lista filmów</h2>
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
          <FilmEdit
            film={editedItem}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {selectedItem && (
        <FilmPreview film={selectedItem} onClose={handleClosePreview} />
      )}

      {itemToDelete && (
        <FilmDelete
          item={itemToDelete}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default FilmView;
