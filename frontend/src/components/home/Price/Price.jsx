import React from 'react';
import header from '../../../assets/images/header_3.png';
import '../../../Styles/layout/_Price.scss';

const PrivacyPolicy = () => {
  const prices = [
    { type: 'ulgowy', price: 20 },
    { type: 'normalny', price: 20 },
    { type: 'karta dużej rodziny normalny', price: 20 },
    { type: 'karta dużej rodziny ulgowy', price: 20 },
    { type: 'kino dla seniorów', price: 20 },
  ];

  return (
    <div className="price">
      <div className="price__container">
        <div className="price__header">
          <img src={header} alt="polityka prywatnosci" />
          <h2>Cennik</h2>
        </div>
        <div className="price__table">
          <table>
            <thead>
              <tr>
                <th>Duża sala</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'evenRow' : 'oddRow'}
                >
                  <td>{`${price.type}`}</td>
                  <td>{`${price.price} zł`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Sala kameralna</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'evenRow' : 'oddRow'}
                >
                  <td>{`${price.type}`}</td>
                  <td>{`${price.price} zł`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="price__text"></div>
        <p>
          <b>Ulgowy</b> - zakupu biletu przysługuje młodzieży szkolnej,
          studentom do 26 roku życia, za okazaniem ważnej legitymacji
          uczniowskiej/studenckiej oraz seniorom powyżej 60 roku życia, za
          okazaniem dokumentu tożsamości potwierdzającego wiek
        </p>
        <p>
          <b>Karta Dużej Rodziny</b> - dotyczy posiadaczy "Karty Dużej Rodziny".
          Aby otrzymać zniżkę należy przed dokonaniem płatności okazać ważną
          kartę wraz z dokumentem ze zdjęciem potwierdzającym tożsamość (dowód
          osobisty, paszport, prawo jazdy, legitymacja szkolna/studencka).
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
