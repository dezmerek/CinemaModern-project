import React from 'react';
import { BsArrowUpRightSquare, BsStar } from 'react-icons/bs';

const DashboardCard = ({ title, buttonText, data, columns }) => {
  return (
    <div className="dashboard__card">
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
                <td key={index}>
                  {column.value === 'averageRating' && item.averageRating ? (
                    <>
                      <BsStar />
                      {item.averageRating}
                    </>
                  ) : column.value === 'rating' && item.rating ? (
                    <>
                      <BsStar />
                      {item.rating}
                    </>
                  ) : (
                    item[column.value]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardCard;
