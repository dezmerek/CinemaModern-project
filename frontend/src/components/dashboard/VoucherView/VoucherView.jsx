import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import UniversalTable from '../TableUniversal/TableUniversal';
import SearchBar from '../TableUniversal/TableSearch';
import VoucherPreview from './VoucherPreview';

const VoucherView = () => {
  const [vouchers, setVouchers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchVouchers() {
      try {
        const response = await fetch(`${apiUrl}/api/vouchers`);
        if (!response.ok) {
          throw new Error(`Failed to fetch vouchers: ${response.status}`);
        }
        const data = await response.json();
        setVouchers(data);
      } catch (error) {
        console.error('Error fetching vouchers:', error.message);
      }
    }
    fetchVouchers();
  }, [apiUrl]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    } else {
      return 'Invalid Date';
    }
  };

  const translateDiscountType = (type) => {
    return type === 'percentage' ? 'Procentowy' : 'Kwotowy';
  };

  const voucherColumns = [
    'voucherId',
    'code',
    'discountValue',
    'discountType',
    'creationDate',
    'isActive',
  ];

  const translatedColumns = [
    'ID',
    'Kod vouchera',
    'Wartość obniżki',
    'Typ obniżki',
    'Data utworzenia',
    'Aktywny',
  ];

  const columnsMap = voucherColumns.map((column, index) => {
    return {
      label: translatedColumns[index],
      value: column,
    };
  });

  const handleSearchChange = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const filteredData = vouchers.filter((item) => {
    const itemDataString = Object.values(item).join(' ').toLowerCase();
    const isMatch = itemDataString.includes(searchText.toLowerCase());
    return isMatch;
  });

  const handlePreview = (voucher) => {
    setSelectedVoucher(voucher);
  };

  const handleClosePreview = () => {
    setSelectedVoucher(null);
  };

  return (
    <div>
      <div className="universal-list--header">
        <div>
          <h2>Lista Voucherów</h2>
        </div>
        <SearchBar onSearchChange={handleSearchChange} />
      </div>

      <UniversalTable
        data={filteredData.map((item) => ({
          ...item,
          creationDate: formatDate(item.creationDate),
          isActive: item.isActive ? 'Tak' : 'Nie',
          discountType: translateDiscountType(item.discountType),
        }))}
        columns={columnsMap}
        onPreview={handlePreview}
      />

      {selectedVoucher && (
        <VoucherPreview
          voucher={selectedVoucher}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default VoucherView;
