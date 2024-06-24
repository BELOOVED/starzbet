// @ts-nocheck
import clsx from "clsx";
import { createElement, memo } from "react";
import { useTranslation } from "@sb/translator";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./RouletteRacingNormalizer.module.css";
import {
  ERacingRouletteTypeFieldEnum,
  racingRouletteBlackKey,
  racingRouletteExtractColumnKey,
  racingRouletteExtractRowKey,
  racingRouletteGetTypeByOutcome,
  racingRouletteRedKey,
  racingRouletteTKeyByKeyListMap,
} from "../../Store/Virtual/RacingRoulette/Model/RacingRoulettte";
import { findTeamByShortId } from "../../Store/Feed/Model/Event";

const getKeyParticipants = (keyList) => keyList.replaceAll("p", "");

const MarketHeadWithFirstLetter = memo(({ keyList }) => {
  const [t] = useTranslation();

  return t(racingRouletteTKeyByKeyListMap[getKeyParticipants(keyList)])[0];
});
MarketHeadWithFirstLetter.displayName = "MarketHeadWithFirstLetter";

const MarketHeadBox = memo(({ team }) => {
  const classList = clsx(
    classes.headColorBox,
    racingRouletteRedKey.includes(+team.name) && classes.red,
    racingRouletteBlackKey.includes(+team.name) && classes.black,
    +team.name === 0 && classes.green,
  );

  return (
    <div className={classList}>
      <BaseTeamName team={team} />
    </div>
  );
});
MarketHeadBox.displayName = "MarketHeadBox";

const MarketHeadNumbers = memo(({ keyList, participants }) => (
  <div className={classes.list}>
    {
      keyList.split(",").map((name) => (
        <MarketHeadBox team={findTeamByShortId(participants, name)} key={name} />
      ))
    }
  </div>
));
MarketHeadNumbers.displayName = "MarketHeadNumbers";

const MarketHeadColumn = memo(({ keyList }) => (
  <>
    {"R"}

    {racingRouletteExtractColumnKey(getKeyParticipants(keyList))}
  </>
));
MarketHeadColumn.displayName = "MarketHeadColumn";

const MarketHeadRow = memo(({ keyList }) => (
  <>
    {"C"}

    {racingRouletteExtractRowKey(getKeyParticipants(keyList))}
  </>
));
MarketHeadRow.displayName = "MarketHeadRow";

const getMarketListByKeyList = (colorList) => clsx(
  classes.headColorBox,
  racingRouletteBlackKey.join(",") === colorList && classes.black,
  racingRouletteRedKey.join(",") === colorList && classes.red,
);

const MarketHeadColor = memo(({ keyList }) => (
  <div className={getMarketListByKeyList(getKeyParticipants(keyList))} />
));
MarketHeadColor.displayName = "MarketHeadColor";

const viewByTypeOutcome = {
  [ERacingRouletteTypeFieldEnum.numbers]: MarketHeadNumbers,
  [ERacingRouletteTypeFieldEnum.columns]: MarketHeadColumn,
  [ERacingRouletteTypeFieldEnum.rows]: MarketHeadRow,
  [ERacingRouletteTypeFieldEnum.red]: MarketHeadColor,
  [ERacingRouletteTypeFieldEnum.even]: MarketHeadWithFirstLetter,
  [ERacingRouletteTypeFieldEnum.low]: MarketHeadWithFirstLetter,
};

const RouletteRacingTeamNormalizer = memo(({ outcome, participants }) => {
  const type = racingRouletteGetTypeByOutcome(outcome);
  const view = viewByTypeOutcome[type];

  return createElement(view, { keyList: outcome, participants });
});
RouletteRacingTeamNormalizer.displayName = "RouletteRacingTeamNormalizer";

const RouletteRacingTeamNumbersNormalizer = memo(({ outcome, participants }) => (
  <MarketHeadNumbers
    keyList={outcome}
    participants={participants}
  />
));
RouletteRacingTeamNumbersNormalizer.displayName = "RouletteRacingTeamNumbersNormalizer";

const TeamListIdSequenceFirstSecondThird = memo(({
  first,
  second,
  third,
  participants,
}) => (
  <div className={classes.list}>
    <RouletteRacingTeamNormalizer outcome={first} participants={participants} />

    {
      second && (
        <div className={classes.list}>
          <RouletteRacingTeamNormalizer outcome={second} participants={participants} />

          {
            third && (
              <div className={classes.list}>
                <RouletteRacingTeamNormalizer outcome={third} participants={participants} />
              </div>
            )
          }
        </div>
      )
    }
  </div>
));
TeamListIdSequenceFirstSecondThird.displayName = "TeamListIdSequenceFirstSecondThird";

export { RouletteRacingTeamNormalizer, TeamListIdSequenceFirstSecondThird, RouletteRacingTeamNumbersNormalizer };
