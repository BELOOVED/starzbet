import { type IRpcClient } from "@sb/network-bus/RpcClient";
import { type IWithId } from "@sb/utils";
import { type TEventStatistics } from "../Model/IEventStatistics";

const call_getEventStatistics = (rpcClient: IRpcClient, eventId: string) =>
  rpcClient
    .call<IWithId, TEventStatistics>(
      { id: eventId },
      "sumstats.statistics.get_event_statistics",
    );

export { call_getEventStatistics };
