import { useCallback } from 'react';
import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserChats } from '../useCases/getUserChats';
import useAsyncSafeState from './useAsyncSafeState';

export function useUserChat() {
  const [loading, setLoading] = useAsyncSafeState(false);
  const [error, setError] = useAsyncSafeState(null);
  const [userChats, setChats] = useAsyncSafeState([]);
  const authService = useAuth();

  const getChats = useCallback(async () => {
    setLoading(true);

    try {
      const userChats = await getUserChats(authService);
      setChats(userChats);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, authService, setChats]);

  return useMemo(
    () => ({
      loading,
      error,
      getChats,
      userChats
    }),
    [loading, error, getChats, userChats]
  );
}
