// @ts-nocheck
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { EOutcomeKind } from "@sb/betting-core/EOutcomeKind";
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import type { EMarketType } from "@sb/betting-core/MarketType";
import { Logger } from "../../../../../common/Utils/Logger";
import type { TMarketType } from "../../../MyBets/Model/TBet";
import { findParticipantTypeByTeamShortId } from "../Event";
import { kindDelimiter } from "./KindDelimiter";
import { isNoDraw } from "./IsNoDraw";
import { outcomeEnumValues } from "./OutcomeEnumValues";

const outcomeViewEnum = {
  team1: "team1",
  team2: "team2",
  team1Draw: "team1_draw",
  team2Draw: "team2_draw",
  team1Team1: "team1_team1",
  team1Team2: "team1_team2",
  drawTeam1: "draw_team1",
  drawDraw: "draw_draw",
  drawTeam2: "draw_team2",
  team2Team1: "team2_team1",
  team2Team2: "team2_team2",
  p1Both: "p1_both",
  p2Both: "p2_both",
  p1p1: "p1_p1",
  p2p2: "p2_p2",
  drawBoth: "draw_both",
  drawNone: "draw_none",
  team1Equal: "team1_equal",
  team1Over: "team1_over",
  team2Equal: "team2_equal",
  team2Over: "team2_over",
  team1Under: "team1_under",
  team2Under: "team2_under",
  drawOver: "draw_over",
  drawUnder: "draw_under",
};

const outcomeViewEnumText = {
  [outcomeViewEnum.team1]: "1",
  [EOutcomeEnumValue.draw]: "X",
  [outcomeViewEnum.team2]: "2",
  [outcomeViewEnum.team1Draw]: "1/X",
  [outcomeViewEnum.team1Team2]: "1/2",
  [outcomeViewEnum.team2Draw]: "2/X",
  [outcomeViewEnum.team1Team1]: "1/1",
  [outcomeViewEnum.team2Team1]: "2/1",
  [outcomeViewEnum.team2Team2]: "2/2",
  [outcomeViewEnum.drawTeam1]: "X/1",
  [outcomeViewEnum.drawDraw]: "X/X",
  [outcomeViewEnum.drawTeam2]: "X/2",
  [outcomeViewEnum.p1Both]: "1G",
  [outcomeViewEnum.p1p1]: "1NG",
  [outcomeViewEnum.drawBoth]: "XG",
  [outcomeViewEnum.drawNone]: "XNG",
  [outcomeViewEnum.p2Both]: "2G",
  [outcomeViewEnum.p2p2]: "2NG",
  [outcomeViewEnum.team1Equal]: "A7",
  [outcomeViewEnum.team1Over]: "A>7",
  [outcomeViewEnum.team2Equal]: "B7",
  [outcomeViewEnum.team2Over]: "B>7",
};

const dcViewEnumText = {
  [outcomeViewEnum.team1Draw]: "1X",
  [outcomeViewEnum.team2Draw]: "X2",
  [outcomeViewEnum.team1Team2]: "12",
};

const getOutcomeViewEnumText = (marketType: EMarketType | TMarketType, outcomeViewEnum: EOutcomeEnumValue) => {
  const group = marketTypeToMarketGroupMap[marketType as EMarketType];

  const map = [EMarketGroup.dc, EMarketGroup.interval_dc].includes(group) ? dcViewEnumText : outcomeViewEnumText;

  return map[outcomeViewEnum];
};

const normalizeForId = (outcome, participants) => {
  const participantType = findParticipantTypeByTeamShortId(participants, outcome);

  if (participantType) {
    return participantType;
  }

  Logger.warn.app("[normalizeForId]", "Invalid outcome kind: participant not found", outcome);

  return "";
};

const normalizeForEnum = (outcome) => {
  if (isNoDraw(outcome)) {
    return outcomeViewEnum.team1Team2;
  }

  if (!outcomeEnumValues.includes(outcome)) {
    Logger.warn.app("[normalizeForEnum]", `Invalid outcome kind: ${outcome}`);

    return "";
  }

  return (
    outcome
  );
};

const normalizeForIdEnum = (outcome, participants) => {
  const values = outcome.split(kindDelimiter);

  return (
    [normalizeForId, normalizeForEnum]
      .map((normalize, i) => (normalize(values[i], participants)))
      .join(kindDelimiter)
  );
};

const normalizeForIdId = (outcome, participants) => {
  const [shortId1, shortId2] = outcome.split(kindDelimiter);

  return (
    [shortId1, shortId2]
      .map((shortId) => (normalizeForId(shortId, participants)))
      .join(kindDelimiter)
  );
};

const normalizeMap = {
  [EOutcomeKind.id]: normalizeForId,
  [EOutcomeKind.enum]: normalizeForEnum,
  [EOutcomeKind.id_enum]: normalizeForIdEnum,
  [EOutcomeKind.id_id]: normalizeForIdId,
};

const toViewEnum = (participants, outcomeParameters): EOutcomeEnumValue | undefined => {
  const kind = outcomeParameters["@kind"];

  if (!normalizeMap[kind]) {
    return void 0;
  }

  if (!outcomeParameters.outcome) {
    Logger.warn.react("[toViewEnum]", "Invalid outcome: not found field 'outcome' in outcome.params");

    return void 0;
  }

  return normalizeMap[kind](outcomeParameters.outcome, participants);
};

export {
  outcomeViewEnum,
  outcomeViewEnumText,
  dcViewEnumText,
  toViewEnum,
  getOutcomeViewEnumText,
};
