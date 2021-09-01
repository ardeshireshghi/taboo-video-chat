import { useRef, useEffect, useState, useCallback } from 'react';

function useAsyncSafeState(intialValue) {
  const mountedRef = useRef(false);
  const [state, setState] = useState(intialValue);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetState = useCallback(
    (update) => {
      if (mountedRef.current) {
        setState(update);
      }
    },
    [setState]
  );

  return [state, safeSetState];
}

export default useAsyncSafeState;
