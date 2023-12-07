import React, { useState } from 'react';
import '../../../Styles/components/_VoucherTicker.scss';

const Voucher = ({ onApplyVoucher }) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);

  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const handleApplyVoucher = () => {
    onApplyVoucher(voucherCode);
    setVoucherApplied(true);
  };

  const handleRemoveVoucher = () => {
    setVoucherCode('');
    setVoucherApplied(false);
    resetPrices();
  };

  const resetPrices = () => {
    onApplyVoucher('');
  };

  return (
    <div className="voucher-ticket">
      <input
        type="text"
        value={voucherCode}
        placeholder="Masz kupon/voucher? Wpisz jego kod"
        onChange={handleVoucherCodeChange}
      />
      {voucherApplied ? (
        <button onClick={handleRemoveVoucher}>Usuń voucher</button>
      ) : (
        <button onClick={handleApplyVoucher}>Użyj</button>
      )}
    </div>
  );
};

export default Voucher;
