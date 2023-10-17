import React, { useState } from 'react';
import Pagination from './Pagination';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';

const UniversalTable = ({
  data,
  columns,
  itemsPerPage = 10,
  onPreview,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
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
          totalPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UniversalTable;
