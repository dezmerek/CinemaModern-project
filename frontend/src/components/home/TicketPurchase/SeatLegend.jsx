import React from 'react';
import '../../../Styles/components/_SeatLegend.scss';

const SeatLegend = () => {
  return (
    <>
      <h3 className="seat-legend-h3">Legenda</h3>
      <div className="seat-legend-container">
        <div className="seat-legend">
          <div className="legend-item">
            <div className="legend-color active"></div>
            <span>Aktywne</span>
          </div>
          <div className="legend-item">
            <div className="legend-color reserved"></div>
            <span>Zarezerwowane</span>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <span>Zaznaczone</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatLegend;
