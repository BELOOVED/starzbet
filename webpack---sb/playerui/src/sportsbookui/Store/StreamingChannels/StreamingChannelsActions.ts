import type { TStreaming_Channel_Fragment } from "@sb/graphql-client/PlayerUI";

const receiveStreamingChannelsAction = (data: TStreaming_Channel_Fragment[]) => ({
  type: "@STREAMING_CHANNELS/RECEIVE",
  payload: { data },
});

export {
  receiveStreamingChannelsAction,
};
