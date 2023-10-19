import React, { useState, useEffect } from 'react';
import TablePagination from './TablePagination';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const UniversalTable = ({
  data,
  columns,
  itemsPerPage = 10,
  onPreview,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    setSortConfig({ key: columns[0].value, direction: 'asc' });
  }, [columns]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleColumnSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    const direction = sortConfig.direction === 'asc' ? 1 : -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    } else {
      return (aValue - bValue) * direction;
    }
  });

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <table>
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          onSort={handleColumnSort}
        />
        <tbody>
          {currentItems.map((item, rowIndex) => (
            <TableRow
              key={rowIndex}
              item={item}
              columns={columns}
              onPreview={onPreview}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      <div>
        <TablePagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UniversalTable;
