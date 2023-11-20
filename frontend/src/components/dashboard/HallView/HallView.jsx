import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import UniversalTable from '../TableUniversal/TableUniversal';
import SearchBar from '../TableUniversal/TableSearch';
import HallEdit from './HallEdit';
import HallPreview from './HallPreview';
import HallDelete from './HallDelete';
import '../../../Styles/layout/_ListUniversal.scss';

const apiUrl = process.env.REACT_APP_API_URL;

const fetchHalls = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/halls`);
    if (!response.ok) {
      throw new Error('Failed to fetch halls');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching halls:', error);
    throw error;
  }
};

const formatDate = (dateString) => {
  return format(new Date(dateString), 'yyyy-MM-dd');
};

const HallView = () => {
  const [halls, setHalls] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHalls();
        setHalls(data);
      } catch (error) {
        console.error('Error setting halls:', error);
      }
    };

    fetchData();
  }, []);

  const hallColumns = ['hallID', 'name', 'numberOfSeats', 'addedDate'];

  const translatedColumns = [
    'ID',
    'Nazwa sali',
    'Liczba miejsc',
    'Data dodania',
  ];

  const columnsMap = hallColumns.map((column, index) => ({
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

  const handleDelete = async () => {
    try {
      if (itemToDelete) {
        const response = await fetch(
          `${apiUrl}/api/halls/${itemToDelete._id}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          const updatedHalls = halls.filter(
            (hall) => hall._id !== itemToDelete._id
          );
          setHalls(updatedHalls);
        } else {
          console.error('Failed to delete the hall');
        }
      }
    } catch (error) {
      console.error('Error deleting hall:', error);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setItemToDelete(null);
  };

  const updateHalls = (updatedHall) => {
    const updatedHallIndex = halls.findIndex(
      (hall) => hall._id === updatedHall._id
    );

    if (updatedHallIndex !== -1) {
      const updatedHalls = [...halls];
      updatedHalls[updatedHallIndex] = updatedHall;
      setHalls(updatedHalls);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const filteredData = halls.filter((item) => {
    const itemDataString = Object.values(item).join(' ').toLowerCase();
    return itemDataString.includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div className="universal-list--header">
        <div>
          <h2>Lista sal</h2>
        </div>
        <SearchBar onSearchChange={handleSearchChange} />
      </div>

      <UniversalTable
        data={filteredData.map((item) => ({
          ...item,
          addedDate: formatDate(item.addedDate),
        }))}
        columns={columnsMap}
        onPreview={handlePreview}
        onEdit={startEditing}
        onDelete={showDeleteConfirmation}
      />

      {isEditing && (
        <div>
          <HallEdit
            hall={editedItem}
            onSave={(updatedHall) => {
              handleSaveEdit(updatedHall);
              updateHalls(updatedHall);
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {selectedItem && (
        <HallPreview hall={selectedItem} onClose={handleClosePreview} />
      )}

      {itemToDelete && (
        <HallDelete
          item={itemToDelete}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          onClose={handleCloseDeleteConfirmation}
        />
      )}
    </div>
  );
};
export default HallView;
