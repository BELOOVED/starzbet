import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { userMessageDetailsMatchOptions } from "../../PlatformMatchOptions";
import { userMessageDetailedMessageIdSelector, userMessageIsDetailedMessageExistSelector } from "../UserMessageSelectors";
import { userMessageDetailsCombinedEpicFactory } from "./UserMessageDetailsCombinedEpicFactory";

const userMessageDetailsRouteEpic = routerEpic({
  name: "user_message_details",
  match: getMatch<IWithId>(userMessageDetailsMatchOptions),
  onStart: () => userMessageDetailsCombinedEpicFactory(userMessageDetailedMessageIdSelector, userMessageIsDetailedMessageExistSelector),
  shouldRestart: restartOnParamsChanged,
});

export { userMessageDetailsRouteEpic };
