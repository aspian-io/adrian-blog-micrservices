import { ILayoutStateType } from "./reducers/layout/layoutReducerTypes";
import { ILocaleStateType } from "./reducers/locale/localeReducerTypes";
import {IAuthStateType} from "./reducers/auth/authReducerTypes";

export interface IStoreState {
    locale: ILocaleStateType;
    layout: ILayoutStateType;
    auth: IAuthStateType;
}