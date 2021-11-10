import { Dispatch } from "redux";
import { DirectionActionTypeEnum, IHandleChangeLanguageAction, ISetIsLangBtnDisabledAction, LanguageActionTypeEnum, LocaleActionTypes, LocaleVariableEnum } from "..";

export const handleChangeLanguage = ( lang: LanguageActionTypeEnum = LanguageActionTypeEnum.EN ) => ( dispath: Dispatch ) => {
  localStorage.setItem( LocaleVariableEnum.ADRIAN_LANG, lang );

  // For English language
  if ( lang === LanguageActionTypeEnum.EN ) {
    localStorage.setItem(
      LocaleVariableEnum.ADRIAN_DIR,
      DirectionActionTypeEnum.LTR
    );
    dispath<IHandleChangeLanguageAction>( {
      type: LocaleActionTypes.CHANGE_LANGUAGE,
      payload: {
        lang,
        dir: DirectionActionTypeEnum.LTR
      }
    } )
  }

  // For Persian (Farsi) language
  if ( lang === LanguageActionTypeEnum.FA ) {
    localStorage.setItem(
      LocaleVariableEnum.ADRIAN_DIR,
      DirectionActionTypeEnum.RTL
    );
    dispath<IHandleChangeLanguageAction>( {
      type: LocaleActionTypes.CHANGE_LANGUAGE,
      payload: {
        lang,
        dir: DirectionActionTypeEnum.RTL
      },
    } )
  }

}

export const setIsLangBtnDisabled = ( isLangBtnDisabled: boolean ): ISetIsLangBtnDisabledAction => {
  return {
    type: LocaleActionTypes.SET_IS_LANG_BTN_DISABLED,
    payload: { isLangBtnDisabled }
  }
}