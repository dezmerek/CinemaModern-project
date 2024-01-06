import React from 'react';
import './../../../Styles/components/_UniversalPreview.scss';

const VoucherPreview = ({ voucher, onClose }) => {
  return (
    <div className="universal-preview">
      <div className="universal-preview__content">
        <h3>Podgląd vouchera</h3>
        <p>Kod vouchera: {voucher.code}</p>
        <p>
          Wartość obniżki: {voucher.discountValue} ({voucher.discountType})
        </p>
        <p>Data utworzenia: {voucher.creationDate}</p>
        <p>Aktywny: {voucher.isActive ? 'Tak' : 'Nie'}</p>
        <button className="universal-preview__btn--close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default VoucherPreview;
