import { createRootReducer } from "@sb/utils";
import { closeDomainLabelAction, currentDomainReceiveAction } from "../DomainActions";
import { currentDomainReceiveReducer } from "./CurrenDomainReceiveReducer";
import { closeDomainLabelReducer } from "./CloseDomainLabelReducer";

const domainRootReducer = createRootReducer([
  [currentDomainReceiveReducer, currentDomainReceiveAction],
  [closeDomainLabelReducer, closeDomainLabelAction],
]);

export { domainRootReducer };
