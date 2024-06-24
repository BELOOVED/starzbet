// @ts-nocheck
import clsx from "clsx";
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import {
  shared_market_place_number_race_place,
  shared_market_place_number_racing_roulette_in_first_three,
  shared_market_place_number_racing_roulette_in_first_three_for_two,
} from "@sb/translates/shared/SharedTKeys";
import { EMarketType } from "@sb/betting-core/MarketType";
import { marketTypeTKeys } from "@sb/betting-core/SharedTKeys/MarketTypeTKeys";
import { useParamSelector } from "@sb/utils";
import classes from "./RouletteRacingOddsBoard.module.css";
import { marketTypeByIdSelector } from "../../../../../../../../Store/Feed/Selectors/FeedSelectors";
import {
  useRacingRouletteFilterSelector,
} from "../../../../../../../../Store/Virtual/RacingRoulette/Hooks/UseRacingRouletteFilterSelector";
import {
  useRacingRouletteOutcomeParameters,
} from "../../../../../../../../Store/Virtual/RacingRoulette/Hooks/UseRacingRouletteOutcomeParameters";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";
import {
  ERacingRouletteTypeFieldEnum,
  racingRouletteBlackKey,
  racingRouletteFilterValueByElement,
  racingRouletteGetColumnName,
  racingRouletteGetRowName,
  racingRouletteRedKey,
  racingRouletteSimpleKeyMap,
  racingRouletteTKeyByKeyListMap,
} from "../../../../../../../../Store/Virtual/RacingRoulette/Model/RacingRoulettte";
import {
  useRacingRouletteCoefficientSelector,
} from "../../../../../../../../Store/Virtual/RacingRoulette/Hooks/UseRacingRouletteCoefficientSelector";
import {
  racingRouletteMarketListSelector,
} from "../../../../../../../../Store/Virtual/RacingRoulette/Selectors/RacingRouletteMarketListSelector";
import {
  useRacingRouletteOutcomeIdSelector,
} from "../../../../../../../../Store/Virtual/RacingRoulette/Hooks/UseRacingRouletteOutcomeIdSelector";
import { virtualGameBySportSelector } from "../../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import { coefficientFormat } from "../../../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { PlaceSubTitle, TwoAnyOrderSubTitle, TwoFromThreeSubTitle } from "../RouletteRacingSubtitle/RouletteRacingSubtitle";

const marketList = [
  EMarketType.place_number_racing_roulette_first,
  EMarketType.place_number_racing_roulette_first_second,
  EMarketType.place_number_racing_roulette_two_from_three,
];

const inFirstThreeTKeys = [
  shared_market_place_number_race_place,
  shared_market_place_number_racing_roulette_in_first_three_for_two,
  shared_market_place_number_racing_roulette_in_first_three,
];

const marketTypeList = [
  ERacingRouletteTypeFieldEnum.columns,
  ERacingRouletteTypeFieldEnum.rows,
  ERacingRouletteTypeFieldEnum.low,
  ERacingRouletteTypeFieldEnum.even,
  ERacingRouletteTypeFieldEnum.red,
];

const MarketHeadWithFirstLetter = memo(({ keyList }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.marketHeadWrapper}>{keyList.map((key) => t(racingRouletteTKeyByKeyListMap[key])[0]).join(" ")}</div>
  );
});
MarketHeadWithFirstLetter.displayName = "MarketHeadWithFirstLetter";

const MarketHeadBox = memo(({ id }) => {
  const classList = clsx(
    classes.headColorBox,
    racingRouletteRedKey.includes(id) && classes.red,
    racingRouletteBlackKey.includes(id) && classes.black,
    id === 0 && classes.green,
  );

  return (
    <div className={classList}>
      {id}
    </div>
  );
});
MarketHeadBox.displayName = "MarketHeadBox";

const MarketHeadNumbers = memo(({ keyList }) => (
  <div className={classes.marketHeadWrapper}>
    {keyList.map((id) => <MarketHeadBox id={+id} key={id} />)}
  </div>
));
MarketHeadNumbers.displayName = "MarketHeadNumbers";

const MarketHeadColumn = memo(({ keyList }) => (
  <div className={classes.marketHeadWrapper}>
    {racingRouletteGetColumnName(keyList)}
  </div>
));
MarketHeadColumn.displayName = "MarketHeadColumn";

const MarketHeadRow = memo(({ keyList }) => (
  <div className={classes.marketHeadWrapper}>
    {racingRouletteGetRowName(keyList)}
  </div>
));
MarketHeadRow.displayName = "MarketHeadRow";

const getMarketListByKeyList = (colorList) => clsx(
  classes.headColorBox,
  racingRouletteBlackKey.join(",") === colorList && classes.black,
  racingRouletteRedKey.join(",") === colorList && classes.red,
);

const MarketHeadColor = memo(({ keyList }) => (
  <div className={classes.marketHeadWrapper}>
    {
      keyList.map((colorList, idx) => (
        <div
          key={`${idx}:${colorList}`}
          className={getMarketListByKeyList(colorList)}
        />
      ))
    }
  </div>
));
MarketHeadColor.displayName = "MarketHeadColor";

const marketHeadMapByType = {
  [ERacingRouletteTypeFieldEnum.numbers]: MarketHeadNumbers,
  [ERacingRouletteTypeFieldEnum.columns]: MarketHeadColumn,
  [ERacingRouletteTypeFieldEnum.rows]: MarketHeadRow,
  [ERacingRouletteTypeFieldEnum.red]: MarketHeadColor,
  [ERacingRouletteTypeFieldEnum.even]: MarketHeadWithFirstLetter,
  [ERacingRouletteTypeFieldEnum.low]: MarketHeadWithFirstLetter,
};

const MarketGroup = memo(({
  outcomeId,
  coefficient,
  subtitle,
}) => {
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const classesList = clsx(
    classes.outcome,
    active && classes.active,
  );

  return (
    <div className={classes.outcomeWrapper}>
      <div
        className={classesList}
        onClick={createHandler}
      >
        {coefficientFormat(coefficient)}
      </div>

      {subtitle}
    </div>
  );
});
MarketGroup.displayName = "MarketGroup";

const OutcomeContainer = memo(({ marketId, keyList, subtitle }) => {
  const outcome = useRacingRouletteOutcomeParameters(marketId, keyList);
  const outcomeId = useRacingRouletteOutcomeIdSelector(marketId, outcome);
  const coefficient = useRacingRouletteCoefficientSelector(marketId, outcome);

  return (
    <MarketGroup
      outcomeId={outcomeId}
      coefficient={coefficient}
      marketId={marketId}
      subtitle={subtitle}
    />
  );
});
OutcomeContainer.displayName = "OutcomeContainer";

const MainMarket = memo(({ marketId, type, ...rest }) => {
  const marketType = useParamSelector(marketTypeByIdSelector, [marketId]);

  if (marketType === EMarketType.place_number_racing_roulette_in_first_three) {
    return null;
  }

  const subtitle = type === ERacingRouletteTypeFieldEnum.numbers &&
    marketType === EMarketType.place_number_racing_roulette_two_from_three &&
    <TwoFromThreeSubTitle />;

  return (
    <OutcomeContainer
      marketId={marketId}
      subtitle={subtitle}
      {...rest}
    />
  );
});
MainMarket.displayName = "MainMarket";

const MainMarketGroupContainer = memo(({ marketIds, type }) => {
  const value = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette]));
  const markets = useRacingRouletteFilterSelector(marketIds, value, type);

  return (
    <div className={classes.marketList}>
      {
        markets.map(({ marketId, filterList }, idx) => (
          <MainMarket
            marketId={marketId}
            keyList={filterList}
            type={type}
            key={`${idx}:${marketId}`}
          />
        ))
      }
    </div>
  );
});
MainMarketGroupContainer.displayName = "MainMarketGroupContainer";

const MarketOutcomeList = memo(({ type }) => {
  const value = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette]));
  const keyList = racingRouletteFilterValueByElement(value, racingRouletteSimpleKeyMap[type]);
  const marketHeadContainer = marketHeadMapByType[type] ?? MarketHeadWithFirstLetter;

  return createElement(marketHeadContainer, { keyList });
});
MarketOutcomeList.displayName = "MarketOutcomeList";

const getSubtitleByLength = (length) => {
  if (length === 1) {
    return <PlaceSubTitle />;
  }

  if (length === 2) {
    return <TwoAnyOrderSubTitle />;
  }

  return null;
};

const InFirstTree = memo(({ marketId, keyList, ...rest }) => {
  const marketType = useParamSelector(marketTypeByIdSelector, [marketId]);

  if (marketType !== EMarketType.place_number_racing_roulette_in_first_three) {
    return null;
  }

  return (
    <OutcomeContainer
      marketId={marketId}
      keyList={keyList}
      subtitle={getSubtitleByLength(keyList.length)}
      {...rest}
    />
  );
});
InFirstTree.displayName = "InFirstTree";

const InFirstTreeMarket = memo(({ marketIds }) => {
  const value = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette]));
  const markets = useRacingRouletteFilterSelector(marketIds, value, ERacingRouletteTypeFieldEnum.numbers);

  return (
    <div className={classes.marketList}>
      {
        markets.map(({ marketId, filterList }, idx) => (
          <InFirstTree
            marketId={marketId}
            keyList={filterList}
            key={`${idx}:${marketId}`}
          />
        ))
      }
    </div>
  );
});
InFirstTreeMarket.displayName = "InFirstTreeMarket";

const NumbersMarketList = memo(({ marketIds }) => {
  const [t] = useTranslation();

  const value = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette]));
  const markets = useRacingRouletteFilterSelector(marketIds, value, ERacingRouletteTypeFieldEnum.numbers);

  if (!markets.length) {
    return null;
  }

  return (
    <div>
      <MarketMainHeader />

      <div className={classes.marketGroup}>
        <MarketOutcomeList type={ERacingRouletteTypeFieldEnum.numbers} />

        <div className={`${classes.marketWrapper} ${classes.marketBorder}`}>
          <MainMarketGroupContainer
            type={ERacingRouletteTypeFieldEnum.numbers}
            marketIds={marketIds}
          />

          <div className={classes.marketHead}>
            {
              inFirstThreeTKeys.map((tKey) => (
                <div className={classes.marketTitle} key={tKey}>
                  {t(tKey)}
                </div>
              ))
            }
          </div>

          <InFirstTreeMarket marketIds={marketIds} />
        </div>
      </div>
    </div>
  );
});
NumbersMarketList.displayName = "NumbersMarketList";

const MarketMainHeader = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.mainHeader}>
      {
        marketList.map((marketType) => (
          <div className={classes.marketTitle} key={marketType}>
            {t(marketTypeTKeys[marketType])}
          </div>
        ))
      }
    </div>
  );
});
MarketMainHeader.displayName = "MarketMainHeader";

const MarketGroups = memo(({ type, marketIds }) => {
  const value = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette]));
  const markets = useRacingRouletteFilterSelector(marketIds, value, type);

  if (!markets.length) {
    return null;
  }

  return (
    <div className={classes.marketGroup}>
      <MarketOutcomeList type={type} />

      <div className={classes.marketWrapper}>
        <MainMarketGroupContainer
          type={type}
          marketIds={marketIds}
        />
      </div>
    </div>
  );
});
MarketGroups.displayName = "MarketGroups";

const MarketList = memo(({ marketIds }) => {
  const value = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette]));

  const columns = useRacingRouletteFilterSelector(marketIds, value, ERacingRouletteTypeFieldEnum.columns);
  const rows = useRacingRouletteFilterSelector(marketIds, value, ERacingRouletteTypeFieldEnum.rows);
  const red = useRacingRouletteFilterSelector(marketIds, value, ERacingRouletteTypeFieldEnum.red);
  const even = useRacingRouletteFilterSelector(marketIds, value, ERacingRouletteTypeFieldEnum.even);
  const low = useRacingRouletteFilterSelector(marketIds, value, ERacingRouletteTypeFieldEnum.low);

  if (![...columns, ...rows, ...red, ...even, ...low].length) {
    return null;
  }

  return (
    <div>
      <MarketMainHeader />

      {
        marketTypeList.map((type) => (
          <MarketGroups key={type} type={type} marketIds={marketIds} />
        ))
      }
    </div>
  );
});
MarketList.displayName = "MarketList";

const RouletteRacingOddsBoard = memo(() => {
  const value = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_racing_roulette]));

  const marketIds = useSelector(racingRouletteMarketListSelector);

  if (!value || !value.length || !marketIds.length) {
    return null;
  }

  return (
    <div className={classes.marketContainer}>
      <MarketList marketIds={marketIds} />

      <NumbersMarketList marketIds={marketIds} />
    </div>
  );
});
RouletteRacingOddsBoard.displayName = "RouletteRacingOddsBoard";

export { RouletteRacingOddsBoard };
