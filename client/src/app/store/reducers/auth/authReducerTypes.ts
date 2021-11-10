import { ReactElement } from "react";
import { IUser } from "../../../models/auth";

export interface IAuthStateType {
  readonly user: IUser | null;
  readonly submitting: boolean;
  readonly loginError: string;
  readonly isAppLoaded: boolean;
  readonly authErrors: { message?: string, field?: string }[];
  readonly authErrorsDisplayHook: ReactElement<any, any> | null;
}