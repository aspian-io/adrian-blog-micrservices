import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IUser } from '../../models/auth';
import { store } from '../../store';
import { setCurrentUser } from '../../store/actions';
import Router from 'next/router';

export const requestInterceptorHandleSuccess = async (
  config: AxiosRequestConfig
) => {
  if ( store.getState().auth.user.jwtToken === null && window.location.pathname !== '/signin' ) {
    try {
      const response = await axios
        .create()
        .get<IUser>( '/users/refresh-token' );
      store.dispatch( setCurrentUser( response.data ) );
      config.headers.Authorization = response.data.jwtToken;
    } catch ( error ) {
      store.dispatch( setCurrentUser( null ) );
      Router.push( 'auth/signin' );
    } finally {
      return config;
    }
  }
  config.headers.Authorization = store.getState().auth.user.jwtToken;
  return config;
};

export const requestInterceptorHandleError = ( error: any ) => {
  return Promise.reject( error );
};