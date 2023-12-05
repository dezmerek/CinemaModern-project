import React, { useState } from 'react';
import '../../../Styles/components/_VoucherTicker.scss';

const Voucher = ({ onApplyVoucher }) => {
  const [voucherCode, setVoucherCode] = useState('');

  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const handleApplyVoucher = () => {
    onApplyVoucher(voucherCode);
  };

  return (
    <div className="voucher-ticket">
      <input
        type="text"
        value={voucherCode}
        placeholder="Masz kupon/voucher? Wpisz jego kod"
        onChange={handleVoucherCodeChange}
      />
      <button onClick={handleApplyVoucher}>Użyj</button>
    </div>
  );
};

export default Voucher;
