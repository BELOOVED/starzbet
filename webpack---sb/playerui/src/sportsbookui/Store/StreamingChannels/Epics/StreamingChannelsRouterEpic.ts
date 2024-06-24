import { from } from "rxjs";
import { map } from "rxjs/operators";
import { query_Streaming_Channels, streamingChannelsQueryOptionalFields } from "@sb/graphql-client/PlayerUI";
import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { retryWithLog } from "../../../../common/Utils/EpicUtils/RetryWithLog";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { receiveStreamingChannelsAction } from "../StreamingChannelsActions";

const fetchStreamingChannelsEpic: TAppEpic = (action$, state$, { graphQLClient }) => (
  from(query_Streaming_Channels(graphQLClient, { optionalFields: streamingChannelsQueryOptionalFields, variables: {} })).pipe(
    map(({ streaming: { Channels } }) => receiveStreamingChannelsAction(Channels)),
    retryWithLog("[fetchStreamingChannelsEpic] error"),
  )
);

const streamingChannelsRouterEpic = routerEpic({
  name: "streamingChannels",
  match: getMatch({ path: routeMap.live.streaming }),
  onStart: () => fetchStreamingChannelsEpic,
});

export { streamingChannelsRouterEpic };
