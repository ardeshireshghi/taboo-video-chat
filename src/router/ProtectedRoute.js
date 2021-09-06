import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = (props) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated()) {
    return <Redirect to="/signup" />;
  }
  return <Route {...props} />;
};
