import React from 'react';
import { BsArrowUpRightSquare } from 'react-icons/bs';

const UserProfileCard = ({ title, buttonText, data, columns }) => {
  return (
    <div className="user-profile__card">
      <div>
        <h4>
          <BsArrowUpRightSquare />
          {title}
        </h4>
        <button>{buttonText}</button>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {columns.map((column, index) => (
                <td key={index}>{item[column.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfileCard;
