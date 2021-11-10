import {DirectionActionTypeEnum, LanguageActionTypeEnum} from "../../actions";

export interface ILocaleStateType {
    readonly lang: LanguageActionTypeEnum;
    readonly dir: DirectionActionTypeEnum;
    readonly isLangBtnDisabled: boolean;
}