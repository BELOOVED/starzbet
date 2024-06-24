import { AbstractRpcClientWithUrlResolver } from "./AbstractRpcClientWithUrlResolver";
import type { TUrlResolver } from "../UrlResolver/TUrlResolver";
import type { IMetadata } from "../Model/IMetadata";
import type { ISetting } from "../Model/ISetting";
import { appendUriToUrl } from "../Utils/AppendUriToUrl";
import { fetchCallClient } from "../Utils/FetchCallClient";
import type { TCallClient } from "../Utils/TCallClient";

class HttpRpcClientWithUrlResolver extends AbstractRpcClientWithUrlResolver {
  constructor(
    private urlResolver: TUrlResolver,
    private doCall: TCallClient = fetchCallClient,
  ) {
    super();
  }

  public callWithUrlResolver<T = any, U = any>(request: T, uri: string, metadata?: IMetadata, settings?: ISetting): Promise<U> {
    const url = appendUriToUrl(this.urlResolver(uri), uri);

    return this.doCall(request, url, uri, metadata, settings);
  }
}

export { HttpRpcClientWithUrlResolver };
