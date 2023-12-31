import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../../../Styles/components/_AuthOptions.scss';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({ onGoogleLogin }) => {
  const handleGoogleLogin = async (response) => {
    if (response && response.credential) {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      const decoded = JSON.parse(jsonPayload);
      const userData = {
        displayName: decoded.name,
        email: decoded.email,
        uid: decoded.sub,
        picture: decoded.picture,
      };

      const serverResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/google-login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await serverResponse.json();
      onGoogleLogin(data);
    } else {
      console.error('Nieprawidłowa odpowiedź z Google:', response);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Błąd logowania przez Google:', error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={handleGoogleLogin}
      onFailure={handleLoginFailure}
      responseType="id_token"
    />
  );
};

export default GoogleLoginButton;
