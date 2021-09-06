import React, { lazy } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { ProtectedRoute } from './ProtectedRoute';

const SignUp = lazy(() => import('../containers/SignUp'));
const ChooseTopic = lazy(() => import('../containers/ChooseTopic'));
const VideoChat = lazy(() => import('../containers/VideoChat'));

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <ProtectedRoute path="/choose-topic">
          <ChooseTopic />
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
