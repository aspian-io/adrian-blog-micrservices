////////////////////////
/// Root Action Type ///
////////////////////////
export type LocaleAction = IHandleChangeLanguageAction | ISetIsLangBtnDisabledAction;

/////////////
/// Types ///
/////////////
export enum LocaleActionTypes {
  CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
  SET_IS_LANG_BTN_DISABLED = "SET_IS_LANG_BTN_DISABLED"
}

////////////////////
/// Action Types ///
////////////////////
export interface IHandleChangeLanguageAction {
  type: LocaleActionTypes.CHANGE_LANGUAGE;
  payload: {
    lang: LanguageActionTypeEnum,
    dir: DirectionActionTypeEnum
  };
}

export interface ISetIsLangBtnDisabledAction {
  type: LocaleActionTypes.SET_IS_LANG_BTN_DISABLED;
  payload: {
    isLangBtnDisabled: boolean
  };
}



// Enums
export enum LocaleVariableEnum {
  ADRIAN_LANG = 'ADRIAN_LANG',
  ADRIAN_DIR = 'ADRIAN_DIR',
}

export enum LanguageActionTypeEnum {
  EN = 'en',
  FA = 'fa',
}

export enum DirectionActionTypeEnum {
  LTR = 'ltr',
  RTL = 'rtl',
}