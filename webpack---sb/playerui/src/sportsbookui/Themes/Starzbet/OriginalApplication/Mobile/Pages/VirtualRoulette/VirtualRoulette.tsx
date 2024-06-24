// @ts-nocheck
import { memo, createElement } from "react";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import classes from "./VirtualRoulette.module.css";
import { KenoContainer } from "../../Components/Virtual/VirtualKeno/KenoContainer";
import { SpinAndWinContainer } from "../../Components/Virtual/VirtualSpinAndWin/SpinAndWinContainer";
import { RouletteRacingContainer } from "../../Components/Virtual/VirtualRouletteRacing/RouletteRacingContainer";
import { LuckyLootContainer } from "../../Components/Virtual/VirtualLuckyLoot/LuckyLootContainer";

const virtualRouletteViewMap = {
  [ESportCode.kiron_roulette]: SpinAndWinContainer,
  [ESportCode.kiron_keno]: KenoContainer,
  [ESportCode.kiron_racing_roulette]: RouletteRacingContainer,
  [ESportCode.kiron_lucky_loot]: LuckyLootContainer,
};

const VirtualRoulette = memo(({
  match: { params: { sportId } },
}) => (
  <div className={classes.wrapper}>
    {createElement(virtualRouletteViewMap[sportIdToCodeMap[sportId]])}
  </div>
));
VirtualRoulette.displayName = "VirtualRoulette";

export { VirtualRoulette };
