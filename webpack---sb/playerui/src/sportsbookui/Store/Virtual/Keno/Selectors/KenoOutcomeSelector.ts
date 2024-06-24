// @ts-nocheck
import { createSelector } from "reselect";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { sortBy } from "../../../../Utils/SortBy";
import { virtualGameBySportSelector } from "../../../BetSlip/Selectors/VirtualSelectors";

const kenoOutcomeSelector = createSelector(
  virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_keno]),
  (keyList) => sortBy((it) => +it, keyList).join(","),
);

export { kenoOutcomeSelector };
