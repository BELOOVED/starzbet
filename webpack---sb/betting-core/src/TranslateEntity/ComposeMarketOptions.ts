import { EMarketType } from "../MarketType";
import { EMarketParameter } from "../EMarketParameter";
import { TMarketParameters } from "../TMarketParameters";
import {
  getTeamName,
  isMarketColor,
  isMarketParameter,
  isOutcomePredicate,
  isParticipantShortId,
  isScopeType,
  isValidNumberValue,
} from "./Helpers";
import {
  UnknownMarketColor,
  UnknownOutcomePredicate,
  UnknownParticipantShortId,
  UnknownScopeType,
  UnknownScoreDiff,
} from "./GuardTypeErrors";
import { ELocale } from "@sb/utils/ELocale";
import { TParticipants } from "../Feed/Types";
import { outcomePredicateTKeys } from "../SharedTKeys/OutcomePredicateTKeys";
import { ordinalFormat } from "../OrdinalFormat";
import { EMarketGroup } from "../EMarketGroup";
import { marketTypeToMarketGroupMap } from "../MarketGroup";
import { scopeNameTKeys } from "../SharedTKeys/ScopeNameTKeys";
import { scopeNamePluralTKeys } from "../SharedTKeys/ScopeNamePluralTKeys";
import { marketColorTKeys } from "../SharedTKeys/MarketColorTKeys";
import { getPlainTFunc, TFuncLocal, TFuncOrPlainLocal } from "./LocalTFunction";

type TMarketOptions = Partial<{
  from: string,
  to: string,
  handicap: string,
  total: string,
  number: string,
  teamName: string,
  predicate: string,
  scopeName: string,
  color: string,
  scoreDiff: string,
}>;

type TTranslator = (t: TFuncLocal<string>, locale: ELocale, type: EMarketType, participants: TParticipants, value: string) => TMarketOptions;

const isMarketTypePlural = (type: EMarketType) => [
  EMarketGroup.to_win_all_scopes_team_yes_no,
  EMarketGroup.highest_scopes_score,
].includes(marketTypeToMarketGroupMap[type]);

const translate_noop: TTranslator = (_, __, ___, ____, value) => ({});

const translate_from_interval_from: TTranslator = (_, __, ___, ____, value) => ({
  from: value,
});

const translate_to_interval_to: TTranslator = (_, __, ___, ____, value) => ({
  to: value,
});

const translate_handicap: TTranslator = (_, __, ___, ____, value) => ({
  handicap: value,
});

const translate_total: TTranslator = (_, __, ___, ____, value) => ({
  total: value,
});

const translate_score: TTranslator = (_, __, ___, ____, value) => ({
  number: value,
});

const translate_number: TTranslator = (_, locale, type, ___, value) => {
  if (type === EMarketType.score_to_score_race) {
    return {
      number: value,
    }
  }

  return {
    number: ordinalFormat(locale, Number.parseFloat(value)).toString(),
  };
};

const translate_team: TTranslator = (t, _, __, participants, value) => {
  if (isParticipantShortId(value)) {
    return {
      teamName: getTeamName(t, participants, value),
    };
  }

  throw new UnknownParticipantShortId(value);
};

const translate_scopeType: TTranslator = (t, _, type, participants, value) => {
  if (isScopeType(value)) {
    if (isMarketTypePlural(type)) {
      return {
        scopeName: t(scopeNamePluralTKeys[value]),
      };
    }

    return {
      scopeName: t(scopeNameTKeys[value]),
    };
  }

  throw new UnknownScopeType(value);
};

const translate_predicate: TTranslator = (t, _, __, ___, value) => {
  if (isOutcomePredicate(value)) {
    return {
      predicate: t(outcomePredicateTKeys[value]),
    };
  }

  throw new UnknownOutcomePredicate(value);
};

const translate_color: TTranslator = (t, _, __, ___, value) => {
  if (isMarketColor(value)) {
    return {
      color: t(marketColorTKeys[value]),
    };
  }

  throw new UnknownMarketColor(value);
};

const translate_sd: TTranslator = (_, __, ___, ____, value) => {
  if (isValidNumberValue(value)) {
    return {
      scoreDiff: value,
    };
  }

  throw new UnknownScoreDiff(value);
};

const marketParameterToTranslator: Record<EMarketParameter, TTranslator> = {
  [EMarketParameter.from]: translate_from_interval_from,
  [EMarketParameter.interval_from]: translate_from_interval_from,
  [EMarketParameter.to]: translate_to_interval_to,
  [EMarketParameter.interval_to]: translate_to_interval_to,
  [EMarketParameter.handicap]: translate_handicap,
  [EMarketParameter.total]: translate_total,
  [EMarketParameter.score]: translate_score,
  [EMarketParameter.number]: translate_number,
  [EMarketParameter.team]: translate_team,
  [EMarketParameter.scopeType]: translate_scopeType,
  [EMarketParameter.predicate]: translate_predicate,
  [EMarketParameter.color]: translate_color,
  [EMarketParameter.id]: translate_noop,
  [EMarketParameter.rp]: translate_noop,
  [EMarketParameter.sd]: translate_sd,
};

const composeMarketOptions = <T extends TFuncOrPlainLocal>(
  t: T,
  locale: ELocale,
  type: EMarketType,
  parameters: TMarketParameters,
  participants: TParticipants,
): TMarketOptions => {
  const plainT = getPlainTFunc(t);

  return Object
    .keys(parameters)
    .reduce(
      (acc, key) => {
        const value = parameters[key as EMarketParameter] as string;

        if (isMarketParameter(key)) {
          return {
            ...acc,
            ...marketParameterToTranslator[key](plainT, locale, type, participants, value),
          };
        } else {
          throw new Error(`Unknown market parameter: ${key}`);
        }
      },
      {} as TMarketOptions,
    );
}

export { composeMarketOptions };
export type { TMarketOptions };

