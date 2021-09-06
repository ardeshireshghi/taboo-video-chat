import React, { lazy } from 'react';
import { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
import { MainHeader } from '../components/MainHeader/MainHeader';
import { useAuth } from '../context/AuthContext';

import { ProtectedRoute } from './ProtectedRoute';

const SignUp = lazy(() => import('../containers/SignUp'));
const ChooseTopic = lazy(() => import('../containers/ChooseTopic'));
const VideoChat = lazy(() => import('../containers/VideoChat'));

const Logout = () => {
  const { logout } = useAuth();
  const history = useHistory();
  useEffect(() => {
    logout();
    history.push('/');
  }, [logout, history]);

  return null;
};

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <MainHeader isLoggedIn={isAuthenticated()} />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <ProtectedRoute path="/choose-topic">
          <ChooseTopic />
        </ProtectedRoute>
        <ProtectedRoute path="/logout">
          <Logout />
        </ProtectedRoute>
        <ProtectedRoute path="/chat/:chatId">
          <VideoChat />
        </ProtectedRoute>
        <Route path="/">
          {!isAuthenticated() ? <SignUp /> : <ChooseTopic />}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
