import {AnyAction, ActionCreator} from "redux";

export const getType = (creator: ActionCreator<AnyAction>) => creator().type;
