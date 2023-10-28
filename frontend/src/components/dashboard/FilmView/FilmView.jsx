import React, { useState } from 'react';
import UniversalTable from '../TableUniversal/TableUniversal';
import filmsData from '../../../data/filmsData';
import SearchBar from '../TableUniversal/TableSearch';
import FilmEdit from './FilmEdit';
import '../../../Styles/layout/_UserView.scss';
import FilmPreview from './FilmPreview';
import FilmDelete from './FilmDelete';

const UsersView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const itemFields = [
    'id',
    'title',
    'rating',
    'language',
    'tickets',
    'dateAdded',
  ];

  const translatedFields = [
    'ID',
    'Tytuł',
    'Ocena',
    'Język',
    'Bilety',
    'Data dodania',
  ];

  const fieldMap = itemFields.map((field, index) => ({
    label: translatedFields[index],
    value: field,
  }));

  const handleSearchChange = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
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
      console.log(`Deleting item with ID ${itemToDelete.id}`);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const filteredItemsData = filmsData.filter((item) => {
    const itemDataString = Object.values(item).join(' ').toLowerCase();
    return itemDataString.includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="items">
        <div>
          <h2>Lista filmów</h2>
        </div>
        <SearchBar onSearchChange={handleSearchChange} />
      </div>
      <div className="item-list-container">
        <UniversalTable
          data={filteredItemsData}
          columns={fieldMap}
          onPreview={handlePreview}
          onEdit={startEditing}
          onDelete={showDeleteConfirmation}
        />
      </div>
      {isEditing && (
        <div className="item-edit-container">
          <FilmEdit
            item={editedItem}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {selectedItem && (
        <FilmPreview item={selectedItem} onClose={handleClosePreview} />
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

export default UsersView;
