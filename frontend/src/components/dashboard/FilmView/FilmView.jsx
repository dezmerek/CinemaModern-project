import React, { useState, useEffect } from 'react';
import UniversalTable from '../TableUniversal/TableUniversal';
import SearchBar from '../TableUniversal/TableSearch';
import FilmEdit from './FilmEdit';
import FilmPreview from './FilmPreview';
import FilmDelete from './FilmDelete';

import '../../../Styles/layout/_ListUniversal.scss';

const FilmView = () => {
  const [films, setFilms] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await fetch('http://localhost:3001/api/movies');
        if (!response.ok) {
          throw new Error('Failed to fetch films');
        }
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error('Error fetching films:');
      }
    }

    fetchFilms();
  }, []);

  const filmColumns = ['movieID', 'title', 'genres', 'language', 'dateAdded'];

  const translatedColumns = ['ID', 'Tytuł', 'Gatunki', 'Język', 'Data dodania'];

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

  const filteredData = films.filter((item) => {
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
        data={filteredData.map((item) => ({
          ...item,
          dateAdded: formatDate(item.dateAdded),
        }))}
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
