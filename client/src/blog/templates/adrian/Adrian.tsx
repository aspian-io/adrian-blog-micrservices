import React, { FC, useEffect, Children } from 'react';
import { useRouter } from 'next/router';
import { ILocaleStateType } from '../../../app/store/reducers/locale/localeReducerTypes';
import { IStoreState } from '../../../app/store/rootReducerTypes';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  DirectionActionTypeEnum,
  LanguageActionTypeEnum,
  LocaleVariableEnum,
} from '../../../app/store/actions';
import { handleChangeLanguage } from '../../../app/store/actions';
import AdrianHeader from './components/layout/header/AdrianHeader';

const Aspian = () => {
  const locale = useSelector(({ locale }: IStoreState) => locale);
  const dispatch = useDispatch();

  const { lang, dir } = locale;
  let enUS, faIR;

  const localStorageLang = (): LanguageActionTypeEnum => {
    const localStorageInitialLang =
      localStorage.getItem(LocaleVariableEnum.ADRIAN_LANG) !== null
        ? (localStorage.getItem(
            LocaleVariableEnum.ADRIAN_LANG
          ) as keyof typeof LanguageActionTypeEnum)
        : LanguageActionTypeEnum.EN;

    // Convert local storage string value to enum for language and saving it in initialLang const for further usage
    return LanguageActionTypeEnum[localStorageInitialLang];
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      //
    }
  }, []);

  const router = useRouter();
  let currentLocale = router.locale;

  return <AdrianHeader />;
};

export default Aspian;
