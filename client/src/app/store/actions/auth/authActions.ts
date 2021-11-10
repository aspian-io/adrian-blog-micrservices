import { IUser, IUserFormValues } from "../../../models/auth";
import { Dispatch } from "redux";
import { authAgent } from "../../../api/agent";
import {
  IGetCurrentUserAction,
  ISigninAction,
  ISignupAction,
  ILogoutAction,
  ISetAppLoadedAction,
  IUserSubmittingAction,
  UserActionTypes
} from "./authActionTypes";
import Router from 'next/router';
import { ReactElement } from "react";
import { ISetAuthErrorsAction, ISetCurrentUserAction, ISetErrorsDisplayHookAction } from "..";


// Submitting (loading indicator) action
export const setUserSubmitting = ( submitting: boolean = false ): IUserSubmittingAction => {
  return {
    type: UserActionTypes.USER_SUBMITTING,
    payload: { submitting }
  }
}

// Signup Action
export const signup = ( values: IUserFormValues ) => async ( dispatch: Dispatch ) => {
  try {
    dispatch( setUserSubmitting( true ) );
    const user = await authAgent.signup( values );

    Router.push( '/' );

    dispatch<ISignupAction>( {
      type: UserActionTypes.SIGNUP,
      payload: {
        user,
        submitting: false,
        authErrors: [],
      }
    } );

  } catch ( error ) {
    console.log( error );

    const errors: { message: string, field: string }[] = [];

    error.response?.data?.errors.map(
      ( err: { message: string, field: string }, idx: number ) => {
        errors.push( err );
      }
    )

    dispatch<ISignupAction>( {
      type: UserActionTypes.SIGNUP,
      payload: {
        user: null,
        submitting: false,
        authErrors: errors,
      }
    } );
  }
}

// Signin Action
export const signin = ( values: IUserFormValues ) => async ( dispatch: Dispatch ) => {
  dispatch( setUserSubmitting( true ) );
  try {
    const user = await authAgent.signin( values );

    Router.push( '/' );

    dispatch<ISigninAction>( {
      type: UserActionTypes.SIGNIN,
      payload: {
        user,
        submitting: false,
        authErrors: [],
      }
    } );

  } catch ( error ) {
    const errors: { message: string, field: string }[] = [];

    error.response?.data?.errors.map(
      ( { message, field }: { message: string, field: string }, idx: number ) => {
        errors.push( { message, field } );
      }
    )

    dispatch<ISigninAction>( {
      type: UserActionTypes.SIGNIN,
      payload: {
        user: null,
        submitting: false,
        authErrors: errors,
      }
    } );
  }
}

export const getCurrentUser = () => async ( dispatch: Dispatch ) => {
  dispatch( setUserSubmitting( true ) );
  try {
    const user = await authAgent.currentUser();

    dispatch<IGetCurrentUserAction>( {
      type: UserActionTypes.GET_CURRENT_USER,
      payload: { user }
    } );
  } catch ( error ) {
    //Router.push('/signin');
    console.log( error.message );
  } finally {
    dispatch( setUserSubmitting( false ) );
  }
}

export const setAppLoaded = ( isAppLoaded: boolean = true ): ISetAppLoadedAction => {
  return {
    type: UserActionTypes.SET_APP_LOADED,
    payload: { isAppLoaded }
  }
}

export const signout = () => async ( dispatch: Dispatch ) => {
  dispatch( setUserSubmitting( true ) );
  try {
    dispatch( setAppLoaded( false ) );
    await authAgent.signout();

    dispatch<ILogoutAction>( {
      type: UserActionTypes.SIGNOUT,
      payload: {
        user: null,
        isAppLoaded: true,
      }
    } );
    Router.push( '/' );
  } catch ( error ) {
    console.log( error );
    dispatch( setAppLoaded( true ) );
  } finally {
    dispatch( setUserSubmitting( false ) );
  }
}

export const setErrorsHook = ( authErrorsDisplayHook: ReactElement<any, any> | null = null ): ISetErrorsDisplayHookAction => {
  return {
    type: UserActionTypes.SET_ERRORS_DISPLAY_HOOK,
    payload: { authErrorsDisplayHook }
  }
}

export const setAuthErrors = ( authErrors: { message?: string, field?: string }[] = [] ): ISetAuthErrorsAction => {
  return {
    type: UserActionTypes.SET_AUTH_ERRORS,
    payload: { authErrors }
  }
}

export const setCurrentUser = ( user: IUser ): ISetCurrentUserAction => {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: { user }
  }
}