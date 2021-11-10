import { LayoutAction, LayoutActionTypes } from "../../actions";
import { ILayoutStateType } from "./layoutReducerTypes";

const initialState: ILayoutStateType = {
  navbar: true
}

export const layoutReducer = ( state = initialState, action: LayoutAction ) => {
  switch ( action.type ) {
    case LayoutActionTypes.NAVBAR_VISIBILITY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}