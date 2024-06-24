/* eslint-disable max-len */
import { isNumber, isString } from "@sb/utils/IsTypeOf";
import { TNullable } from "@sb/utils/TNullable";
import { EScopeType } from "./EScopeType";
import { EScoreType } from "./EScoreType";
import { EParticipantShortId } from "./EParticipantShortId";
import { EMarketType } from "./MarketType";
import { isNil } from "@sb/utils";

const getError = (what: string, hashPath: string) => new Error(`Failed to parse ${what} from such hashPath: ${hashPath}`);

type THashPathParser = (hashPath: string) => Record<string, unknown>;

function composeHasPathParsers<T1 extends THashPathParser>(p1: T1): (hashPath: string) => ReturnType<T1>;
function composeHasPathParsers<T1 extends THashPathParser, T2 extends THashPathParser>(p1: T1, p2: T2): (hashPath: string) => ReturnType<T1> & ReturnType<T2>;
function composeHasPathParsers<T1 extends THashPathParser, T2 extends THashPathParser, T3 extends THashPathParser>(p1: T1, p2: T2, p3: T3): (hashPath: string) => ReturnType<T1> & ReturnType<T2> & ReturnType<T3>;
function composeHasPathParsers<T1 extends THashPathParser, T2 extends THashPathParser, T3 extends THashPathParser, T4 extends THashPathParser>(p1: T1, p2: T2, p3: T3, p4: T4): (hashPath: string) => ReturnType<T1> & ReturnType<T2> & ReturnType<T3> & ReturnType<T4>;
function composeHasPathParsers<T1 extends THashPathParser, T2 extends THashPathParser, T3 extends THashPathParser, T4 extends THashPathParser, T5 extends THashPathParser>(p1: T1, p2: T2, p3: T3, p4: T4, p5: T5): (hashPath: string) => ReturnType<T1> & ReturnType<T2> & ReturnType<T3> & ReturnType<T4> & ReturnType<T5>;
function composeHasPathParsers<T1 extends THashPathParser, T2 extends THashPathParser, T3 extends THashPathParser, T4 extends THashPathParser, T5 extends THashPathParser, T6 extends THashPathParser>(p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6): (hashPath: string) => ReturnType<T1> & ReturnType<T2> & ReturnType<T3> & ReturnType<T4> & ReturnType<T5> & ReturnType<T6>;
function composeHasPathParsers<T1 extends THashPathParser, T2 extends THashPathParser, T3 extends THashPathParser, T4 extends THashPathParser, T5 extends THashPathParser, T6 extends THashPathParser, T7 extends THashPathParser>(p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6, p7: T7): (hashPath: string) => ReturnType<T1> & ReturnType<T2> & ReturnType<T3> & ReturnType<T4> & ReturnType<T5> & ReturnType<T6> & ReturnType<T7>;

function composeHasPathParsers(...parsers: Array<THashPathParser>) {
  return function (hashPath: string) {
    return parsers.reduce(
      (acc, cur) => ({ ...acc, ...cur(hashPath) }),
      {},
    );
  };
}

const parseEventId = (hashPath: string) => {
  const [eventId] = hashPath.split("->");

  if (isString(eventId)) {
    return { eventId };
  }

  throw getError("eventId", hashPath);
};

const parseOutrightId = (hashPath: string) => {
  const [outrightId] = hashPath.split("->");

  if (isString(outrightId)) {
    return { outrightId };
  }

  throw getError("outrightId", hashPath);
};

const parseScopeId = (hashPath: string) => {
  const [eventId, scopeName] = hashPath.split("->");

  if (isString(eventId) && isString(scopeName)) {
    return { scopeId: `${eventId}->${scopeName}` };
  }

  throw getError("scopeId", hashPath);
};

const parseScopeType = (hashPath: string) => {
  const [, target] = hashPath.split("->") as [string, string];

  const [type] = target.split("--");

  if (Object.values(EScopeType).includes(type as never)) {
    return {
      scopeType: type as EScopeType,
    };
  }

  throw getError("scopeType", hashPath);
};

const parseScopeNumber = (hashPath: string) => {
  const [, target] = hashPath.split("->") as [string, string];

  const [, number] = target.split("--") as [string, string];

  const asNumber = Number.parseInt(number);

  if (isNumber(asNumber)) {
    return {
      scopeNumber: asNumber,
    };
  }

  throw getError("scopeNumber", hashPath);
};

const parseScoreType = (hashPath: string) => {
  const [, , target] = hashPath.split("->") as [string, string, string];

  const [type] = target.split("--") as [string];

  let scoreType: TNullable<EScoreType>;

  for (const s of Object.values(EScoreType)) {
    if (type.startsWith(s)) {
      scoreType = s;

      break;
    }
  }

  if (scoreType) {
    return {
      scoreType,
    };
  }

  throw getError("scoreType", hashPath);
};

const parseParticipantShortId = (hashPath: string) => {
  const [, , participantShortId] = hashPath.split("--");

  if (Object.values(EParticipantShortId).includes(participantShortId as never)) {
    return {
      participantShortId,
    };
  }

  throw getError("participantShortId", hashPath);
};

const parseMarketId = (hashPath: string) => {
  const [eventId, scopeName, marketName] = hashPath.split("->");

  if (isString(eventId) && isString(scopeName) && isString(marketName)) {
    return { marketId: `${eventId}->${scopeName}->${marketName}` };
  }

  throw getError("marketId", hashPath);
};

const parseMarketName = (hashPath: string) => {
  const [_, __, marketName] = hashPath.split("->");

  if (isString(marketName)) {
    return { marketName };
  }

  throw getError("marketName", hashPath);
};

const parseMarketParameters = (hashPath: string) => {
  const { marketName } = parseMarketName(hashPath)

  const [_, parameters] = marketName.split("--");

  if (isNil(parameters) || parameters === "nil") {
    return {};
  }

  return parameters.split("__").reduce<Record<string, string>>(
    (acc, item) => {
      const [key, value] = item.split("::");

      if (isNil(key) || isNil(value)) {
        throw getError("marketParameters => key", hashPath);
      }

      acc[key] = value;

      return acc;
    },
    {}
  )

}


const parseMarketType = (hashPath: string) => {
  const [, , target] = hashPath.split("->") as [string, string, string];

  const [type] = target.split("--") as [string];

  if (Object.values(EMarketType).includes(type as never)) {
    return {
      marketType: type as EMarketType,
    };
  }

  throw getError("marketType", hashPath);
};

export {
  composeHasPathParsers,
  parseEventId,
  parseOutrightId,
  parseScopeId,
  parseScopeType,
  parseScopeNumber,
  parseScoreType,
  parseParticipantShortId,
  parseMarketId,
  parseMarketType,
  parseMarketName,
  parseMarketParameters,
};

