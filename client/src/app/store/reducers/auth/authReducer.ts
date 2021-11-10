import { IAuthStateType } from "./authReducerTypes";
import { UserAction, UserActionTypes } from "../../actions";

const initialState: IAuthStateType = {
  user: null,
  submitting: false,
  loginError: '',
  isAppLoaded: false,
  authErrors: [],
  authErrorsDisplayHook: null,
}

export const authReducer = ( state = initialState, action: UserAction ) => {
  const { type, payload } = action;

  switch ( type ) {
    case UserActionTypes.USER_SUBMITTING:
      return { ...state, ...payload };
    case UserActionTypes.SIGNIN:
      return { ...state, ...payload };
    case UserActionTypes.SIGNUP:
      return { ...state, ...payload };
    case UserActionTypes.GET_CURRENT_USER:
      return { ...state, ...payload };
    case UserActionTypes.SET_CURRENT_USER:
      return { ...state, ...payload };
    case UserActionTypes.SET_APP_LOADED:
      return { ...state, ...payload };
    case UserActionTypes.SIGNOUT:
      return { ...state, ...payload };
    case UserActionTypes.SET_ERRORS_DISPLAY_HOOK:
      return { ...state, ...payload };
    case UserActionTypes.SET_AUTH_ERRORS:
      return { ...state, ...payload };
    default:
      return state;
  }
}