import { combineEpics } from "redux-observable";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { singleEventSubscribeEpic } from "./SingleEventSubscribeEpic";
import { multiEventSubscribeEpic } from "./MultiEventSubscribeEpic";

const eventSubRootEpic: TAppEpic = combineEpics(
  singleEventSubscribeEpic,
  multiEventSubscribeEpic,
);

export { eventSubRootEpic };
