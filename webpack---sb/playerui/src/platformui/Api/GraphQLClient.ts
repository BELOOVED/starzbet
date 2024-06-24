import { type Client, createGQLClient, type TGQLClient } from "@sb/graphql-client";
import { isArray, isE2E, isString, type TExplicitAny, throttle } from "@sb/utils";
import { createHeadersWithMetadata } from "@sb/network-bus/Utils";
import { type IMetadata } from "@sb/network-bus/Model";
import { getLocalStorage } from "../../common/Store/LocalStorage/localStorageKeys";
import {
  createGlobalErrorHandler,
  type TGlobalErrorHandler,
  type TGlobalErrorHandlerCreator,
} from "../../common/GlobalErrorHandler/GlobalErrorHandler";
import { production } from "../../common/Constants/Production";
import { playerUiStaticUrl } from "../../common/Urls";
import { Logger } from "../../common/Utils/Logger";
import { authTokenService } from "../../common/Store/Auth/AuthTokenService";
import { metadataFactory } from "../../common/Utils/MetadataFactory";
import { anySignal } from "../../common/Utils/AnySignal";
import { getProtectionToken } from "../../common/Protection";
import { platformLocalStorageKeys } from "../../common/Store/LocalStorage/PlatformLocalStorageKeys";

const releaseVersion = process.env.RELEASE_VERSION;

const getSource = (document: string | undefined) => {
  if (document) {
    const q = document.split("#")[1];

    if (q) {
      return `Query ${q}`;
    }
  }

  return "gql";
};

const headersFactory = () => ({
  "Accept": "application/json",
  "Content-Type": "application/json",
});

const getDefaultAuth: TGetAuth = async () => {
  const [token, secret] = await Promise.all(
    [
      authTokenService.getTokenOrNil(),
      getProtectionToken(),
    ],
  );

  return [metadataFactory(token, secret), authTokenService.createSignal()] as const;
};

type TGetAuth = () => Promise<readonly [IMetadata, AbortSignal | null]>

class GraphQLClient implements TGQLClient {
  #client: Client;
  private readonly getAuth: TGetAuth;

  readonly #globalErrorHandler: TGlobalErrorHandlerCreator | undefined;

  constructor(
    globalErrorHandler?: TGlobalErrorHandlerCreator,
    getAuth = getDefaultAuth,
  ) {
    this.#client = createGQLClient(
      process.env.GRAPHQL_GATEWAY_URL,
      headersFactory,
    );
    this.getAuth = getAuth;

    if (getLocalStorage(platformLocalStorageKeys.testPlayer)) {
      this.#client.bypassCache = true;
    }

    if (globalErrorHandler) {
      this.#globalErrorHandler = globalErrorHandler;
    }
  }

  set bypassCache(value: boolean) {
    this.#client.bypassCache = value;
  }

  async request(...args: Parameters<Client["request"]>) {
    const [metadata, abortSignal] = await this.getAuth();
    const [
      document,
      ignoreBatching,
      variables,
      headers,
      signal,
    ] = args;

    const extraHeaders = { ...headers, ...createHeadersWithMetadata(metadata) };

    const signals = [signal, abortSignal].filter(Boolean);

    return this.#client.request(document, ignoreBatching, variables, extraHeaders, anySignal(signals)).catch((e) => {
      if (this.#globalErrorHandler) {
        return this.#globalErrorHandler(getSource(document))(e);
      }

      throw e;
    });
  }
}

const isErrorCodes = (codes: unknown): codes is string[] => (
  codes !== undefined && isArray(codes) && codes.every(isString)
);

const errorCodesSelector = (error: TExplicitAny) => {
  const errors = error?.response?.errors || [];

  const errorCodes = errors.flatMap((error: TExplicitAny) => error?.extensions?.["rpc_errors_codes"]);

  if (isErrorCodes(errorCodes)) {
    return errorCodes;
  }

  return [];
};

const checkReleaseVersion = throttle(
  () => {
    void fetch(`${playerUiStaticUrl}/sportsbook__static/version.txt?${Date.now()}`)
      .then((response) => response.text())
      .then((version) => {
        if (!isString(version)) {
          return;
        }

        if (version === releaseVersion) {
          return;
        }

        Logger.warn.app("[checkReleaseVersion]", "versions not equal");

        window.location.reload();
      })
      .catch((e) => Logger.warn.app("[checkReleaseVersion]", e));
  },
  10000,
);

const createGraphQLClient = (
  getDispatch?: Parameters<typeof createGlobalErrorHandler>[0],
  getAuth?: TGetAuth,
): Client => {
  const gqlErrHandler = getDispatch
    ? (source: string): TGlobalErrorHandler => {
      const handler = createGlobalErrorHandler(getDispatch, errorCodesSelector, "gql");

      return (error) => {
        if (production && !isE2E) {
          checkReleaseVersion();
        }

        return handler(source)(error);
      };
    }
    : undefined;

  //todo fix this shit type!!!
  return new GraphQLClient(gqlErrHandler, getAuth) as unknown as Client;
};

export { createGraphQLClient };
