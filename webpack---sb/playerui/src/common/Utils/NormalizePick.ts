import type {
  TSportsbook_Event_Fragment,
  TSportsbook_EventInfo_Fragment,
  TSportsbook_EventPick_Fragment,
  TSportsbook_OutcomeResult_Fragment,
  TSportsbook_Outright_Fragment,
  TSportsbook_OutrightPick_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type EEventStatus } from "@sb/betting-core/EEventStatus";
import { ESportsbook_Typename, type TBettingStatus_Fragment, type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { type EScopeType } from "@sb/betting-core/EScopeType";
import { composeHasPathParsers, parseScopeNumber, parseScopeType } from "@sb/betting-core/ParseHashPath";
import { isUnknownObject, type TUnknownObject } from "@sb/utils";
import { Logger } from "../../common/Utils/Logger";

const isOutrightPick = (
  pick: TSportsbook_EventPick_Fragment | TSportsbook_OutrightPick_Fragment,
): pick is TSportsbook_OutrightPick_Fragment => (
  pick.__typename === ESportsbook_Typename.sportsbookOutrightPick
);

const isNormalizedOutrightPick = (
  pick: ReturnType<typeof normalizeOutcome>,
): pick is INormalizedOutrightPick => (
  pick.__typename === ESportsbook_Typename.sportsbookOutrightPick
);

interface IScopeParameters {
  number: number;
  type: EScopeType;
}

interface INormalizedEventPick {
  __typename: ESportsbook_Typename.sportsbookEventPick;
  id: string;
  banker: boolean;
  eventInfo: TSportsbook_EventInfo_Fragment;
  eventStatus: EEventStatus;
  coefficient: number;
  eventOutcomeHashPath: string;
  outcome: {
    translatesForManuallyCreated?: TTranslateRecord_Fragment[];
    parameters: TUnknownObject;
  };
  market: {
    translatesForManuallyCreated: TTranslateRecord_Fragment[];
    parameters: TUnknownObject;
    scopeParameters: IScopeParameters;
    type: EMarketType;
  };
  event: TSportsbook_Event_Fragment;
  settledAt: null | string;
  result: string;
}

interface INormalizedOutrightPick {
  __typename: ESportsbook_Typename.sportsbookOutrightPick;
  id: string;
  banker: boolean;
  coefficient: number;
  outcome: {
    __typename: ESportsbook_Typename.sportsbookOutrightOutcome;
    hashPath: string;
    coefficient: number;
    result: TSportsbook_OutcomeResult_Fragment;
    parameters: TUnknownObject;
    bettingStatus: TBettingStatus_Fragment;
    translatesForManuallyCreated?: TTranslateRecord_Fragment[];
  };
  outright: TSportsbook_Outright_Fragment;
  settledAt: null | string;
  result: string;
}

type TNormalizeReturnType<P extends TSportsbook_OutrightPick_Fragment | TSportsbook_EventPick_Fragment> =
  P extends TSportsbook_OutrightPick_Fragment
    ? INormalizedOutrightPick
    : P extends TSportsbook_EventPick_Fragment
      ? INormalizedEventPick
      : never;

const parseParameters = (parameters: string) => {
  try {
    const parsedParams = JSON.parse(parameters);

    return isUnknownObject(parsedParams) ? parsedParams : {};
  } catch (e) {
    Logger.warn.app("parseParameters", e);

    return {};
  }
};

const normalizeScopeParameters = (eventOutcomeHashPath: string): IScopeParameters => {
  const { scopeType, scopeNumber } = composeHasPathParsers(parseScopeType, parseScopeNumber)(eventOutcomeHashPath);

  return {
    type: scopeType,
    number: scopeNumber,
  };
};

const normalizeOutcome = (pick: TSportsbook_OutrightPick_Fragment | TSportsbook_EventPick_Fragment) => {
  if (isOutrightPick(pick)) {
    const { outcome: { parameterBag, translatesForManuallyCreated, ...restOutcome }, ...rest } = pick;

    const baseOutcome = {
      ...restOutcome,
      parameters: parseParameters(parameterBag.parameters),
    };

    return {
      ...rest,
      outcome: translatesForManuallyCreated ? { ...baseOutcome, translatesForManuallyCreated } : baseOutcome,
    };
  }

  const {
    translatesForManuallyCreated,
    parameterBag,
    ...rest
  } = pick;

  const baseOutcome = { parameters: parseParameters(parameterBag.parameters) };

  return {
    ...rest,
    outcome: translatesForManuallyCreated ? { ...baseOutcome, translatesForManuallyCreated } : baseOutcome,
  };
};

const normalizeMarket = (pick: ReturnType<typeof normalizeOutcome>) => {
  if (isNormalizedOutrightPick(pick)) {
    return pick;
  }

  const {
    marketTranslatesForManuallyCreated,
    marketParameterBag,
    eventOutcomeHashPath,
    ...rest
  } = pick as Omit<Omit<TSportsbook_EventPick_Fragment, "parameterBag">, "translatesForManuallyCreated">;

  return {
    ...rest,
    eventOutcomeHashPath,
    market: {
      translatesForManuallyCreated: marketTranslatesForManuallyCreated,
      parameters: parseParameters(marketParameterBag.parameters),
      type: marketParameterBag.type,
      scopeParameters: normalizeScopeParameters(eventOutcomeHashPath),
    },
  };
};

const normalizePick = <P extends TSportsbook_OutrightPick_Fragment | TSportsbook_EventPick_Fragment>(pick: P) => (
  normalizeMarket(normalizeOutcome(pick)) as TNormalizeReturnType<P>
);

export {
  normalizePick,
  type INormalizedEventPick,
  type INormalizedOutrightPick,
};
