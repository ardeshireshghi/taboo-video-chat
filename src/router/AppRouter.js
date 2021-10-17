import React, { lazy } from 'react';
import { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import { MainHeader } from '../components/MainHeader/MainHeader';
import { useAuth } from '../context/AuthContext';

import { ProtectedRoute } from './ProtectedRoute';

const SignUp = lazy(() => import('../containers/SignUp'));
const Login = lazy(() => import('../containers/Login'));
const MagicLogin = lazy(() => import('../containers/MagicLogin'));
const ChooseTopic = lazy(() => import('../containers/ChooseTopic'));
const VideoChat = lazy(() => import('../containers/VideoChat'));

const Logout = () => {
  const { logout } = useAuth();
  const history = useHistory();
  useEffect(() => {
    logout();
    window.location.reload();
  }, [logout, history]);

  return null;
};

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MainHeader isLoggedIn={isAuthenticated()} />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/magic-login">
          <MagicLogin />
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
