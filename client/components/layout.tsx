import React, { FC, Fragment, useEffect } from 'react';
import AdrianHeader from '../src/blog/templates/adrian/components/layout/header/AdrianHeader';
import Head from 'next/head';
//import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../src/app/store/rootReducerTypes';
import {
  setAppLoaded,
} from '../src/app/store/actions';
import { NextPage } from 'next';
import { IUser } from '../src/app/models/auth';

interface IProps {
  currentUser: IUser;
}

const Layout: NextPage<IProps> = ({ children, currentUser }) => {
  const layout = useSelector(({ layout }: IStoreState) => layout);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      import('bootstrap');
    }
    // dispatch(getCurrentUser());
    dispatch(setAppLoaded(true));
  }, [dispatch]);

  // const router = useRouter();
  // const headerAllowed =
  //   !router.route.toLowerCase().includes('signup') &&
  //   !router.route.toLowerCase().includes('signin');

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {layout.navbar && <AdrianHeader currentUser={currentUser} />}
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
