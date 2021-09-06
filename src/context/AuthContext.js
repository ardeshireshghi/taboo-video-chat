import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { Auth } from '../services/Auth';

const AuthContext = createContext();
const authService = new Auth();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const authContextValue = {
    setToken(token) {
      authService.setToken(token);
      setUser(authService.user);
    },
    getToken() {
      return authService.token;
    },
    isAuthenticated() {
      return authService.isAuthenticated();
    },
    user
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return contextValue;
};
