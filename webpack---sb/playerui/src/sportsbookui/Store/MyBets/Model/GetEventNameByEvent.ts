import { type IFlatEvent } from "@sb/betting-core/Feed/Types";
import { sortBy } from "../../../Utils/SortBy";

const getEventNameByEvent = (event: IFlatEvent) => (
  sortBy(([type]) => type, Object.entries(event.participants)).map(([_, { name }]) => name).join(" - ")
);

export { getEventNameByEvent };
