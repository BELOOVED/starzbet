// @ts-nocheck
import { memo } from "react";
import classes from "./LuckyLootContainer.module.css";
import { VirtualGameMenu } from "../../../../Desktop/Components/Virtual/VirtualGameMenu/VirtualGameMenu";
import { LuckyLootTable } from "./LuckyLootTable/LuckyLootTable";
import { FirstBalls } from "./LuckyLootCombo/LuckyLootCombo";
import { LuckyLootColorPicker } from "./LuckyLootColorPicker/LuckyLootColorPicker";
import { LuckyLootSumOfDrawMarketGroups } from "./LuckyLootMarketList/LuckyLootMarketList";

const LuckyLootContainer = memo(() => (
  <div className={classes.container}>
    <LuckyLootTable />

    <VirtualGameMenu>
      <div className={classes.marketContainer}>
        <LuckyLootColorPicker />

        <LuckyLootSumOfDrawMarketGroups />

        <FirstBalls />
      </div>
    </VirtualGameMenu>
  </div>
));
LuckyLootContainer.displayName = "LuckyLootContainer";

export { LuckyLootContainer };
