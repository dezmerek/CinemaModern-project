import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import {
  BsEye,
  BsPencil,
  BsTrash,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
} from 'react-icons/bs';

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
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                onClick={() => handleColumnSort(column.value)}
                style={{ cursor: 'pointer' }}
              >
                {column.label}
                {sortConfig.key === column.value && (
                  <span>
                    {sortConfig.direction === 'asc' ? (
                      <BsFillCaretUpFill />
                    ) : (
                      <BsFillCaretDownFill />
                    )}
                  </span>
                )}
              </th>
            ))}
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{item[column.value]}</td>
              ))}
              <td>
                <button onClick={() => onPreview(item)}>
                  <BsEye />
                </button>
                <button onClick={() => onEdit(item)}>
                  <BsPencil />
                </button>
                <button onClick={() => onDelete(item)}>
                  <BsTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UniversalTable;
