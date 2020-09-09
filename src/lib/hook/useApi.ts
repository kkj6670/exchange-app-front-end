import React, { useCallback, useState } from 'react';

type IUseApi = [object[], Error|undefined, Function, boolean];

function useApi<T> (request: Promise<T>): IUseApi {
  const [data, setData] = useState<object[]>([]);
  const [error, setError] = useState<Error>();
  const [isLoading, setLoading] = useState(false);
  
  const callRequest = useCallback( async (data?: object) => {
    setLoading(true);
    try {
      // const result = await request(data);
      // setData(result.data);
      // return { data : result.data };
    } catch (err) {
      setError(err);
      err.alert();
      return { err };
    } finally {
      setLoading(false);
    }
  }, [request, setData, setError, setLoading]);

  return [data, error, callRequest, isLoading];
};

export default useApi;
