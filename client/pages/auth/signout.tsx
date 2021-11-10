import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { signout } from '../../src/app/store/actions';
import { useDispatch } from 'react-redux';

const Signout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signout());
  }, [dispatch]);

  return <div>Signing you out...</div>;
};

export default Signout;
