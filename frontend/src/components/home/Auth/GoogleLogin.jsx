// GoogleLogin.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const clientId =
  '740816282526-srg5qmod870vij8pgdeov73q0i48bk2c.apps.googleusercontent.com';

const GoogleLoginButton = ({ onGoogleLogin }) => {
  const handleGoogleLogin = (response) => {
    if (response && response.credential) {
      // Dekodowanie JWT ręcznie
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
      onGoogleLogin(userData);
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
