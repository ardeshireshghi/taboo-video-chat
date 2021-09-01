import { useCallback } from 'react';
import { useMemo } from 'react';
import { registerUser } from '../useCases/registerUser';
import useAsyncSafeState from './useAsyncSafeState';

export function useSignUp() {
  const [loading, setLoading] = useAsyncSafeState(false);
  const [error, setError] = useAsyncSafeState(null);
  const [user, setUser] = useAsyncSafeState(null);

  const submit = useCallback(
    async ({ email, name }) => {
      setLoading(true);

      try {
        const user = await registerUser({ email, name });
        setUser(user);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setUser]
  );

  return useMemo(
    () => ({
      loading,
      error,
      submit,
      user
    }),
    [loading, error, submit, user]
  );
}
