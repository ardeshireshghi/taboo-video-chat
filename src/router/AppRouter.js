import React, { lazy } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import styled from 'styled-components';
import { MainHeader } from '../components/MainHeader/MainHeader';
import ChatNav from '../containers/ChatNav';
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

const AppContent = styled.div`
  display: flex;
  height: 100%;
  gap: 1rem;
  padding: 2rem;
  height: 100vh;
`;

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  const userLoggedIn = isAuthenticated();
  const shouldShowChatNav = useMemo(() => userLoggedIn, [userLoggedIn]);

  return (
    <>
      <Router>
        <MainHeader isLoggedIn={isAuthenticated()} />
        <AppContent>
          {shouldShowChatNav && <ChatNav />}
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
        </AppContent>
      </Router>
    </>
  );
};

export default AppRouter;
