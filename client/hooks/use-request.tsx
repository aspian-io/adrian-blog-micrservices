import axios, { Method } from 'axios';
import { ReactElement, useState } from 'react';

/**
 * @template T - T must be type of the result
 * @template I - I must be type of the body
 * @param url - Url for request
 * @param method - Axios method
 * @param {I} body - Body of data to send through axios
 * @callback onSuccess - Get the result if axios operation is successful
 * @return { doRequest: () => Promise<T>;
 *             errors: ReactElement<any, any>;
 *             errorFields: string[];
 *           } - An object composed of result of axios request
 */
const useRequest = <T, I>(params: {
  url: string;
  method: Method;
  body: I;
  onSuccess?: (data: T) => void;
}): {
  doRequest: () => Promise<T>;
  errors: ReactElement<any, any>;
  errorFields: string[];
} => {
  const [errors, setErrors] = useState<ReactElement<any, any> | null>(null);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const doRequest: () => Promise<T> = async () => {
    try {
      setErrors(null);
      setErrorFields([]);

      const { data }: { data: T } = await axios[params.method]<T>(
        params.url,
        params.body
      );

      if (params.onSuccess) {
        params.onSuccess(data);
      }

      return data;
    } catch (error) {
      console.log('error object: ', error);
      setErrors(
        <div className="alert text-start alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {error.response?.data?.errors.map(
              (err: { message?: string; field?: string }, idx: number) => {
                {
                  setErrorFields((prevState) => [...prevState, err.field]);
                }
                return <li key={idx}>{err.message}</li>;
              }
            )}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors, errorFields };
};

export default useRequest;
