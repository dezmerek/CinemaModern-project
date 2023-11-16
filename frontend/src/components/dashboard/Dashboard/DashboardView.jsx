import React from 'react';
import DashboardStat from './DashboardStat';
import '../../../Styles/layout/_Dashboard.scss';

import { BsArrowUpRightSquare, BsStar } from 'react-icons/bs';

const DashboardView = () => {
  return (
    <>
      <h2>Dashboard</h2>

      <div className="dashboard">
        <div className="dashboard__stats">
          <DashboardStat
            title="Sprzedanych biletów"
            subtitle="Ostatnie 30 dni"
            value={2137}
          />
          <DashboardStat
            title="Nowych filmów"
            subtitle="Ostatnie 30 dni"
            value={2137}
          />
          <DashboardStat
            title="Nowych filmów"
            subtitle="Ostatnie 30 dni"
            value={2137}
          />
          <DashboardStat
            title="Nowych filmów"
            subtitle="Ostatnie 30 dni"
            value={2137}
          />
        </div>

        <div className="dashboard__cards">
          <div className="dashboard__card">
            <div>
              <h4>
                <BsArrowUpRightSquare />
                Ostatnia recenzja
              </h4>
              <button>Wszystkie</button>
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
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="dashboard__card">
            <div>
              <h4>
                <BsArrowUpRightSquare />
                Ostatnia recenzja
              </h4>
              <button>Wszystkie</button>
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
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="dashboard__card">
            <div>
              <h4>
                <BsArrowUpRightSquare />
                Ostatnia recenzja
              </h4>
              <button>Wszystkie</button>
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
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="dashboard__card">
            <div>
              <h4>
                <BsArrowUpRightSquare />
                Ostatnia recenzja
              </h4>
              <button>Wszystkie</button>
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
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
                <tr>
                  <td>221</td>
                  <td>Aftersun</td>
                  <td>Polski</td>
                  <td>
                    <BsStar />
                    8.4
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
