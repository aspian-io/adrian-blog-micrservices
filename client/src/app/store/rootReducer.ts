import { IStoreState } from "./rootReducerTypes";
import { combineReducers } from "redux";
import { localeReducer } from "./reducers/locale/localeReducer";
import { layoutReducer } from "./reducers/layout/layoutReducer";
import { authReducer } from "./reducers/auth/authReducer";

const reducers = combineReducers<IStoreState>( {
  locale: localeReducer,
  layout: layoutReducer,
  auth: authReducer,
} );

export default reducers;