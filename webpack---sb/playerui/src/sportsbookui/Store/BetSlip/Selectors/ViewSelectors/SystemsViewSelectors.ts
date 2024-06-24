import negate from "lodash/fp/negate";
import { createSelector } from "reselect";
import { createMemoSelector } from "@sb/utils";
import { toSelectOption } from "../../../../../common/Components/Field/SelectModel";
import { generateFoldAndSystemHashes, isAccumulatorHash } from "../../Model/BetHash";
import { betSlipSystemHashSelector } from "../BetSlipSelectors";
import { validPicksViewSelector } from "./ValidPicksViewSelector";

const systemsViewSelector = createSelector(
  validPicksViewSelector,
  (picks) => {
    const someBanker = picks.some((pick) => pick.banker);

    return someBanker
      ? generateFoldAndSystemHashes(picks)
      : generateFoldAndSystemHashes(picks).filter(negate(isAccumulatorHash));
  },
);

const systemsOptionsSelector = createMemoSelector(
  [systemsViewSelector],
  (systems) => systems.map(toSelectOption),
);

const currentSystemHashViewSelector = createSelector(
  betSlipSystemHashSelector,
  systemsViewSelector,
  (current, systems) => systems.includes(current)
    ? current
    : systems[0],
);

export { systemsViewSelector, systemsOptionsSelector, currentSystemHashViewSelector };
