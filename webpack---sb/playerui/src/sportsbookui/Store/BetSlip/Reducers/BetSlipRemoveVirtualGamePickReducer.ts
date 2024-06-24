// @ts-nocheck
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { virtualGameSelector } from "../Selectors/VirtualSelectors";

const removeRacingRoulettePick = (pick, key) => {
  const index = pick.findIndex((it) => it === key);

  return [
    ...pick.slice(0, index),
    ...pick.slice(index + 1),
  ];
};

const removeRoulettePick = (pick, keyList) => pick.filter((it) => !keyList.includes(it));

const removePickMap = {
  [sportCodeToIdMap[ESportCode.kiron_racing_roulette]]: removeRacingRoulettePick,
  [sportCodeToIdMap[ESportCode.kiron_roulette]]: removeRoulettePick,
};

const betSlipRemoveVirtualGamePickReducer = (state, { payload: { sportId, key } }) => {
  const pick = virtualGameSelector(state)[sportId];

  return {
    ...state,
    betSlip: {
      ...state.betSlip,
      virtualGame: {
        ...state.betSlip.virtualGame,
        [sportId]: removePickMap[sportId](pick, key),
      },
    },
  };
};

export { betSlipRemoveVirtualGamePickReducer };
