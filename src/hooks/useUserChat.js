import { useCallback } from 'react';
import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserChats } from '../useCases/getUserChats';
import { updateUserChat } from '../useCases/updateUserChat';
import useAsyncSafeState from './useAsyncSafeState';

export function useUserChat() {
  const [loading, setLoading] = useAsyncSafeState(false);
  const [error, setError] = useAsyncSafeState(null);
  const [userChats, setChats] = useAsyncSafeState([]);
  const [updatedChat, setUpdatedChat] = useAsyncSafeState(undefined);
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

  const updateChat = useCallback(
    async (chatId) => {
      setLoading(true);

      try {
        const updatedChat = await updateUserChat(chatId, authService);
        setUpdatedChat(updatedChat);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, authService, setUpdatedChat]
  );

  return useMemo(
    () => ({
      loading,
      error,
      getChats,
      userChats,
      updateChat,
      updatedChat
    }),
    [loading, error, getChats, updateChat, userChats, updatedChat]
  );
}
