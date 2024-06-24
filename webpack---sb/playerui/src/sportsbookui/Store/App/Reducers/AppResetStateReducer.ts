// @ts-nocheck
import { initialState } from "../../InitialState";

const appResetStateReducer = (state) => ({ ...state, ...initialState });

export { appResetStateReducer };
