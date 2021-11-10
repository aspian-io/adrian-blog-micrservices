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
import styles from '../../styles/Signup.module.scss';
import logo from '../../src/assets/Logo.svg';
import authImg from '../../src/assets/img/authentication.svg';
import { signup } from '../../src/app/store/actions';
import { IUser } from '../../src/app/models/auth';
import AdrianSpinner from '../../src/blog/templates/adrian/components/layout/spinner/AdrianSpinner';
import DisplayErrors from '../../hooks/display-errors';
import { IStoreState } from '../../src/app/store/rootReducerTypes';

interface IProps {
  currentUser: IUser;
}

const Signup: NextPage<IProps> = ({ currentUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameIsInvalid, setFirstNameIsInvalid] = useState(false);
  const [lastNameIsInvalid, setLastNameIsInvalid] = useState(false);
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const authErrors = useSelector(({ auth }: IStoreState) => auth.authErrors);

  const dispatch = useDispatch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signup({ firstName, lastName, email, password }));
    //doRequest();
  };

  useEffect(() => {
    dispatch(setNavbarVisibility(false));
    !!currentUser && Router.replace('/');

    authErrors.filter((ae) => ae.field === 'firstName').length > 0
      ? setFirstNameIsInvalid(true)
      : setFirstNameIsInvalid(false);
    authErrors.filter((ae) => ae.field === 'lastName').length > 0
      ? setLastNameIsInvalid(true)
      : setLastNameIsInvalid(false);
    authErrors.filter((ae) => ae.field === 'email').length > 0
      ? setEmailIsInvalid(true)
      : setEmailIsInvalid(false);
    authErrors.filter((ae) => ae.field === 'password').length > 0
      ? setPasswordIsInvalid(true)
      : setPasswordIsInvalid(false);

    return () => {
      dispatch(setNavbarVisibility(true));
    };
  }, [authErrors, currentUser, dispatch]);

  return (
    <>
      {!!currentUser ? (
        <AdrianSpinner />
      ) : (
        <div
          className="container-fluid text-center"
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <div className="row">
            <div className="col-md-8 d-none d-md-flex align-items-center justify-content-center vh-100 bg-primary">
              <div>
                <h1 className="text-light">Sign-up</h1>
                <p className="text-light lead">
                  Please sign up by filling out the register form
                </p>
                <Image
                  className="mb-2"
                  src={authImg}
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
              <form className={styles.formSignup} onSubmit={onSubmit}>
                <Image
                  className="mb-2"
                  src={logo}
                  alt="logo"
                  width="72"
                  height="72"
                />
                <h1 className="h3 mb-3 fw-normal">Register Form</h1>
                <DisplayErrors />
                <div className="form-floating">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`form-control ${styles.firstName} ${
                      firstNameIsInvalid ? ' is-invalid' : ''
                    }`}
                    id="floatingFirstName"
                    placeholder="First Name"
                  />
                  <label htmlFor="floatingFirstName">First Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`form-control ${styles.lastName} ${
                      lastNameIsInvalid ? ' is-invalid' : ''
                    }`}
                    id="floatingLastName"
                    placeholder="Last Name"
                  />
                  <label htmlFor="floatingLastName">Last Name</label>
                </div>
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
                  <label className="checkbox-label">
                    <input type="checkbox" value="terms-and-conditions" /> I
                    agree to <Link href="#">terms & conditions</Link> and{' '}
                    <Link href="#">privacy policy</Link>
                  </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  Sign-up
                </button>
                <p className="mt-5 mb-3 text-muted">
                  Have already an account?{' '}
                  <Link href="/auth/signin">
                    <a onClick={() => dispatch(setAuthErrors([]))}>
                      Login here
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

export default Signup;
