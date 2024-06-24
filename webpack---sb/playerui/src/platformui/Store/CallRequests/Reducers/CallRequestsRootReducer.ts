import { createRootReducer } from "@sb/utils";
import {
  callRequestsCallOptionsReceivedAction,
  callRequestsNextPageAction,
  callRequestsPrevPageAction,
  callRequestsReceivedAction,
  callRequestsSlotsReceivedAction,
} from "../CallRequestsActions";
import { callRequestsNextPageReducer } from "./CallRequestsNextPageReducer";
import { callRequestsPrevPageReducer } from "./CallRequestsPrevPageReducer";
import { callRequestsSlotsReceivedReducer } from "./CallRequestsSlotsReceivedReducer";
import { callRequestsCallOptionsReceivedReducer } from "./CallRequestsCallOptionsReceivedReducer";
import { callRequestsReceivedReducer } from "./CallRequestsReceivedReducer";

const callRequestsRootReducer = createRootReducer([
  [callRequestsReceivedReducer, callRequestsReceivedAction],
  [callRequestsSlotsReceivedReducer, callRequestsSlotsReceivedAction],
  [callRequestsCallOptionsReceivedReducer, callRequestsCallOptionsReceivedAction],
  [callRequestsNextPageReducer, callRequestsNextPageAction],
  [callRequestsPrevPageReducer, callRequestsPrevPageAction],
]);

export { callRequestsRootReducer };
