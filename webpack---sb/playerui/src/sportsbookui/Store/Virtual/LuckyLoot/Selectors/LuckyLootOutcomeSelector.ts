// @ts-nocheck
import { createSelector } from "reselect";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { sortBy } from "../../../../Utils/SortBy";
import { virtualGameBySportSelector } from "../../../BetSlip/Selectors/VirtualSelectors";

const luckyLootOutcomeSelector = (keyLength = 0) => createSelector(
  virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_lucky_loot]),
  (keyList) => sortBy((it) => +it, keyList.slice(0, keyLength)).join(","),
);

export { luckyLootOutcomeSelector };
