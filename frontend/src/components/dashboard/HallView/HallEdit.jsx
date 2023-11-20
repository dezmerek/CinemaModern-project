import React, { useState, useEffect } from 'react';
import '../../../Styles/components/_UniversalEdit.scss';
import HallLayout from './HallLayout';

const apiUrl = process.env.REACT_APP_API_URL;

const HallEdit = ({ hall, onSave, onCancel }) => {
  const [editedHall, setEditedHall] = useState(hall);
  const [editedRows, setEditedRows] = useState(hall.rows || 1);
  const [editedSeatsPerRow, setEditedSeatsPerRow] = useState(
    hall.seatsPerRow || 1
  );

  useEffect(() => {
    setEditedRows(hall.rows || 1);
  }, [hall.rows]);

  useEffect(() => {
    setEditedSeatsPerRow(hall.seatsPerRow || 1);
  }, [hall.seatsPerRow]);

  useEffect(() => {
    setEditedHall((prevHall) => ({
      ...prevHall,
      rows: editedRows,
      seatsPerRow: editedSeatsPerRow,
      seatLayout: generateDefaultSeatLayout(
        editedRows,
        editedSeatsPerRow,
        prevHall.seatLayout
      ),
    }));
  }, [editedRows, editedSeatsPerRow]);

  const generateDefaultSeatLayout = (rows, seatsPerRow, existingSeatLayout) => {
    const seatLayout = [];

    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const existingSeat = existingSeatLayout.find(
          (s) => s.row === row && s.seat === seat
        );

        if (existingSeat) {
          seatLayout.push(existingSeat);
        } else {
          seatLayout.push({ row, seat, isActive: true });
        }
      }
    }

    return seatLayout;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHall({ ...editedHall, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/halls/${editedHall._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedHall),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      onSave(editedHall);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleSeatEdit = (row, seat) => {
    const updatedSeatLayout = editedHall.seatLayout.map((s) => {
      if (s.row === row && s.seat === seat) {
        return { ...s, isActive: !s.isActive };
      }
      return s;
    });

    setEditedHall({ ...editedHall, seatLayout: updatedSeatLayout });
  };

  const handleRowsChange = (event) => {
    setEditedRows(Number(event.target.value));
  };

  const handleSeatsPerRowChange = (event) => {
    setEditedSeatsPerRow(Number(event.target.value));
  };

  return (
    <div className="universal-edit">
      <div className="universal-edit__content">
        <h3>Edycja sali</h3>
        <form>
          <div>
            <label className="universal-edit__label">ID:</label>
            <input
              type="number"
              name="hallID"
              value={editedHall.hallID}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="universal-edit__label">Nazwa sali:</label>
            <input
              type="text"
              name="name"
              value={editedHall.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Opis:</label>
            <input
              type="text"
              name="description"
              value={editedHall.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Edytuj miejsca:</label>
            <HallLayout
              seatLayout={editedHall.seatLayout}
              onEditSeatLayout={(updatedSeatLayout) =>
                setEditedHall({ ...editedHall, seatLayout: updatedSeatLayout })
              }
              onSeatClick={handleSeatEdit}
            />
          </div>
          <div>
            <label className="universal-edit__label">Ilość rzędów:</label>
            <input
              type="number"
              min="1"
              value={editedRows}
              onChange={handleRowsChange}
            />
          </div>
          <div>
            <label className="universal-edit__label">Miejsc w rzędzie:</label>
            <input
              type="number"
              min="1"
              value={editedSeatsPerRow}
              onChange={handleSeatsPerRowChange}
            />
          </div>
          <div className="universal-edit__buttons">
            <button type="button" onClick={handleSave}>
              Zapisz
            </button>
            <button type="button" onClick={onCancel}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HallEdit;
