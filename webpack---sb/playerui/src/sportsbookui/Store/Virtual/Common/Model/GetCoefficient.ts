import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { getRacingRouletteCoefficient } from "../../RacingRoulette/Model/GetCoefficient";
import { getKenoCoefficient } from "../../Keno/Model/GetCoefficient";
import { getSpinAndWinCoefficient } from "../../SpinAndWin/Model/GetCoefficient";
import { getLuckyLootCoefficient } from "../../LuckyLoot/Model/GetCoefficient";

const getVirtualGameCoefficientMap = {
  [sportCodeToIdMap[ESportCode.kiron_racing_roulette]]: getRacingRouletteCoefficient,
  [sportCodeToIdMap[ESportCode.kiron_keno]]: getKenoCoefficient,
  [sportCodeToIdMap[ESportCode.kiron_roulette]]: getSpinAndWinCoefficient,
  [sportCodeToIdMap[ESportCode.kiron_lucky_loot]]: getLuckyLootCoefficient,
};

export { getVirtualGameCoefficientMap };
