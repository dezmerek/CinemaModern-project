import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import UniversalTable from '../TableUniversal/TableUniversal';
import SearchBar from '../TableUniversal/TableSearch';
import '../../../Styles/layout/_ListUniversal.scss';
import TicketEdit from './TicketEdit';
import TicketPreview from './TicketPreview';
import TicketDelete from './TicketDelete';

const apiUrl = process.env.REACT_APP_API_URL;

const fetchTickets = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/tickets`);
    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

const fetchMovieName = async (ticket) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/schedules/${ticket.scheduleId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch schedule');
    }
    const scheduleData = await response.json();
    return scheduleData.movie.title;
  } catch (error) {
    console.error('Error fetching movie name:', error);
    throw error;
  }
};

const formatDate = (dateString) => {
  return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
};

const TicketView = () => {
  const [tickets, setTickets] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [movieNames, setMovieNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketData = await fetchTickets();
        setTickets(ticketData);

        const promises = ticketData.map(async (ticket) => {
          const name = await fetchMovieName(ticket);
          return name;
        });
        const names = await Promise.all(promises);
        setMovieNames(names);
      } catch (error) {
        console.error('Error setting tickets:', error);
      }
    };

    fetchData();
  }, []);

  const ticketColumns = [
    'customerEmail',
    'movieName',
    'totalPrice',
    'createdAt',
    'selectedSeatsCount',
  ];

  const translatedColumns = [
    'Email',
    'Film',
    'Koszt biletów',
    'Data zakupu',
    'Liczba biletów',
  ];

  const columnsMap = ticketColumns.map((column, index) => ({
    label: translatedColumns[index],
    value: column,
  }));

  columnsMap.find((column) => column.value === 'totalPrice').render = (value) =>
    `${value.toFixed(2)} PLN`;

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
          `${apiUrl}/api/tickets/${itemToDelete._id}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          const updatedTickets = tickets.filter(
            (ticket) => ticket._id !== itemToDelete._id
          );
          setTickets(updatedTickets);
        } else {
          console.error('Failed to delete the ticket');
        }
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setItemToDelete(null);
  };

  const updateTickets = (updatedTicket) => {
    const updatedTicketIndex = tickets.findIndex(
      (ticket) => ticket._id === updatedTicket._id
    );

    if (updatedTicketIndex !== -1) {
      const updatedTickets = [...tickets];
      updatedTickets[updatedTicketIndex] = updatedTicket;
      setTickets(updatedTickets);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const filteredData = tickets.filter((item) => {
    const itemDataString = Object.values(item).join(' ').toLowerCase();
    return itemDataString.includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div className="universal-list--header">
        <div>
          <h2>Lista biletów</h2>
        </div>
        <SearchBar onSearchChange={handleSearchChange} />
      </div>

      <UniversalTable
        data={filteredData.map((item, index) => ({
          ...item,
          movieName: movieNames[index],
          createdAt: formatDate(item.createdAt),
          selectedSeatsCount: item.selectedSeats.length,
          totalPrice: `${item.totalPrice} PLN`,
        }))}
        columns={columnsMap}
        onPreview={handlePreview}
        onEdit={startEditing}
        onDelete={showDeleteConfirmation}
      />

      {isEditing && (
        <div>
          <TicketEdit
            ticket={editedItem}
            onSave={(updatedTicket) => {
              handleSaveEdit(updatedTicket);
              updateTickets(updatedTicket);
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}

      {selectedItem && (
        <div>
          <TicketPreview ticket={selectedItem} onClose={handleClosePreview} />
        </div>
      )}

      {itemToDelete && (
        <div>
          <TicketDelete
            item={itemToDelete}
            onDelete={handleDelete}
            onCancel={handleCancelDelete}
            onClose={handleCloseDeleteConfirmation}
          />
        </div>
      )}
    </div>
  );
};

export default TicketView;
