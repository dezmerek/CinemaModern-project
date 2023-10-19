import React from 'react';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';

const TableRow = ({ item, columns, onPreview, onEdit, onDelete }) => {
  return (
    <tr>
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
  );
};

export default TableRow;
