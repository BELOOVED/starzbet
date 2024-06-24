import { type Action } from "redux";
import { type IFinishedEvent } from "@sb/betting-core/Feed/FinishedEvents/UpdateFinishedEvents";

const prefix = "@FINISHED_EVENTS";

const FinishedEventsBatchLoadAction = (events: IFinishedEvent[]) => ({
  type: `${prefix}/LOAD_BATCH`,
  payload: {
    events,
  },
});

const FinishedEventsBatchUploadAction = (): Action => ({
  type: `${prefix}/UPLOAD_BATCH`,
});

export {
  FinishedEventsBatchLoadAction,
  FinishedEventsBatchUploadAction,
};
