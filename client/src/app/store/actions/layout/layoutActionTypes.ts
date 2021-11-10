////////////////////////
/// Root Action Type ///
////////////////////////
export type LayoutAction = IHandleNavbarVisibilityAction;

/////////////
/// Types ///
/////////////
export enum LayoutActionTypes {
  NAVBAR_VISIBILITY = "NAVBAR_VISIBILITY",
}

////////////////////
/// Action Types ///
////////////////////
export interface IHandleNavbarVisibilityAction {
  type: LayoutActionTypes.NAVBAR_VISIBILITY;
  payload: {
    navbar: boolean
  };
}