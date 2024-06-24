import { type AnyAction } from "redux";
import { isString } from "@sb/utils";
import { type IFormAction } from "../Types";
import { mountFormAction } from "../Store";

const isFormAction = (action: AnyAction): action is IFormAction => isString(action.metadata?.formName);

const isMountFormAction = (action: AnyAction): action is ReturnType<typeof mountFormAction> =>
// @ts-ignore for action creator arguments
  isFormAction(action) && action.type === mountFormAction().type;

export {
  isFormAction,
  isMountFormAction,
};
