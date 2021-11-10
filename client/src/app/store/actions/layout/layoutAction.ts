import { Dispatch } from 'redux';
import { IHandleNavbarVisibilityAction, LayoutActionTypes } from '..';

export const setNavbarVisibility = ( navbar: boolean ): IHandleNavbarVisibilityAction => {
  return {
    type: LayoutActionTypes.NAVBAR_VISIBILITY,
    payload: { navbar }
  }
}