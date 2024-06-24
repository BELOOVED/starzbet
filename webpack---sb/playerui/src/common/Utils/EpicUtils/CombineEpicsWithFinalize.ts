import { combineEpicsWithFinalizeFactory } from "@sb/utils/EpicUtils/CombineParamEpics";
import { getDispatch } from "../DepsUtils";

const combineEpicsWithFinalize = combineEpicsWithFinalizeFactory(getDispatch);

// todo uncomment until first usage
// const combineParamEpicsWithFinalize = combineParamEpicsWithFinalizeFactory(getDispatch);
// const epicWithFinalize = epicWithFinalizeFactory(getDispatch);
// const paramEpicWithFinalize = paramEpicWithFinalizeFactory(getDispatch);

export {
  combineEpicsWithFinalize,
};
