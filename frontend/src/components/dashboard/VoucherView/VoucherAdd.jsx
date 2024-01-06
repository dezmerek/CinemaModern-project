import React, { useState } from 'react';

const VoucherAdd = () => {
  const [code, setCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('amount');
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('');

  const handleSaveVoucher = async () => {
    if (!code || !discountValue || !discountType || !minPurchaseAmount) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
    }

    let calculatedDiscountValue = parseFloat(discountValue);
    if (discountType === 'percentage') {
      if (calculatedDiscountValue < 0 || calculatedDiscountValue > 100) {
        alert('Procent rabatu musi być pomiędzy 0 a 100.');
        return;
      }
      calculatedDiscountValue = (calculatedDiscountValue / 100) * 100;
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
            discountValue: calculatedDiscountValue,
            creationDate: new Date(),
            discountType,
            minPurchaseAmount: parseFloat(minPurchaseAmount),
            usedCount: 0,
            isActive: true,
          }),
        }
      );

      if (response.ok) {
        alert('Voucher added successfully!');
        setCode('');
        setDiscountValue('');
        setDiscountType('amount');
        setMinPurchaseAmount('');
      } else {
        const data = await response.json();
        alert(`Failed to add voucher. Error: ${data.error || 'Unknown error'}`);
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
          <div className="voucher-add__discount-type">
            <label>Rodzaj obniżki:</label>
            <div>
              <input
                type="radio"
                id="amount"
                name="discountType"
                value="amount"
                checked={discountType === 'amount'}
                onChange={() => setDiscountType('amount')}
              />
              <label htmlFor="amount">Kwota</label>
            </div>
            <div>
              <input
                type="radio"
                id="percentage"
                name="discountType"
                value="percentage"
                checked={discountType === 'percentage'}
                onChange={() => setDiscountType('percentage')}
              />
              <label htmlFor="percentage">Procenty</label>
            </div>
          </div>
          <div className="voucher-add__min-purchase">
            <label>Minimalna wartość zakupu</label>
            <input
              type="number"
              value={minPurchaseAmount}
              onChange={(e) => setMinPurchaseAmount(e.target.value)}
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
