import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import '../../../Styles/layout/_UserLoyalty.scss';
import { Navigate } from 'react-router-dom';

const UserLoyalty = () => {
  const auth = useAuth();
  const [totalSpentAmount, setTotalSpentAmount] = useState(0);
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [userVouchers, setUserVouchers] = useState([]);
  const [usedVouchersCount, setUsedVouchersCount] = useState(0);

  useEffect(() => {
    document.title = `CinemaModern - Program lojalnościowy`;

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/${auth.user._id}`
        );
        const userData = await response.json();

        setTotalSpentAmount(parseFloat(userData.totalSpentAmount));
        setRequiredAmount((userData.generatedVouchersCount + 1) * 100);

        // Pobierz listę voucherów użytkownika
        const vouchersResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/vouchers?userId=${auth.user._id}`
        );
        const vouchersData = await vouchersResponse.json();
        setUserVouchers(vouchersData);

        // Zaktualizuj liczbę zrealizowanych voucherów
        const usedVouchers = vouchersData.filter(
          (voucher) => voucher.usedCount === voucher.usageLimit
        );
        setUsedVouchersCount(usedVouchers.length);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (auth.user) {
      fetchUserData();
    }
  }, [auth.user]);

  const handleGenerateVoucher = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/vouchers/generate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: auth.user._id }),
        }
      );

      if (response.ok) {
        setMessage('Kupon wygenerowany pomyślnie!');
      } else {
        const data = await response.json();

        if (data.error === 'User has not spent enough to generate a voucher') {
          setMessage('Nie spełniasz wymagań do kolejnego vouchera.');
        } else {
          setMessage(`Failed to generate voucher: ${data.error}`);
        }

        if (!data.error && data.requiredAmount && data.currentSpentAmount) {
          setMessage(
            `Required amount: ${data.requiredAmount.toFixed(
              2
            )}, Current spent amount: ${data.currentSpentAmount.toFixed(2)}`
          );
        }
      }

      // Pobierz zaktualizowaną listę voucherów użytkownika po wygenerowaniu nowego vouchera
      const vouchersResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/vouchers?userId=${auth.user._id}`
      );
      const vouchersData = await vouchersResponse.json();
      setUserVouchers(vouchersData);

      // Zaktualizuj liczbę zrealizowanych voucherów
      const usedVouchers = vouchersData.filter(
        (voucher) => voucher.usedCount === voucher.usageLimit
      );
      setUsedVouchersCount(usedVouchers.length);
    } catch (error) {
      console.error('Error generating voucher:', error);
      setMessage('Internal server error. Please try again later.');
    }
  };

  return (
    <div className="user-loyalty">
      <div className="user-loyalty__container">
        <h2>Program lojalnościowy</h2>
        {auth.user ? (
          <div>
            <div className="user-profile__profile">
              <img src={auth.user.picture} alt="Avatar profilowy" />
              <div className="user-profile__profile--data">
                <p className="user-profile__profile--name">
                  {auth.user.displayName}
                </p>
                <p>{auth.user.email}</p>
              </div>
            </div>
            <p>Łączna kwota wydana: {totalSpentAmount.toFixed(2)} zł</p>
            {totalSpentAmount >= 100 && (
              <div>
                <p>
                  Kwota potrzebna do kolejnego vouchera:{' '}
                  {requiredAmount.toFixed(2)} zł
                </p>
                {message && <p className="error-message">{message}</p>}
                <button onClick={handleGenerateVoucher}>Generuj voucher</button>
                <p>Liczba zrealizowanych voucherów: {usedVouchersCount}</p>

                <div>
                  <h3>Twoje vouchery:</h3>
                  <ul>
                    {userVouchers
                      .filter(
                        (voucher) => voucher.usedCount !== voucher.usageLimit
                      ) // Filtruj vouchery, które nie zostały jeszcze zrealizowane
                      .map((voucher) => (
                        <li key={voucher.voucherId}>{voucher.code}</li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Navigate to="/brak-dostepu" />
        )}
      </div>
    </div>
  );
};

export default UserLoyalty;
