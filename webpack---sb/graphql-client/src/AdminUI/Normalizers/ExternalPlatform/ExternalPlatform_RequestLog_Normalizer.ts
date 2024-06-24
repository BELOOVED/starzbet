import { type TExplicitAny } from "@sb/utils";
import { type TRecord, type TRecordsManager } from "../../../Core/Generated/Helpers/Types";
import { type TRecordNormalizerAdditionalData } from "../../../Core/Helpers/QueryNormalizer";
import { EExternalPlatform_Typename } from "../../../Core/Generated/Services/ExternalPlatform/Models/EExternalPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TExternalPlatform_RequestLog_Fragment,
} from "../../Generated/Services/ExternalPlatform/Types/TExternalPlatform_RequestLog_Fragment";
import {
  type TExternalPlatform_RequestParams_Fragment,
} from "../../Generated/Services/ExternalPlatform/Types/TExternalPlatform_RequestParams_Fragment";
import {
  type TExternalPlatform_SportsbookBetParams_Fragment,
} from "../../Generated/Services/ExternalPlatform/Types/TExternalPlatform_SportsbookBetParams_Fragment";
import {
  type TExternalPlatform_SportsbookOddsBoostParams_Fragment,
} from "../../Generated/Services/ExternalPlatform/Types/TExternalPlatform_SportsbookOddsBoostParams_Fragment";
import {
  type TExternalPlatform_BonusParams_Fragment,
} from "../../Generated/Services/ExternalPlatform/Types/TExternalPlatform_BonusParams_Fragment";
import { type TExternalPlatform_Request_Fragment } from "../../Generated/Services/ExternalPlatform/Types/TExternalPlatform_Request_Fragment";
import { ExternalPlatform_ResourceTransaction_Normalizer } from "./ExternalPlatform_ResourceTransaction_Normalizer";

// types
interface IExternalPlatformSportsbookBetParams {
  resourceId: string;
  resourceKey: string;
  betId: string;
  product: string;
  provider: string;
  userId: string;
  lastUserToken: string;
  details: string;
  transactionIds: string[];
}

interface IExternalPlatformSportsbookOddsBoostParams {
  resourceId: string;
  resourceKey: string;
  betId: string;
  product: string;
  provider: string;
  userId: string;
  lastUserToken: string;
  details: string;
  transactionIds: string[];
}

interface IExternalPlatformBonusParams {
  resourceId: string;
  resourceKey: string;
  provider: string;
  userId: string;
  lastUserToken: string;
  details: string;
  transactionIds: string[];
}

type TNormalizedExternalPlatformRequestParams = IExternalPlatformSportsbookBetParams
  | IExternalPlatformSportsbookOddsBoostParams
  | IExternalPlatformBonusParams

type TExternalPlatform_RequestParams = TExternalPlatform_RequestParams_Fragment | { __typename: string; }

type TExternalPlatform_RequestLog_Record = TRecord & {
  requestId: string;
  plainRequest: ReturnType<typeof normalizeExternalPlatformRequest>;
  plainResponse: Record<string, TExplicitAny> | string | null;
}

// typeguards
const isSbBetParams = (params: TExternalPlatform_RequestParams): params is TExternalPlatform_SportsbookBetParams_Fragment =>
  params.__typename === "ExternalPlatform_SportsbookBetParams";

const isSbOddsBoostParams = (params: TExternalPlatform_RequestParams): params is TExternalPlatform_SportsbookOddsBoostParams_Fragment =>
  params.__typename === "ExternalPlatform_SportsbookOddsBoostParams";

const isBonusParams = (params: TExternalPlatform_RequestParams): params is TExternalPlatform_BonusParams_Fragment =>
  params.__typename === "ExternalPlatform_BonusParams";

const normalizeExternalPlatformRequestParams = (
  params: TExternalPlatform_RequestParams,
  recordsManager: TRecordsManager,
  additionalData: TRecordNormalizerAdditionalData & { requestId: string; },
): TNormalizedExternalPlatformRequestParams => {
  if (isSbBetParams(params)) {
    return {
      resourceId: params.sbBetResourceId,
      resourceKey: params.sbBetResourceKey,
      betId: params.sbBetBetId,
      product: params.sbBetProduct,
      provider: params.sbBetProvider,
      userId: params.sbBetUserId,
      lastUserToken: params.sbBetLastUserToken,
      // @ts-ignore FIXME @strong-ts
      details: JSON.parse(params.sbBetDetails),
      transactionIds: params.sbBetTransactions
        .map((transaction) => ExternalPlatform_ResourceTransaction_Normalizer(recordsManager, transaction, additionalData).id),
    };
  }

  if (isSbOddsBoostParams(params)) {
    return {
      resourceId: params.sbOddsBoostResourceId,
      resourceKey: params.sbOddsBoostResourceKey,
      betId: params.sbOddsBoostBetId,
      product: params.sbOddsBoostProduct,
      provider: params.sbOddsBoostProvider,
      userId: params.sbOddsBoostUserId,
      lastUserToken: params.sbOddsBoostLastUserToken,
      // @ts-ignore FIXME @strong-ts
      details: JSON.parse(params.sbOddsBoostDetails),
      transactionIds: params.sbOddsBoostTransactions
        .map((transaction) => ExternalPlatform_ResourceTransaction_Normalizer(recordsManager, transaction, additionalData).id),
    };
  }

  if (isBonusParams(params)) {
    return {
      resourceId: params.bonusResourceId,
      resourceKey: params.bonusResourceKey,
      provider: params.bonusProvider,
      userId: params.bonusUserId,
      lastUserToken: params.bonusLastUserToken,
      // @ts-ignore FIXME @strong-ts
      details: JSON.parse(params.bonusDetails),
      transactionIds: params.bonusTransactions
        .map((transaction) => ExternalPlatform_ResourceTransaction_Normalizer(recordsManager, transaction, additionalData).id),
    };
  }

  throw new Error(`Unknown params type ${params.__typename}`);
};

const normalizeExternalPlatformRequest = (
  plainRequest: TExternalPlatform_Request_Fragment,
  recordsManager: TRecordsManager,
  additionalData: TRecordNormalizerAdditionalData & { requestId: string; },
) => ({
  headers: plainRequest.headers,
  params: plainRequest.params.map((param) => normalizeExternalPlatformRequestParams(param, recordsManager, additionalData)),
});

const getPlainResponse = (plainResponse: string) => {
  try {
    // @ts-ignore FIXME @strong-ts
    // ^AH JSON.parse in JSON.parse?
    return JSON.parse(JSON.parse(plainResponse)) as Record<string, TExplicitAny>;
  } catch(error) {
    return plainResponse as string;
  }
};

const ExternalPlatform_RequestLog_Normalizer = normalizerCreator<TExternalPlatform_RequestLog_Fragment,
  TExternalPlatform_RequestLog_Record,
  TRecordNormalizerAdditionalData>(
    EExternalPlatform_Typename.externalPlatformRequestLog,
    ERecordName.externalPlatformRequestLog,
    (recordsManager, fragment, additionalData) => {
      const plainRequest = normalizeExternalPlatformRequest(
        fragment.plainRequest,
        recordsManager,
        {
          ...additionalData,
          requestId: fragment.requestId,
        },
      );

      return {
        id: fragment.requestId,
        requestId: fragment.requestId,
        plainRequest,
        plainResponse: fragment.plainResponse ? getPlainResponse(fragment.plainResponse) : null,
      };
    },
  );

export type { TExternalPlatform_RequestLog_Record };
export { ExternalPlatform_RequestLog_Normalizer };
