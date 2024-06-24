// @ts-nocheck
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { EMarketType } from "@sb/betting-core/MarketType";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import classes from "./KenoContainer.module.css";
import { marketTypeByIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { kenoMarketListSelector } from "../../../../../../../Store/Virtual/Keno/Selectors/KenoMarketListSelector";
import { virtualGameBySportSelector } from "../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import { VirtualGameMenu } from "../../../../Desktop/Components/Virtual/VirtualGameMenu/VirtualGameMenu";
import { KenoTable } from "./KenoTable/KenoTable";
import { KenoOddsBoard } from "./KenoOddsBoard/KenoOddsBoard";
import { KenoMarketList } from "./KenoMarketList/KenoMarketList";

const sportId = sportCodeToIdMap[ESportCode.kiron_keno];

const KenoSubsetInSetMarket = memo(({ id }) => {
  const keys = useSelector(virtualGameBySportSelector(sportId));

  if (!keys || !keys.length) {
    return null;
  }

  return (
    <KenoOddsBoard id={id} />
  );
});
KenoSubsetInSetMarket.displayName = "KenoSubsetInSetMarket";

const viewMap = {
  [EMarketType.score_keno_heads_tails]: KenoMarketList,
  [EMarketType.score_keno_subset_in_set]: KenoSubsetInSetMarket,
};

const MarketContainer = memo(({ id }) => {
  const marketType = useParamSelector(marketTypeByIdSelector, [id]);

  return createElement(viewMap[marketType], { key: id, id });
});
MarketContainer.displayName = "MarketContainer";

const KenoContainer = memo(() => {
  const marketIds = useSelector(kenoMarketListSelector);

  return (
    <div className={classes.container}>
      <KenoTable />

      <VirtualGameMenu>
        <div className={classes.marketContainer}>
          {marketIds.map((id) => <MarketContainer id={id} key={id} />)}
        </div>
      </VirtualGameMenu>
    </div>
  );
});
KenoContainer.displayName = "KenoContainer";

export { KenoContainer };
