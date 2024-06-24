import { createRootReducer } from "@sb/utils";
import { receiveStreamingChannelsAction } from "../StreamingChannelsActions";
import { receiveStreamingChannelsReducer } from "./ReceiveStreamingChannelsReducer";

const streamingChannelsRootReducer = createRootReducer([
  [receiveStreamingChannelsReducer, receiveStreamingChannelsAction],
]);

export { streamingChannelsRootReducer };
