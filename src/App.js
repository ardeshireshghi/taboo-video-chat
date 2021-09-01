import React, { lazy, Suspense } from 'react';
import Loader from './components/Loader';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const SignUp = lazy(() => import('./containers/SignUp'));

export const App = () => {
  return (
    <Suspense fallback={Loader}>
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
