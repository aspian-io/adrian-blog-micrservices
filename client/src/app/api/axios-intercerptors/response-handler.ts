import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import { IUser } from "../../models/auth";
import { store } from "../../store";
import { setCurrentUser } from "../../store/actions";

export const responseInterceptorHandleSuccess = ( response: AxiosResponse ) => {
  return response;
};

export const responseInterceptorHandleError = ( error: any ) => {
  if ( error?.message === 'Network Error' && !error.response ) {
    console.error( 'Network Error!' );
  }
  const originalRequest = error?.config;
  // if (status === 404) {
  //     history.push('/notfound');
  // }
  // if (status === 400 && !data.errors) {
  //     history.push('/badrequest');
  // }
  if (
    error?.response?.status === 401 &&
    error?.response?.config &&
    !error?.response?.config.__isRetryRequest &&
    window.location.pathname !== '/signin'
  ) {
    return new Promise( ( resolve, reject ) => {
      axios
        .create()
        .get<IUser>( '/users/refresh-token' )
        .then( ( response ) => {
          store.dispatch( setCurrentUser( response.data ) );
          originalRequest.__isRetryRequest = true;
          originalRequest.headers.Authorization = response.data.jwtToken;
          resolve( axios( originalRequest ) );
        } )
        .catch( ( error ) => {
          store.dispatch( setCurrentUser( null ) );
          Router.push( 'auth/signin' );
          window.location.reload();
          reject();
        } );
    } );
  }
  // if ( status === 403 ) {
  //   history.push( '/unauthorized403' );
  // }
  // if ( status === 500 ) {
  //   history.push( '/server-error' );
  // }
  throw error?.response;
};