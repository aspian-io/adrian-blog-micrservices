// import type { NextComponentType, NextPageContext } from 'next';
// import type { Router } from 'next/router';
import { IUser } from './src/app/models/auth';

// declare module 'next/app' {
//   type AppProps<R extends NextRouter = NextRouter, P = {}> = AppInitialProps & {
//     Component: NextComponentType<NextPageContext, any, P>;
//     router: R;
//     __N_SSG?: boolean;
//     __N_SSP?: boolean;
//     pageProps: P & {
//       /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
//       currentUser: IUser | null;
//     };
//   };
// }

// declare module 'next/app' {
//   type AppInitialProps = {
//     pageProps: any & {
//       currentUser?: IUser;
//     }

//   };
// }