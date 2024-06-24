import { type IWithStreamingChannelsState } from "../StreamingChannelsState";
import { type receiveStreamingChannelsAction } from "../StreamingChannelsActions";

const receiveStreamingChannelsReducer = (
  state: IWithStreamingChannelsState,
  { payload: { data } }: ReturnType<typeof receiveStreamingChannelsAction>,
) => ({
  ...state,
  streamingChannels: { ...state.streamingChannels, data },
});

export { receiveStreamingChannelsReducer };
