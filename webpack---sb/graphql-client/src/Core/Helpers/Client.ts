import createHashSum from "hash-sum";
import type { BatchRequestDocument, GraphQLClient, Variables } from "graphql-request";
import { isDev, isE2E } from "@sb/utils";
import type { TClient, TQueryVariables, TRequestHeaders } from "../Generated/Helpers/Types";
import { isBatchEnabled, isForcedTracingEnabled } from "./EnvVariables";

type TVariables = Variables & TQueryVariables;

class ControllablePromise<V = any, R = any> {
  private readonly _instance: Promise<V>;
  // @ts-ignore
  private _resolve: (value: V) => void;
  // @ts-ignore
  private _reject: (reason?: R) => void;

  constructor() {
    this._instance = new Promise<V>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  public resolve = (value: V) => this._resolve(value);

  public reject = (reason?: R) => this._reject(reason);

  public getInstance() {
    return this._instance;
  }
}

class BatchRequests {
  private readonly _interval: number = 10;
  private readonly _graphQLClient: GraphQLClient;
  private readonly _requestHeaders?: TRequestHeaders | undefined;
  private readonly _requestHeadersHash: string;
  private readonly _requests: ControllablePromise[] = [];
  private readonly _batchRequestDocuments: BatchRequestDocument[] = [];

  private _timeout: ReturnType<typeof setTimeout> | undefined;
  private _started = false;

  constructor(
    graphQLClient: GraphQLClient,
    requestHeaders?: TRequestHeaders,
  ) {
    this._graphQLClient = graphQLClient;
    this._requestHeaders = requestHeaders;
    this._requestHeadersHash = createHashSum(requestHeaders);
  }

  public async append<R = any, V extends TVariables = TVariables>(batchRequestDocument: BatchRequestDocument<V>) {
    if (this._started) {
      throw new Error("Can not append batch request document because batch already started");
    }

    const request = new ControllablePromise<R>();

    this._requests.push(request);
    this._batchRequestDocuments.push(batchRequestDocument);

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(
      () => {
        this._started = true;

        // tracing extension don't work with batch
        // when batch contains one record send using `request`
        if (this._batchRequestDocuments.length === 1) {
          const [batchRequestDocument] = this._batchRequestDocuments as [BatchRequestDocument];
          const [request] = this._requests as [ControllablePromise];

          this._graphQLClient
            .request(
              batchRequestDocument.document,
              batchRequestDocument.variables,
              this._requestHeaders,
            )
            .then(request.resolve)
            .catch(request.reject);

          return;
        }

        this._graphQLClient
          .batchRequests(
            this._batchRequestDocuments,
            this._requestHeaders,
          )
          .then((response) => {
            this._requests.forEach((it, index) => {
              it.resolve(response[index].data);
            });
          })
          .catch((error) => {
            this._requests.forEach((it) => {
              it.reject(error);
            });
          });
      },
      this._interval,
    );

    return request.getInstance();
  }

  public isWaiting() {
    return !this._started;
  }

  public isAppendable(requestHeaders?: TRequestHeaders) {
    if (this._started) {
      return false;
    }

    return createHashSum(requestHeaders) === this._requestHeadersHash;
  }
}

class DuplicationsDetector {
  private static readonly _interval = 50;
  private _state: Record<string, number> = {};

  public check(document: string, variables?: TVariables, requestHeaders?: TRequestHeaders) {
    const [name, hash] = DuplicationsDetector.handleRequest(document, variables, requestHeaders);

    const last = this._state[hash];
    const now = Date.now();

    if (last) {
      if (now - last < DuplicationsDetector._interval) {
        throw new Error(`Query "${name}" with same Variables and Request Headers executed multiple times within ${DuplicationsDetector._interval}ms interval`);
      }
    }

    this._state[hash] = now;
  }

  private static handleDocument(document: string): [string, string] {
    if (process.env.GRAPHQL_PERSISTED === "strict" || process.env.GRAPHQL_PERSISTED === "both") {
      const [, name, hash] = document.split("#");

      return [name as string, hash as string];
    }

    const [, name] = document.split(/[\s(]/);

    return [name as string, createHashSum(document)];
  }

  private static handleRequest(document: string, variables: TVariables = {}, requestHeaders: TRequestHeaders = {}): [string, string] {
    const [name, documentHash] = DuplicationsDetector.handleDocument(document);

    return [name, `${documentHash}${createHashSum({ variables, requestHeaders })}`];
  }
}

class Client implements TClient {
  private _graphQLClient: GraphQLClient;
  private _duplicationsDetector: DuplicationsDetector = new DuplicationsDetector();
  private _batchRequests: BatchRequests[] = [];
  private _bypassCache = false;

  constructor(graphQLClient: GraphQLClient) {
    this._graphQLClient = graphQLClient;
  }

  set bypassCache(value: boolean) {
    this._bypassCache = value;
  }

  public async request<R = any, V extends TVariables = TVariables>(
    document: string,
    ignoreBatching: boolean,
    variables?: V,
    requestHeaders: TRequestHeaders = {},
    signal?: AbortSignal,
  ): Promise<R> {
    const clonedVariables = { ...variables } as V;

    if (isDev || isE2E) {
      this._duplicationsDetector.check(document, clonedVariables, requestHeaders);
    }

    if (this._bypassCache) {
      clonedVariables.bypassCache = true;
    }

    if (isForcedTracingEnabled()) {
      clonedVariables.enableTracing = true;
    }

    if (!isBatchEnabled() || ignoreBatching) {
      // cast to any because graphql-request use not polymorph type for AbortSignal
      return this._graphQLClient.request<R, V>({
        document,
        variables: clonedVariables,
        requestHeaders,
        signal: signal as any,
      });
    }

    const batchRequestDocument: BatchRequestDocument<V> = { document, variables: clonedVariables };

    const appendableBatchRequest = this._batchRequests.find((it) => it.isAppendable(requestHeaders));

    if (appendableBatchRequest) {
      return appendableBatchRequest.append<R, V>(batchRequestDocument);
    }

    const batchRequest = new BatchRequests(this._graphQLClient, requestHeaders);

    this._batchRequests.push(batchRequest);

    return batchRequest
      .append<R, V>(batchRequestDocument)
      .finally(() => {
        this._batchRequests = this._batchRequests.filter((it) => it.isWaiting());
      });
  }
}

export { Client };
export type { TVariables };
