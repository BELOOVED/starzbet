import { type IRpcClient } from "@sb/network-bus/RpcClient";
import { type createRpcGlobalErrorHandler } from "./CreateRpcGlobalErrorHandler";

class RpcClientWithGlobalErrorHandler implements IRpcClient {
  constructor(private rpcClient: IRpcClient, private globalErrorHandler: ReturnType<typeof createRpcGlobalErrorHandler>) {}

  public async call(...args: Parameters<IRpcClient["call"]>) {
    return this.rpcClient.call(...args).catch((e) => this.globalErrorHandler(args[1], args[0])(e));
  }
}

export { RpcClientWithGlobalErrorHandler };
