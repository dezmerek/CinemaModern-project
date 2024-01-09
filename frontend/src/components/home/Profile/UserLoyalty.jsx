import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import '../../../Styles/layout/_UserLoyalty.scss';
import { Navigate } from 'react-router-dom';
import UserProfileStats from './UserProfileStats';
import UserProfileCard from './UserProfileCard';

const UserLoyalty = () => {
  const auth = useAuth();
  const [totalSpentAmount, setTotalSpentAmount] = useState(0);
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [userVouchers, setUserVouchers] = useState([]);
  const [usedVouchersCount, setUsedVouchersCount] = useState(0);
  const [toRedeemVouchersCount, setToRedeemVouchersCount] = useState(0);

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

        const vouchersResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/vouchers?userId=${auth.user._id}`
        );
        const vouchersData = await vouchersResponse.json();
        setUserVouchers(vouchersData);

        const usedVouchers = vouchersData.filter(
          (voucher) => voucher.usedCount === voucher.usageLimit
        );
        setUsedVouchersCount(usedVouchers.length);

        const toRedeemVouchers = vouchersData.filter(
          (voucher) => voucher.usedCount !== voucher.usageLimit
        );
        setToRedeemVouchersCount(toRedeemVouchers.length);
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

      const vouchersResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/vouchers?userId=${auth.user._id}`
      );
      const vouchersData = await vouchersResponse.json();
      setUserVouchers(vouchersData);

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
            <div className="user-loyalty__profile">
              <img src={auth.user.picture} alt="Avatar profilowy" />
              <div className="user-loyalty__profile--data">
                <p className="user-loyalty__profile--name">
                  {auth.user.displayName}
                </p>
                <p>{auth.user.email}</p>
              </div>
            </div>
            {totalSpentAmount >= 100 && (
              <div>
                <div className="user-loyalty__stats">
                  <UserProfileStats
                    title="Łączenie wydano"
                    subtitle="PLN"
                    value={totalSpentAmount.toFixed(2)}
                  />
                  <UserProfileStats
                    title="Do kolejnego voucher"
                    subtitle="PLN"
                    value={requiredAmount.toFixed(2)}
                  />
                  <UserProfileStats
                    title="Do wygenerowania voucherów"
                    subtitle="pozostało"
                    value={toRedeemVouchersCount}
                  />
                  <UserProfileStats
                    title="Zrealizowanych voucherów"
                    subtitle="od początku"
                    value={usedVouchersCount}
                  />
                </div>

                <div className="user-loyalty__cards">
                  <div>
                    <button onClick={handleGenerateVoucher}>
                      Generuj voucher
                    </button>
                    {message && <p className="error-message">{message}</p>}
                  </div>

                  <UserProfileCard
                    title="Twoje vouchery"
                    buttonText="Wszystkie"
                    data={userVouchers.filter(
                      (voucher) => voucher.usedCount !== voucher.usageLimit
                    )}
                    columns={[
                      { label: 'Kod Vouchera', value: 'code' },
                      { label: 'Wartość Zniżki (%)', value: 'discountValue' },
                      { label: 'Liczba Użyć', value: 'usageLimit' },
                    ]}
                  />
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
