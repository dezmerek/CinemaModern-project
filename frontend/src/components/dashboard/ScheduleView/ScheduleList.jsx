import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import UniversalTable from '../TableUniversal/TableUniversal';
import SearchBar from '../TableUniversal/TableSearch';
import '../../../Styles/layout/_ListUniversal.scss';
import ScheduleEdit from './ScheduleEdit';
import SchedulePreview from './SchedulePreview';
import ScheduleDelete from './ScheduleDelete';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const response = await fetch(`${apiUrl}/api/schedules/all`);
        if (!response.ok) {
          throw new Error(`Failed to fetch schedules: ${response.status}`);
        }
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error('Error fetching schedules:', error.message);
      }
    }

    fetchSchedules();
  }, [apiUrl]);

  const formatDate = (dateString, isTime = false) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return format(date, isTime ? 'HH:mm' : 'yyyy-MM-dd');
    } else {
      return 'Invalid Date';
    }
  };

  const scheduleColumns = [
    'movie.title',
    'date',
    'startTime',
    'endTime',
    'hall.name',
  ];

  const translatedColumns = [
    'Tytuł',
    'Data seansu',
    'Godzina rozpoczęcia',
    'Godzina zakończenia',
    'Nazwa sali',
  ];

  const getMovieTitleById = (movieId) => {
    const movie = schedules.find(
      (schedule) => schedule.movie._id === movieId
    )?.movie;
    return movie ? movie.title : 'Unknown Movie';
  };

  const getHallNameById = (hallId) => {
    const hall = schedules.find(
      (schedule) => schedule.hall._id === hallId
    )?.hall;
    return hall ? hall.name : 'Unknown Hall';
  };

  const columnsMap = scheduleColumns.map((column, index) => ({
    label: translatedColumns[index],
    value: column,
  }));

  const handleSearchChange = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const filteredData = schedules.filter((item) => {
    const itemDataString = Object.values(item).join(' ').toLowerCase();
    const isMatch = itemDataString.includes(searchText.toLowerCase());
    return isMatch;
  });

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
          `${apiUrl}/api/schedules/${itemToDelete._id}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          const updatedSchedules = schedules.filter(
            (schedule) => schedule._id !== itemToDelete._id
          );
          setSchedules(updatedSchedules);
          setItemToDelete(null);
        } else {
          console.error('Failed to delete the schedule');
        }
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  return (
    <div>
      <div className="universal-list--header">
        <div>
          <h2>Lista Seansów</h2>
        </div>
        <SearchBar onSearchChange={handleSearchChange} />
      </div>

      <UniversalTable
        data={filteredData.map((item) => ({
          ...item,
          date: formatDate(item.date),
          startTime: formatDate(item.startTime, true),
          endTime: formatDate(item.endTime, true),
          'movie.title': getMovieTitleById(item.movie._id),
          'hall.name': getHallNameById(item.hall._id),
        }))}
        columns={columnsMap}
        onPreview={handlePreview}
        onEdit={startEditing}
        onDelete={showDeleteConfirmation}
      />

      {isEditing && (
        <div>
          <ScheduleEdit
            schedule={editedItem}
            onSave={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {selectedItem && (
        <SchedulePreview schedule={selectedItem} onClose={handleClosePreview} />
      )}

      {itemToDelete && (
        <ScheduleDelete
          item={itemToDelete}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ScheduleList;
