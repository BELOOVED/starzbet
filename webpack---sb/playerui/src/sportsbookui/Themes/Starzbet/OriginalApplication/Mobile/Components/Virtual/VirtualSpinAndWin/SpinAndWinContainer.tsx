// @ts-nocheck
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { EMarketType } from "@sb/betting-core/MarketType";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import classes from "./SpinAndWinContainer.module.css";
import { marketTypeByIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { spinAndWinMarketListSelector } from "../../../../../../../Store/Virtual/SpinAndWin/Selectors/SpinAndWinMarketListSelector";
import { VirtualGameMenu } from "../../../../Desktop/Components/Virtual/VirtualGameMenu/VirtualGameMenu";
import { SpinAndWinTable } from "./SpinAndWinTable/SpinAndWinTable";
import { NumbersSector, RouletteSector } from "./SpinAndWinSectors/SpinAndWinSectors";
import { Neighbors } from "./Neighbors/Neighbors";

const RouletteNumbersMarket = memo(({ id }) => (
  <>
    <SpinAndWinTable marketId={id} />

    <NumbersSector marketId={id} />

    <Neighbors marketId={id} />
  </>
));
RouletteNumbersMarket.displayName = "RouletteNumbersMarket";

const sectorOddEven = [EOutcomeEnumValue.even, EOutcomeEnumValue.odd];

const sectorRedBlack = [EOutcomeEnumValue.red, EOutcomeEnumValue.black];

const viewMap = {
  [EMarketType.score_roulette_numbers]: RouletteNumbersMarket,
  [EMarketType.score_roulette_odd_even]: ({ id }) => <RouletteSector list={sectorOddEven} id={id} />,
  [EMarketType.score_roulette_red_black]: ({ id }) => <RouletteSector list={sectorRedBlack} id={id} />,
};

const MarketContainer = memo(({ id }) => {
  const marketType = useParamSelector(marketTypeByIdSelector, [id]);

  return createElement(viewMap[marketType], { key: id, id });
});
MarketContainer.displayName = "MarketContainer";

const SpinAndWinContainer = memo(() => {
  const marketIds = useSelector(spinAndWinMarketListSelector);

  return (
    <div className={classes.container}>
      <VirtualGameMenu>
        <div className={classes.marketContainer}>
          {marketIds.map((id) => <MarketContainer id={id} key={id} />)}
        </div>
      </VirtualGameMenu>
    </div>
  );
});
SpinAndWinContainer.displayName = "SpinAndWinContainer";

export { SpinAndWinContainer };
