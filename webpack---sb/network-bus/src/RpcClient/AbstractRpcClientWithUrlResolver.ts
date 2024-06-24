import { IRpcClient } from "./IRpcClient";
import { IMetadata } from "../Model/IMetadata";
import { ISetting } from "../Model/ISetting";

abstract class AbstractRpcClientWithUrlResolver implements IRpcClient {
  abstract callWithUrlResolver<T = any, U = any>(request: T, uri: string, metadata?: IMetadata, settings?: ISetting): Promise<U>;

  call<T = any, U = any, M extends IMetadata = any>(request: T, uri: string, proxyLocation?: string, metadata?: M, settings?: ISetting): Promise<U> {
    return this.callWithUrlResolver(request, uri, metadata, settings);
  }
}

export { AbstractRpcClientWithUrlResolver };
