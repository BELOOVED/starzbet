import { createRootReducer } from "@sb/utils";
import { FinishedEventsBatchLoadAction, FinishedEventsBatchUploadAction } from "../FinishedEventsActions";
import { finishedEventsBatchFetchedReducer } from "./FinishedEventsFetchedReducer";
import { finishedEventsBatchUploadReducer } from "./FinishedEventsUploadReducer";

const finishedEventsRootReducer = createRootReducer([
  [finishedEventsBatchFetchedReducer, FinishedEventsBatchLoadAction],
  [finishedEventsBatchUploadReducer, FinishedEventsBatchUploadAction],
]);

export { finishedEventsRootReducer };
