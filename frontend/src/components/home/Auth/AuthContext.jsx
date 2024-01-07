import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Pobierz dane użytkownika z sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser && typeof storedUser === 'string') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Błąd podczas parsowania danych użytkownika:', error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
