import { ReactElement } from "react";
import { IUser } from "../../../models/auth";

////////////////////////
/// Root Action Type ///
////////////////////////
export type UserAction =
  ISigninAction
  | ISignupAction
  | IUserSubmittingAction
  | IGetCurrentUserAction
  | ISetCurrentUserAction
  | ISetAppLoadedAction
  | ILogoutAction
  | ISetErrorsDisplayHookAction
  | ISetAuthErrorsAction;

/////////////
/// Types ///
/////////////
export enum UserActionTypes {
  SIGNIN = "SIGNIN",
  SIGNUP = "SIGNUP",
  USER_SUBMITTING = "USER_SUBMITTING",
  GET_CURRENT_USER = "GET_CURRENT_USER",
  SET_CURRENT_USER = "SET_CURRENT_USER",
  SET_APP_LOADED = "SET_APP_LOADED",
  SIGNOUT = "SIGNOUT",
  SET_ERRORS_DISPLAY_HOOK = "SET_ERRORS_DISPLAY_HOOK",
  SET_AUTH_ERRORS = "SET_AUTH_ERRORS",
}

////////////////////
/// Action Types ///
////////////////////
export interface IUserSubmittingAction {
  type: UserActionTypes.USER_SUBMITTING;
  payload: {
    submitting: boolean
  };
}

export interface ISigninAction {
  type: UserActionTypes.SIGNIN;
  payload: {
    user: IUser | null,
    submitting: boolean,
    authErrors: { message?: string, field?: string }[],
  };
}

export interface ISignupAction {
  type: UserActionTypes.SIGNUP;
  payload: {
    user: IUser | null,
    submitting: boolean,
    authErrors: { message?: string, field?: string }[],
  };
}

export interface IGetCurrentUserAction {
  type: UserActionTypes.GET_CURRENT_USER,
  payload: { user: IUser | null }
}

export interface ISetCurrentUserAction {
  type: UserActionTypes.SET_CURRENT_USER,
  payload: { user: IUser | null }
}

export interface ISetAppLoadedAction {
  type: UserActionTypes.SET_APP_LOADED,
  payload: { isAppLoaded: boolean }
}

export interface ILogoutAction {
  type: UserActionTypes.SIGNOUT,
  payload: {
    user: IUser | null,
    isAppLoaded: boolean,
  },
}

export interface ISetErrorsDisplayHookAction {
  type: UserActionTypes.SET_ERRORS_DISPLAY_HOOK,
  payload: { authErrorsDisplayHook: ReactElement<any, any> | null }
}

export interface ISetAuthErrorsAction {
  type: UserActionTypes.SET_AUTH_ERRORS,
  payload: { authErrors: { message?: string, field?: string }[] }
}