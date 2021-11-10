import type { NextPage } from 'next';
import Router from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthErrors,
  setNavbarVisibility,
} from '../../src/app/store/actions';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Signin.module.scss';
import logo from '../../src/assets/Logo.svg';
import loginImg from '../../src/assets/img/login.svg';
import { signin } from '../../src/app/store/actions';
import { IUser } from '../../src/app/models/auth';
import AdrianSpinner from '../../src/blog/templates/adrian/components/layout/spinner/AdrianSpinner';
import DisplayErrors from '../../hooks/display-errors';
import { IStoreState } from '../../src/app/store/rootReducerTypes';

interface IProps {
  currentUser: IUser;
}

const Signin: NextPage<IProps> = ({ currentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const authErrors = useSelector(({ auth }: IStoreState) => auth.authErrors);

  const dispatch = useDispatch();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signin({ email, password }));
  };

  useEffect(() => {
    dispatch(setNavbarVisibility(false));
    !!currentUser?.email && Router.replace('/');

    authErrors.filter((ae) => ae.field === 'email').length > 0
      ? setEmailIsInvalid(true)
      : setEmailIsInvalid(false);
    authErrors.filter((ae) => ae.field === 'password').length > 0
      ? setPasswordIsInvalid(true)
      : setPasswordIsInvalid(false);

    return () => {
      dispatch(setNavbarVisibility(true));
    };
  }, [authErrors, currentUser?.email, dispatch]);

  return (
    <>
      {!!currentUser?.email ? (
        <AdrianSpinner />
      ) : (
        <div
          className="container-fluid text-center"
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <div className="row">
            <div className="col-md-8 d-none d-md-flex align-items-center justify-content-center vh-100 bg-primary">
              <div>
                <h1 className="text-light">Login</h1>
                <p className="text-light lead">
                  Please login to our site through the login form
                </p>
                <Image
                  className="mb-2"
                  src={loginImg}
                  alt="Authentication Image"
                  width="600"
                  height="500"
                />
              </div>
            </div>
            <div className="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center vh-100">
              <div className="align-self-start justify-content-start mt-2">
                <Link href="/" passHref>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-house-fill"></i> Home
                  </button>
                </Link>
              </div>
              <form
                className={styles.formSignin}
                onSubmit={onSubmit}
                noValidate
              >
                <Image
                  className="mb-2"
                  src={logo}
                  alt="logo"
                  width="72"
                  height="72"
                />
                <h1 className="h3 mb-3 fw-normal">Login Form</h1>
                <DisplayErrors />
                <div className="form-floating">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-control${
                      emailIsInvalid ? ' is-invalid' : ''
                    }`}
                    id="floatingEmail"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-control${
                      passwordIsInvalid ? ' is-invalid' : ''
                    }`}
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className={`${styles.checkbox} mb-3 text-start`}>
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                  </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  Login
                </button>
                <p className={`${styles.footnote} mt-5`}>
                  <Link href="/auth/signup">Forgot your password?</Link>
                </p>
                <p className="text-muted">
                  Not a member?{' '}
                  <Link href="/auth/signup">
                    <a onClick={() => dispatch(setAuthErrors([]))}>
                      Signup now
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
