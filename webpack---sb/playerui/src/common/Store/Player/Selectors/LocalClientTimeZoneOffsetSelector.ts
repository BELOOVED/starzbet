import { Time } from "@sb/utils";

const localClientTimeZoneOffsetSelector = () =>
//TODO temporary disable player timezone
  Time.getClientTimezoneOffset();
export { localClientTimeZoneOffsetSelector };
