import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthErrors, setErrorsHook } from '../src/app/store/actions';
import { IStoreState } from '../src/app/store/rootReducerTypes';

const DisplayErrors = () => {
  const authErrors = useSelector(({ auth }: IStoreState) => auth.authErrors);
  const authErrorsDisplayHook = useSelector(
    ({ auth }: IStoreState) => auth.authErrorsDisplayHook
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const errorJsxBlock = (
      <div className="alert text-start alert-danger">
        <h4>Oops...</h4>
        <ul className="my-0">
          {authErrors?.map(
            (err: { message: string; field: string }, idx: number) => {
              return <li key={idx}>{err.message}</li>;
            }
          )}
        </ul>
      </div>
    );
    authErrors.length > 0
      ? dispatch(setErrorsHook(errorJsxBlock))
      : dispatch(setErrorsHook(null));

  }, [authErrors, authErrors.length, dispatch]);

  return authErrorsDisplayHook;
};

export default DisplayErrors;
