import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { getRacingRouletteOutcomeParameters } from "../../RacingRoulette/Model/GetOutcomeParameters";
import { getKenoOutcomeParameters } from "../../Keno/Model/GetOutcomeParameters";
import { getSpinAndWinOutcomeParameters } from "../../SpinAndWin/Model/GetOutcomeParameters";
import { getLuckyLootOutcomeParameters } from "../../LuckyLoot/Model/GetOutcomeParameters";

const getVirtualGameOutcomeParametersMap = {
  [sportCodeToIdMap[ESportCode.kiron_racing_roulette]]: getRacingRouletteOutcomeParameters,
  [sportCodeToIdMap[ESportCode.kiron_keno]]: getKenoOutcomeParameters,
  [sportCodeToIdMap[ESportCode.kiron_roulette]]: getSpinAndWinOutcomeParameters,
  [sportCodeToIdMap[ESportCode.kiron_lucky_loot]]: getLuckyLootOutcomeParameters,
};

export { getVirtualGameOutcomeParametersMap };
