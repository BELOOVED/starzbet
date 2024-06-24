import { createSimpleSelector, useParamSelector } from "@sb/utils";
import { eventByIdSelector } from "../../../Feed/Selectors/FeedSelectors";

const regexId = /(ID|Draw)\s*(\d*)/;
const regexName = /.+?(?=\s*\()/;

const getEventNameFromFullName = (fullName: string | undefined) => {
  if (!fullName) {
    return "";
  }

  const match = fullName.match(regexName);

  return match ? match[0] : "";
};

const getEventNumberFromFullName = (fullName: string | undefined) => {
  if (!fullName) {
    return "";
  }

  const match = fullName.match(regexId);

  return match ? match[2] : "";
};

const virtualGameFullEventNameSelector = createSimpleSelector(
  [eventByIdSelector],
  (event) => event?.extraInfo.eventName,
);

const virtualGameEventNameSelector = createSimpleSelector(
  [virtualGameFullEventNameSelector],
  (eventName) => getEventNameFromFullName(eventName),
);

const useVirtualGameEventNameSelector = (eventId: string) => useParamSelector(virtualGameEventNameSelector, [eventId]);

const virtualGameEventNumberIdSelector = createSimpleSelector(
  [virtualGameFullEventNameSelector],
  (eventName) => getEventNumberFromFullName(eventName),
);

const useVirtualGameEventNumberIdSelector = (eventId: string) => useParamSelector(virtualGameEventNumberIdSelector, [eventId]);

export {
  useVirtualGameEventNumberIdSelector,
  useVirtualGameEventNameSelector,
  getEventNameFromFullName,
  getEventNumberFromFullName,
};
