import React, { Suspense } from 'react';
import Loader from './components/Loader';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import './App.css';

import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';

export const App = () => {
  return (
    <Suspense fallback={Loader}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Suspense>
  );
};

export default App;
