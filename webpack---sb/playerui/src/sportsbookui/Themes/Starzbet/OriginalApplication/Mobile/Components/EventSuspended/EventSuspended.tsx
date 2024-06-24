// @ts-nocheck
import { memo } from "react";
import { sportsbookui_starzbet_eventSuspended_sorryThisEventIsNoLongerAvailable } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { Empty } from "../../../../../../../common/Themes/Starzbet/Components/Empty/Empty";

const EventSuspended = memo(() => (
  <Empty messageTKey={sportsbookui_starzbet_eventSuspended_sorryThisEventIsNoLongerAvailable} />
));
EventSuspended.displayName = "EventSuspended";

export { EventSuspended };
