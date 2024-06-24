import type { TStreaming_Channel_Fragment } from "@sb/graphql-client/PlayerUI";

interface IStreamingChannelsState {
  data: TStreaming_Channel_Fragment[];
}

interface IWithStreamingChannelsState {
  streamingChannels: IStreamingChannelsState;
}

const streamingChannelsState: IWithStreamingChannelsState = {
  streamingChannels: {
    data: [],
  },
};

export { streamingChannelsState, type IWithStreamingChannelsState };
