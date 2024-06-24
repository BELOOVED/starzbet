// @ts-nocheck
import { createElement, Fragment, memo } from "react";
import { findTeamByShortId } from "@sb/betting-core/FindTeamByShortId";
import { useTranslation } from "@sb/translator";
import { EOutcomeKind } from "@sb/betting-core/EOutcomeKind";
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { EMarketType } from "@sb/betting-core/MarketType";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { outcomeEnumValueTKeys } from "@sb/betting-core/SharedTKeys/OutcomeEnumValueTKeys";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./OutcomeName.module.css";
import { getTeamList, getTeamListByOutcome } from "../../Store/Feed/Model/Event";
import { isNoDraw } from "../../Store/Feed/Model/Outcome/IsNoDraw";
import { outcomeTKeysByMarketGroup } from "../../Store/Feed/Model/Outcome/OutcomeEnumValues";
import { kindDelimiter } from "../../Store/Feed/Model/Outcome/KindDelimiter";
import { outcomeViewEnumText } from "../../Store/Feed/Model/Outcome/OutcomeViewEnum";
import { placesTKeys } from "../../Store/Virtual/ScoreRacingSport/Model/PlacesTKeys";
import { getTeamNumber } from "../../Store/Virtual/ScoreRacingSport/Model/GetTeamNumber";
import { Ellipsis } from "../Ellipsis/Ellipsis";
import {
  RouletteRacingTeamNormalizer,
  RouletteRacingTeamNumbersNormalizer,
  TeamListIdSequenceFirstSecondThird,
} from "./RouletteRacingNormalizer";

const marketGroupsWithColor = {
  [EMarketGroup.roulette_red_black]: {
    [EOutcomeEnumValue.red]: classes.redBox,
    [EOutcomeEnumValue.black]: classes.blackBox,
  },
  [EMarketGroup.lucky_loot_first_color]: {
    [EOutcomeEnumValue.green]: classes.greenBall,
    [EOutcomeEnumValue.yellow]: classes.yellowBall,
    [EOutcomeEnumValue.blue]: classes.blueBall,
    [EOutcomeEnumValue.red]: classes.redBall,
  },
};

const NormalizeColor = memo(({ className }) => (
  <div className={`${className} ${classes.field}`} />
));
NormalizeColor.displayName = "NormalizeColor";

const NormalizeForId = memo(({ outcome, participants }) => (
  <BaseTeamName team={findTeamByShortId(participants, outcome)} />
));
NormalizeForId.displayName = "NormalizeForId";

const NormalizeForIdId = memo(({ outcome, marketType }) => {
  const marketGroup = marketTypeToMarketGroupMap[marketType];

  if (marketGroup === EMarketGroup._1x2_teams_to_score) {
    return outcomeViewEnumText[outcome];
  }

  return "";
});
NormalizeForIdId.displayName = "NormalizeForIdId";

const NormalizeForEnum = memo(({
  marketType,
  sportId,
  outcome,
  participants,
}) => {
  const [t] = useTranslation();

  if (isNoDraw(outcome)) {
    const [team1, team2] = getTeamList(participants);

    return (
      <>
        <BaseTeamName team={team1} />

        {" / "}

        <BaseTeamName team={team2} />
      </>
    );
  }

  const marketGroup = marketTypeToMarketGroupMap[marketType];

  if (marketGroupsWithColor[marketGroup]) {
    return <NormalizeColor className={marketGroupsWithColor[marketGroup][outcome]} />;
  }

  if (marketGroup === EMarketGroup._1x2_teams_to_score) {
    return outcomeViewEnumText[outcome];
  }

  if (outcomeTKeysByMarketGroup[marketGroup]) {
    return t(outcomeTKeysByMarketGroup[marketGroup][outcome], { context: { sportId } });
  }

  return t(outcomeEnumValueTKeys[outcome]);
});
NormalizeForEnum.displayName = "NormalizeForEnum";

const NormalizeForIdEnum = memo(({
  outcome,
  participants,
  marketType,
}) => {
  const marketGroup = marketTypeToMarketGroupMap[marketType];

  if (marketGroup === EMarketGroup._1x2_teams_to_score) {
    return outcomeViewEnumText[outcome];
  }

  const values = outcome.split(kindDelimiter);

  return (
    <>
      <NormalizeForId
        outcome={values[0]}
        participants={participants}
      />

      {" / "}

      <NormalizeForEnum
        outcome={values[1]}
        participants={participants}
      />
    </>
  );
});
NormalizeForIdEnum.displayName = "NormalizeForIdEnum";

const TeamListStringIdSequence = memo(({ outcome, participants }) => {
  const teamList = getTeamListByOutcome(participants, outcome);

  return (
    <Ellipsis>
      {
        teamList.map((team, idx) => (
          <Fragment key={idx}>
            <BaseTeamName team={team} />

            {idx !== teamList.length - 1 && ", "}
          </Fragment>
        ))
      }
    </Ellipsis>
  );
});
TeamListStringIdSequence.displayName = "TeamListStringIdSequence";

// eslint-disable-next-line rulesdir/no-truethly-default-assign
const TeamListOrderIdSequence = memo(({ outcome, participants, collapsed = true }) => {
  const [t] = useTranslation();

  const teamList = getTeamListByOutcome(participants, outcome);

  return (
    <div className={classes.sequenceName}>
      <div className={classes.sequenceIconList}>
        {
          teamList.map((team) => (
            <div className={classes.teamNumber} key={team.shortId}>
              {getTeamNumber(team.shortId)}
            </div>
          ))
        }
      </div>

      {
        collapsed && (
          <div className={classes.sequenceTeamList}>
            {
              teamList.map((team, idx) => (
                <div className={classes.teamSequence} key={team.shortId}>
                  <div className={classes.scoreRacingTitle}>
                    {t(placesTKeys[idx])}
                  </div>

                  <div className={classes.scoreRacingNumber}>
                    {"#"}

                    {getTeamNumber(team.shortId)}
                  </div>

                  <div className={classes.scoreRacingTeamName}>
                    <BaseTeamName team={team} />
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
});
TeamListOrderIdSequence.displayName = "TeamListOrderIdSequence";

const displayTeamListMap = {
  [EMarketType.score_to_score_race]: TeamListStringIdSequence,
  [EMarketType.place_number_racing_roulette_first]: RouletteRacingTeamNormalizer,
  [EMarketType.place_number_racing_roulette_first_second]: TeamListIdSequenceFirstSecondThird,
  [EMarketType.place_number_racing_roulette_first_second_third]: TeamListIdSequenceFirstSecondThird,
  [EMarketType.place_number_racing_roulette_two_from_three]: RouletteRacingTeamNumbersNormalizer,
  [EMarketType.place_number_racing_roulette_in_first_three]: RouletteRacingTeamNumbersNormalizer,
};

const NormalizeForIdSequence = memo(({ marketType, ...rest }) => {
  const view = displayTeamListMap[marketType] ?? TeamListOrderIdSequence;

  return createElement(view, { ...rest });
});
NormalizeForIdSequence.displayName = "NormalizeForIdSequence";

const TeamNamePeriod = memo(({ shortId, participants }) => {
  const [t] = useTranslation();

  if (shortId === EOutcomeEnumValue.draw) {
    return t(outcomeEnumValueTKeys[EOutcomeEnumValue.draw]);
  }

  const team = findTeamByShortId(participants, shortId);

  return (
    <BaseTeamName team={team} />
  );
});
TeamNamePeriod.displayName = "TeamNamePeriod";

const NormalizeForPeriod = memo(({
  period1,
  period2,
  period3,
  participants,
}) => (
  <>
    <TeamNamePeriod shortId={period1} participants={participants} />

    {" / "}

    <TeamNamePeriod shortId={period2} participants={participants} />

    {" / "}

    <TeamNamePeriod shortId={period3} participants={participants} />
  </>
));
NormalizeForPeriod.displayName = "NormalizeForPeriod";

const mapBaseNormalizer = {
  [EOutcomeKind.id]: NormalizeForId,
  [EOutcomeKind.enum]: NormalizeForEnum,
  [EOutcomeKind.id_enum]: NormalizeForIdEnum,
  [EOutcomeKind.id_sequence]: NormalizeForIdSequence,
  [EOutcomeKind.period123]: NormalizeForPeriod,
  [EOutcomeKind.id_id]: NormalizeForIdId,
};

export { mapBaseNormalizer };
