import { useCallback, useState } from 'react';

type UseApi<T> = [T | undefined, Error | undefined, Function, boolean];

function useApi<T>(request: Function): UseApi<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [isLoading, setLoading] = useState(false);

  const callRequest = useCallback(
    async (data?: object) => {
      setLoading(true);
      try {
        const result = await request(data);
        setData(result);
        return { data: result };
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error());
        }

        return { err };
      } finally {
        setLoading(false);
      }
    },
    [request, setData, setError, setLoading],
  );

  return [data, error, callRequest, isLoading];
}

export default useApi;
