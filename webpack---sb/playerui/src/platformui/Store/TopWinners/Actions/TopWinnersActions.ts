import { actionWithPayloadCreator } from "@sb/utils";
import type { TPlatform_TopWinner_Fragment } from "@sb/graphql-client/PlayerUI";

const PREFIX = "@PLATFORM/TOP_WINNERS";

const platformTopWinnersReceiveAction = actionWithPayloadCreator(PREFIX)(
  "RECEIVE",
  (topWinners: TPlatform_TopWinner_Fragment[]) => ({ topWinners }),
);

export { platformTopWinnersReceiveAction };
