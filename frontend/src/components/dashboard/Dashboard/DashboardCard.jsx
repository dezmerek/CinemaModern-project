import React from 'react';
import { BsArrowUpRightSquare, BsStar } from 'react-icons/bs';

const DashboardCard = ({ title, buttonText, data }) => {
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
          <th>ID</th>
          <th>TYTUŁ</th>
          <th>JĘZYK</th>
          <th>OCENA</th>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.language}</td>
              <td>
                <BsStar />
                {item.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardCard;
