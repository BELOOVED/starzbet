import { IRpcClient } from "./IRpcClient";
import { ISetting } from "../Model/ISetting";
import { IMetadata } from "../Model/IMetadata";
import { METADATA_HEADER_NAME } from "../Utils/Metadata";
import { appendUriToUrl } from "../Utils/AppendUriToUrl";
import { fetchCallClient } from "../Utils/FetchCallClient";

class HttpRpcClient implements IRpcClient {
  constructor(private proxyUrl: string, private metadataHeaderName: string = METADATA_HEADER_NAME) {
  }

  public call<T = any, U = any, M extends IMetadata = any>(request: T, uri: string, proxyLocation?: string, metadata?: M, settings?: ISetting): Promise<U> {
    const url = appendUriToUrl(this.proxyUrl + proxyLocation, uri);

    return fetchCallClient(request, url, uri, metadata, settings, this.metadataHeaderName);
  }
}

export { HttpRpcClient };
