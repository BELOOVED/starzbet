import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { userMessagesMatchOptions } from "../../PlatformMatchOptions";
import { userMessageLoadInitialMessagesEpic } from "./UserMessageLoadInitialMessagesEpic";

const userMessageRouteEpic = routerEpic({
  name: "user_message",
  match: getMatch(userMessagesMatchOptions),
  onStart: () => userMessageLoadInitialMessagesEpic,
});

export { userMessageRouteEpic };
