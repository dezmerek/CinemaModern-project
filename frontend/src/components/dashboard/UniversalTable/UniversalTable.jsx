import React, { useState } from 'react';
import Pagination from './Pagination';

const UniversalTable = ({ data, columns, itemsPerPage = 10 }) => {
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
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{item[column.value]}</td>
              ))}
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
