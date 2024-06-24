import type { Dispatch } from "redux";
import { type IAppEpicDependencies } from "../Store/Root/Epics/TAppEpic";

const getDispatch = (deps: IAppEpicDependencies): Dispatch => deps.getDispatch();

export { getDispatch };
