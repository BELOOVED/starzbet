// @ts-nocheck
import { memo } from "react";
import classes from "./RouletteRacingContainer.module.css";
import { VirtualGameMenu } from "../../../../Desktop/Components/Virtual/VirtualGameMenu/VirtualGameMenu";
import { RouletteRacingTable } from "./RouletteRacingTable/RouletteRacingTable";
import { RouletteRacingOddsBoard } from "./RouletteRacingOddsBoard/RouletteRacingOddsBoard";

const RouletteRacingContainer = memo(() => (
  <div className={classes.container}>
    <RouletteRacingTable />

    <VirtualGameMenu>
      <RouletteRacingOddsBoard />
    </VirtualGameMenu>
  </div>
));
RouletteRacingContainer.displayName = "RouletteRacingContainer";

export { RouletteRacingContainer };
