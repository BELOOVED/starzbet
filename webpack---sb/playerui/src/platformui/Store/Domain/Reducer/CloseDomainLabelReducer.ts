import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type closeDomainLabelAction } from "../DomainActions";

const closeDomainLabelReducer: TReducer<TPlatformAppState, typeof closeDomainLabelAction> = (
  state,
) => ({
  ...state,
  showLabel: false,
});

export { closeDomainLabelReducer };
