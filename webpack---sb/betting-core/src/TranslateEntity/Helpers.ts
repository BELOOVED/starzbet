import { isNumber, isString } from "@sb/utils/IsTypeOf";
import { TParticipants } from "../Feed/Types";
import { EParticipantShortId } from "../EParticipantShortId";
import { EScopeType } from "../EScopeType";
import { EOutcomePredicate } from "../EOutcomePredicate";
import { EOutcomeEnumValue } from "../EOutcomeEnumValue";
import { EMarketParameter } from "../EMarketParameter";
import { translateTeam } from "./TranslateTeam";
import { EMarketColor } from "../EMarketColor";
import { TFuncLocal } from "./LocalTFunction";

const getTeamName = <T extends TFuncLocal>(t: T, participants: TParticipants, shortId: EParticipantShortId) => {
    const participant = Object.values(participants).find((participant) => participant.shortId === shortId);

    if (participant?.name) {
      return translateTeam(t, participant);
    }

    throw new Error(`Unable to get participant name: ${shortId}`);
  };

const isMarketParameter = (value: unknown): value is EMarketParameter => !!EMarketParameter[value as EMarketParameter];

const isParticipantShortId = (value: unknown): value is EParticipantShortId => !!EParticipantShortId[value as EParticipantShortId];

const isScopeType = (value: unknown): value is EScopeType => !!EScopeType[value as EScopeType];

const isOutcomePredicate = (value: unknown): value is EOutcomePredicate => !!EOutcomePredicate[value as EOutcomePredicate];

const isValidNumberValue = (value: unknown): value is string => isNumber(Number(value));

const isValidStringValue = (value: unknown): value is string => isString(value);

const isOutcomeEnumValue = (value: unknown): value is EOutcomeEnumValue => !!EOutcomeEnumValue[value as EOutcomeEnumValue];

const isAndMoreOrOtherValue = (value: unknown) => value === "9999";

const isMarketColor = (value: unknown): value is EMarketColor => !!EMarketColor[value as EMarketColor];

const trimTranslated = <V>(value: V): V => typeof value === "string"
  ? value.trim() as V
  : value;

export {
  getTeamName,
  isMarketParameter,
  isParticipantShortId,
  isScopeType,
  isOutcomePredicate,
  isValidNumberValue,
  isValidStringValue,
  isOutcomeEnumValue,
  isAndMoreOrOtherValue,
  isMarketColor,
  trimTranslated,
};
