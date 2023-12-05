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
    // Reset voucher-related state
    setVoucherCode('');
    setVoucherApplied(false);
    // Add logic to reset the prices or any other related state
    // For now, let's assume you have a function resetPrices to handle this
    resetPrices();
  };

  const resetPrices = () => {
    // Implement logic to reset prices or any other related state
    // For example, you can call your existing logic for recalculating prices
    // without the voucher discount
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
