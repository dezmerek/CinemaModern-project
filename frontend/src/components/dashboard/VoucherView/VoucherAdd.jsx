import React, { useState } from 'react';

const VoucherAdd = () => {
  const [code, setCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');

  const handleSaveVoucher = async () => {
    if (!code || !discountValue) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/vouchers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            discountValue: parseFloat(discountValue),
            creationDate: new Date(),
            usedCount: 0,
            isActive: true,
          }),
        }
      );

      if (response.status === 201) {
        alert('Voucher added successfully!');
        setCode('');
        setDiscountValue('');
      } else {
        alert('Failed to add voucher. Please try again.');
      }
    } catch (error) {
      console.error('Error adding voucher:', error);
      alert('Internal server error. Please try again later.');
    }
  };

  return (
    <div className="voucher-add">
      <h2>Dodaj voucher</h2>
      <div className="voucher-add__container">
        <form>
          <div className="voucher-add__code">
            <label>Kod vouchera</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="voucher-add__discount">
            <label>Wartość obniżki</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
            />
          </div>
          <button
            className="voucher-add__btn-save"
            type="button"
            onClick={handleSaveVoucher}
          >
            Zapisz voucher
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoucherAdd;
