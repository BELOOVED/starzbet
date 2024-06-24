import { getSelectOptions } from "../../../../../common/Components/Field/SelectModel";
import { type TSelfProtectionBaseModel } from "../../Model/SelfProtectionModel";

enum EAccountClosureReason {
  TIME = "TIME",
  INTERESTED = "INTERESTED",
  HAPPYSERVICE = "HAPPYSERVICE",
  HAPPYOFFERS = "HAPPYOFFERS",
  PLAY = "PLAY",
  PREFER = "PREFER",
}

const ACCOUNT_CLOSURE_REASON_OPTIONS = getSelectOptions(Object.values(EAccountClosureReason));

const ACCOUNT_CLOSURE_FORM = "accountClosure";

type TAccountClosureFormModel = TSelfProtectionBaseModel & {
  reason: EAccountClosureReason;
}

export type {
  TAccountClosureFormModel,
};
export {
  ACCOUNT_CLOSURE_FORM,
  ACCOUNT_CLOSURE_REASON_OPTIONS,
  EAccountClosureReason,
};
