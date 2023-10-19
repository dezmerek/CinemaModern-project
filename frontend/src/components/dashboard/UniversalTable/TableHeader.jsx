import React from 'react';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';

const TableHeader = ({ columns, sortConfig, onSort }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            onClick={() => onSort(column.value)}
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
  );
};

export default TableHeader;
