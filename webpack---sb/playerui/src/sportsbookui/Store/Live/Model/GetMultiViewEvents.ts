import { isRecordOfString } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { sortBy } from "../../../Utils/SortBy";

interface IParams {
  events: string;
}

const getMultiViewEvents = (params: IParams): Record<string, string> | null => {
  try {
    const parsedEvents = JSON.parse(params.events);

    return isRecordOfString(parsedEvents) ? parsedEvents : null;
  } catch (e) {
    Logger.warn.app("getMultiViewEvents", e);

    return null;
  }
};

const getMultiViewEventIdList = (params: IParams): string[] => {
  const events = getMultiViewEvents(params);

  if (!events) {
    return [];
  }

  return sortBy((key: string) => key, Object.values(events));
};

export { getMultiViewEventIdList };
