import React from 'react';
import '../../../Styles/components/_TableRow.scss';
import TableButtons from './TableButtons';

const TableRow = ({ item, columns, onPreview, onEdit, onDelete }) => {
  return (
    <tr className="row">
      {columns.map((column, colIndex) => (
        <td key={colIndex}>{item[column.value]}</td>
      ))}
      <TableButtons
        item={item}
        onPreview={onPreview}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </tr>
  );
};

export default TableRow;
