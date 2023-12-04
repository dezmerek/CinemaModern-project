import React from 'react';
import header from '../../../assets/images/header_4.png';
import '../../../Styles/layout/_RepertoireList.scss';

const RepertoireList = () => {
  return (
    <div className="repertoire-list">
      <div className="repertoire-list__container">
        <div className="repertoire-list__header">
          <img src={header} alt="repertuar" />
          <h2>Repertuar</h2>
        </div>
      </div>
    </div>
  );
};

export default RepertoireList;
