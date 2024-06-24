import { withProps } from "@sb/utils";
import { userMessagePropertySelectors } from "../../../../../Store/UserMessage/UserMessageSelectors";
import { Counter } from "../../Counter/Counter";

const UserMessageUnseenCounter = withProps(Counter)({
  selector: userMessagePropertySelectors.unseenCount,
});

export { UserMessageUnseenCounter };
