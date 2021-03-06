import { useState } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { Auth } from '../services/Auth';

const AuthContext = createContext();
const authService = new Auth();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authContextValue = useMemo(
    () => ({
      setToken(token) {
        authService.setToken(token);
        setUser(authService.user);
      },
      getToken() {
        return authService.token;
      },
      isAuthenticated() {
        console.log('isAuthenticated?', authService.isAuthenticated());
        return authService.isAuthenticated();
      },
      logout() {
        authService.logout();
        setUser(authService.user);
      },
      getUser() {
        return user ?? authService.user;
      }
    }),
    [user, setUser]
  );

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
