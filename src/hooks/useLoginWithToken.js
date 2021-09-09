import { useCallback } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { loginUserWithToken } from '../useCases/loginUserWithToken';
import useAsyncSafeState from './useAsyncSafeState';

export function useLoginWithToken() {
  const [loading, setLoading] = useAsyncSafeState(false);
  const [error, setError] = useAsyncSafeState(null);
  const [user, setUser] = useAsyncSafeState(null);

  const login = useCallback(async () => {
    setLoading(true);

    try {
      const user = await loginUserWithToken();
      setUser(user);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setUser]);

  useEffect(() => {
    login();
  }, [login]);

  return useMemo(
    () => ({
      loading,
      error,
      user
    }),
    [loading, error, user]
  );
}
