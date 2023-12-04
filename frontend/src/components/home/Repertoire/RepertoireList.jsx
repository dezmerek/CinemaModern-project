import React, { useState } from 'react';
import header from '../../../assets/images/header_4.png';
import '../../../Styles/layout/_RepertoireList.scss';
import { format, addDays, startOfWeek } from 'date-fns';
import { pl } from 'date-fns/locale';

const RepertoireList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (dayIndex) => {
    const clickedDate = new Date(
      startOfWeek(selectedDate, { weekStartsOn: 1 })
    );
    clickedDate.setDate(clickedDate.getDate() + dayIndex);
    clickedDate.setHours(0, 0, 0, 0);
    setSelectedDate(clickedDate);

    // Implement your logic for handling date clicks here
    // This could include fetching data for the selected date, etc.
  };

  const currentDate = new Date();
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });

  const renderDayButtons = () => {
    const buttons = [];
    let isEvenColor = false;

    for (let i = 0; i < 7; i++) {
      const dayDate = addDays(startDate, i);

      buttons.push(
        <button
          key={i}
          onClick={() => handleDateClick(i)}
          className={`${
            format(selectedDate, 'yyyy-MM-dd') === format(dayDate, 'yyyy-MM-dd')
              ? 'active'
              : ''
          } ${isEvenColor ? 'even-button' : 'odd-button'} ${
            i === 0 ? 'first-day' : ''
          }`}
        >
          <div className="repertoire-view__day-btn--date">
            <span>{format(dayDate, 'dd.MM')}</span>
          </div>
          <div className="repertoire-view__day-btn--day">
            <span>{format(dayDate, 'iiii', { locale: pl })}</span>
          </div>
        </button>
      );

      isEvenColor = !isEvenColor;
    }

    return buttons;
  };

  return (
    <div className="repertoire-list">
      <div className="repertoire-list__container">
        <div className="repertoire-list__header">
          <img src={header} alt="repertuar" />
          <h2>Repertuar</h2>
        </div>
        <div className="day-buttons">{renderDayButtons()}</div>
        {/* Add the rest of your content here */}
      </div>
    </div>
  );
};

export default RepertoireList;
