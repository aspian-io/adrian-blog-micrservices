import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import { LocaleVariableEnum } from '../app/store/actions';

// aspian-blog ---> US-en translation files
import blog__common_en_US from './en/blog/common/common.json';
import blog__menu_en_US from './en/blog/layout/header/menu/menu.json';
import blog__home_en_US from './en/blog/home/home.json';

// aspian-blog ---> IR-fa translation files
import blog__common_fa_IR from './fa/blog/common/common.json';
import blog__menu_fa_IR from './fa/blog/layout/header/menu/menu.json';
import blog__home_fa_IR from './fa/blog/home/home.json';

const ISSERVER = typeof window === "undefined";

const lng: string =
  !ISSERVER && localStorage.getItem( LocaleVariableEnum.ASPIAN_LANG )
    ? localStorage.getItem( LocaleVariableEnum.ASPIAN_LANG )!
    : 'en';

i18n
  .use( initReactI18next )
  .use( LanguageDetector )
  .init( {
    debug: false,
    lng,
    fallbackLng: 'en', // use en if detected lng is not available

    //keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    resources: {
      en: {
        blog_common: blog__common_en_US,
        blog_menu: blog__menu_en_US,
        blog_home: blog__home_en_US
      },
      fa: {
        blog_common: blog__common_fa_IR,
        blog_menu: blog__menu_fa_IR,
        blog_home: blog__home_fa_IR
      },
    },
    // have a common namespace used around the full app
    // ns: ['postDetails', 'translations'],
    // defaultNS: 'translations',
  } );

export default i18n;