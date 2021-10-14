import { useCallback } from 'react';
import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { createTopic } from '../useCases/createTopic';
import useAsyncSafeState from './useAsyncSafeState';

export function useCreateTopic() {
  const [loading, setLoading] = useAsyncSafeState(false);
  const [error, setError] = useAsyncSafeState(null);
  const [topic, setTopic] = useAsyncSafeState(null);
  const authService = useAuth();

  const create = useCallback(
    async ({ name }) => {
      setLoading(true);

      try {
        const topic = await createTopic({ name }, authService);
        setTopic(topic);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, authService, setTopic]
  );

  return useMemo(
    () => ({
      loading,
      error,
      create,
      topic
    }),
    [loading, error, create, topic]
  );
}
