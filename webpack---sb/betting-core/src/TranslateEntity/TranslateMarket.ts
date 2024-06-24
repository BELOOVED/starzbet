import { composeMarketOptions, TMarketOptions } from "./ComposeMarketOptions";
import { ESportCode } from "../ESportCode";
import { EScopeType } from "../EScopeType";
import { EMarketType } from "../MarketType";
import { EMarketGroup } from "../EMarketGroup";
import { marketTypeToMarketGroupMap } from "../MarketGroup";
import { marketTypeTKeys } from "../SharedTKeys/MarketTypeTKeys";
import { ELocale } from "@sb/utils/ELocale";
import { TMarketParameters } from "../TMarketParameters";
import { TParticipants } from "../Feed/Types";
import { isDev, TExplicitAny, TTranslateRecord } from "@sb/utils";
import { TFuncLocal, TFuncOrPlainLocal } from "./LocalTFunction";
import { trimTranslated } from "./Helpers";
import { validateTranslatedEntity } from "./ValidateTranslatedEntity";
import { getPredefinedName } from "./GetPredefinedName";
import { Logger } from "../Utils/Logger";

type TAdditionalInfoExtractor = (option: TMarketOptions) => string;

type TTranslateMarketArg = {
  locale: ELocale,
  sportCode: ESportCode;
  scopeType: EScopeType;
  scopeNumber: number;
  type: EMarketType;
  parameters: TMarketParameters;
  participants: TParticipants;
  name: TTranslateRecord | null;
};

const translateMarket = <T extends TFuncOrPlainLocal>(
  t: T,
  {
    locale,
    type,
    parameters,
    participants,
    sportCode,
    scopeType,
    scopeNumber,
    name,
  }: TTranslateMarketArg,
  throwError = isDev
): ReturnType<T> => {
  try {
    if (marketTypeToMarketGroupMap[type] === EMarketGroup.custom) {
      return getPredefinedName(name, locale) as ReturnType<T>;
    }

    const trimTranslation = trimTranslated(t(
      marketTypeTKeys[type],
      {
        ...composeMarketOptions(t, locale, type, parameters, participants),
        context: {
          sportCode,
          scopeType,
          scopeNumber,
        },
      },
    ));

    return validateTranslatedEntity(trimTranslation)
  } catch (e: TExplicitAny) {
    if (throwError) {
      throw e;
    }

    Logger.error.app("Unable to translate market:", e.message);

    return "-" as ReturnType<T>
  }
}

const extract_noop: TAdditionalInfoExtractor = (_) => " ";
const extract_handicap: TAdditionalInfoExtractor = ({ handicap }) => handicap!;
const extract_total: TAdditionalInfoExtractor = ({ total }) => total!;
const extract_predicate_number: TAdditionalInfoExtractor = ({ predicate, number }) => `${predicate} ${number}`;
const extract_from_to: TAdditionalInfoExtractor = ({ from, to }) => `${from} - ${to}`;

const marketGroupToAdditionalInfoExtractor: Record<EMarketGroup, TAdditionalInfoExtractor> = {
  ...Object.values(EMarketGroup).reduce((acc, cur) => ({
    ...acc,
    [cur]: extract_noop
  }), {} as Record<EMarketGroup, TAdditionalInfoExtractor>),

  [EMarketGroup.ah]: extract_handicap,
  [EMarketGroup.interval_ah]: extract_handicap,

  [EMarketGroup.exact_number_yes_no]: extract_predicate_number,
  [EMarketGroup.exact_number_yes_no_team]: extract_predicate_number,

  [EMarketGroup.range_number_yes_no]: extract_from_to,
  [EMarketGroup.range_number_yes_no_team]: extract_from_to,

  [EMarketGroup.both_to_score_and_o_yes_no]: extract_total,
  [EMarketGroup.both_to_score_and_u_yes_no]: extract_total,
  [EMarketGroup.interval_ou_team]: extract_total,
  [EMarketGroup.interval_ou]: extract_total,
  [EMarketGroup.o_draw]: extract_total,
  [EMarketGroup.u_draw]: extract_total,
  [EMarketGroup.o_win_draw_team]: extract_total,
  [EMarketGroup.u_win_draw_team]: extract_total,
  [EMarketGroup.u_win_team]: extract_total,
  [EMarketGroup.o_win_team]: extract_total,
  [EMarketGroup.ou]: extract_total,
  [EMarketGroup.ou_team]: extract_total,
};

const extractMarketAdditionalInfo = (
  t: TFuncLocal<string>,
  locale: ELocale,
  type: EMarketType,
  parameters: TMarketParameters,
  participants: TParticipants,
  throwError = isDev,
) => {
  try {
    const options = composeMarketOptions(t, locale, type, parameters, participants);

    return trimTranslated(marketGroupToAdditionalInfoExtractor[marketTypeToMarketGroupMap[type]](options));
  } catch (e: TExplicitAny) {
    if (throwError) {
      throw e;
    }

    Logger.error.app("Unable to extract market additional info:", e.message);

    return "-";
  }
};

const translateMarketAdditionalInfo = (
  t: TFuncLocal<string>,
  {
    locale,
    type,
    parameters,
    participants,
  }: TTranslateMarketArg,
  throwError = isDev,
) => extractMarketAdditionalInfo(t, locale, type, parameters, participants, throwError);

const translateMarketWithAdditionalInfo = (
  t: TFuncLocal<string>,
  arg: TTranslateMarketArg,
  throwError = isDev,
) => {
  const translatedMarket = translateMarket(t,arg, throwError);

  const additionalInfo = translateMarketAdditionalInfo(t, arg, throwError);

  return additionalInfo
    ? `${translatedMarket} ${additionalInfo}`
    : translatedMarket;
};

export type { TTranslateMarketArg }
export {
  translateMarket,
  translateMarketAdditionalInfo,
  translateMarketWithAdditionalInfo
};
