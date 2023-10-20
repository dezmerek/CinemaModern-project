import React from 'react';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import '../../../Styles/components/_TableButtons.scss';

const TableButtons = ({ item, onPreview, onEdit, onDelete }) => {
  return (
    <td className="buttons">
      <button className="view" onClick={() => onPreview(item)}>
        <BsEye />
      </button>
      <button className="edit" onClick={() => onEdit(item)}>
        <BsPencil />
      </button>
      <button className="delete" onClick={() => onDelete(item)}>
        <BsTrash />
      </button>
    </td>
  );
};

export default TableButtons;
