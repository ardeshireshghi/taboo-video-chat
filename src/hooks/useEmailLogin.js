import { useCallback } from 'react';
import { useMemo } from 'react';
import { loginWithEmail } from '../useCases/loginWithEmail';
import useAsyncSafeState from './useAsyncSafeState';

export function useEmailLogin() {
  const [loading, setLoading] = useAsyncSafeState(false);
  const [error, setError] = useAsyncSafeState(null);
  const [status, setStatus] = useAsyncSafeState('pending');

  const submit = useCallback(
    async ({ email }) => {
      setLoading(true);

      try {
        await loginWithEmail({ email });
        setStatus('success');
      } catch (err) {
        setError(err);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setStatus]
  );

  return useMemo(
    () => ({
      loading,
      error,
      status,
      submit
    }),
    [loading, error, submit, status]
  );
}
