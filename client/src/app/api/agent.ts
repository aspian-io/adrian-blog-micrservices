import axios, { AxiosResponse } from 'axios';
import { IUser, IUserFormValues } from '../models/auth';
import Router from 'next/router';
import { store } from '../store';
import { setCurrentUser } from '../store/actions';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

if ( typeof window === 'undefined' ) {
  axios.defaults.baseURL = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api';
  axios.defaults.withCredentials = true;
}

// const instance = axios.create( {
//   baseURL: typeof window === 'undefined' ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api' : '/api',
//   headers: {
//     "Content-Type": "application/json",
//   },
// } );

axios.interceptors.request.use(
  async ( config ) => {
    if ( typeof window !== 'undefined' && Router.pathname !== "/auth/signin" ) {
      try {
        const response = await axios.create().get<IUser>( '/users/refresh-token' );
        store.dispatch( setCurrentUser( response.data ) );
        const token = response.data.jwtToken;
        if ( token ) {
          config.headers[ "Authorization" ] = token;  // for Spring Boot back-end
          //config.headers[ "x-access-token" ] = token; // for Node.js Express back-end
        }
      } catch ( error ) {
        return config
      }
    }
    return config;
  },
  ( error ) => {
    return Promise.reject( error );
  }
);

axios.interceptors.response.use(
  ( res ) => {
    return res;
  },
  async ( err ) => {
    const originalConfig = err.config;

    if ( typeof window !== 'undefined' && originalConfig.url !== "/auth/signin" && err.response ) {
      // Access Token was expired
      if ( err.response.status === 401 && !originalConfig._retry ) {
        originalConfig._retry = true;

        try {
          const rs = await axios.create().get<IUser>( "/users/refresh-token" );
          store.dispatch( setCurrentUser( rs.data ) );

          const token = rs.data.jwtToken;
          originalConfig.headers.Authorization = token;


          return axios( originalConfig );
        } catch ( _error ) {
          return Promise.reject( _error );
        }
      }
    }

    return Promise.reject( err );
  }
);

const responseBody = ( response: AxiosResponse ) => response.data;

const requests = {
  get: ( url: string, headers?: Record<string, string> ) => axios.get( url, { headers } ).then( responseBody ),
  post: ( url: string, body: {} ) =>
    axios.post( url, body ).then( responseBody ),
  put: ( url: string, body: {} ) =>
    axios.put( url, body ).then( responseBody ),
  del: ( url: string ) =>
    axios
      .delete( url )
      .then( responseBody ),
};

export const authAgent = {
  currentUser: ( headers?: Record<string, string> ): Promise<{ currentUser: IUser | null }> => ( requests.get( '/users/current-user', headers ) ),
  signin: ( user: IUserFormValues ): Promise<IUser> =>
    requests.post( '/users/signin', user ),
  signup: ( user: IUserFormValues ): Promise<IUser> =>
    requests.post( '/users/signup', user ),
  //refresh: (): Promise<IUser> => requests.get('/users/refresh-token'),
  signout: (): Promise<void> => requests.post( '/users/signout', {} ),
};