import React, { FC } from 'react';
import {
  DirectionActionTypeEnum,
  handleChangeLanguage,
  LanguageActionTypeEnum,
  signout,
} from '../../../../../../app/store/actions';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../../../../../app/store/rootReducerTypes';
import Image from 'next/image';
import Logo from '../../../../../../assets/Logo.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IUser } from '../../../../../../app/models/auth';

interface IProps {
  currentUser?: IUser;
}

const AdrianHeader: FC<IProps> = ({ currentUser }) => {
  const locale = useSelector(({ locale }: IStoreState) => locale);

  const { lang, dir } = locale;
  const dispatch = useDispatch();
  const router = useRouter();
  let currentLocale = router.locale;

  const { t } = useTranslation('menu');

  const onLangChange = (v: LanguageActionTypeEnum) => {
    dispatch(handleChangeLanguage(v));
  };

  const onClickSignout = () => {
    dispatch(signout());
  };

  return (
    <header id="header">
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark py-3">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a href="#" className="navbar-brand">
            <Image src={Logo} alt="Adrian" width={50} height={50} />
          </a>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#home" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#learn" className="nav-link">
                  What You&apos;ll Learn
                </a>
              </li>
              <li className="nav-item">
                <a href="#questions" className="nav-link">
                  Questions
                </a>
              </li>
              <li className="nav-item">
                <a href="#instructors" className="nav-link">
                  Instructors
                </a>
              </li>
            </ul>
          </div>
          {!currentUser && (
            <div>
              <Link href="/auth/signin">
                <a>
                  <button className="btn btn-outline-success btn-sm">
                    Login
                  </button>
                </a>
              </Link>
              <Link href="/auth/signup">
                <a className="ms-2">
                  <button className="btn btn-info btn-sm">Sign-up</button>
                </a>
              </Link>
            </div>
          )}

          {!!currentUser && (
            <div className="dropdown">
              <button
                className="btn btn-primary btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Image
                  className="rounded-circle"
                  src="https://randomuser.me/api/portraits/men/15.jpg"
                  alt="user-photo"
                  width={32}
                  height={32}
                />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    href="#"
                    className="dropdown-item"
                    onClick={onClickSignout}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AdrianHeader;
