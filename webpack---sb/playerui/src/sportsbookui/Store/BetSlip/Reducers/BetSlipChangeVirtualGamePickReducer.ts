// @ts-nocheck
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { isNumber } from "@sb/utils";
import { racingRouletteFilterValueByElement } from "../../Virtual/RacingRoulette/Model/RacingRoulettte";
import { virtualGameSelector } from "../Selectors/VirtualSelectors";

const getLuckyLootVirtualGamePick = (state, key) => {
  const virtualGame = virtualGameSelector(state);
  const pick = virtualGame[sportCodeToIdMap[ESportCode.kiron_lucky_loot]] || [];

  if (pick.includes(key)) {
    return pick.filter((it) => it !== key);
  } else if (pick.length !== 6) {
    return [...pick, key];
  }

  return pick;
};

const getKenoVirtualGamePick = (state, key) => {
  const virtualGame = virtualGameSelector(state);
  const pick = virtualGame[sportCodeToIdMap[ESportCode.kiron_keno]] || [];

  if (pick.includes(key)) {
    return pick.filter((it) => it !== key);
  } else if (pick.length !== 10) {
    return [...pick, key];
  }

  return pick;
};

const getRacingRouletteVirtualGamePick = (state, key) => {
  const virtualGame = virtualGameSelector(state);
  const pick = virtualGame[sportCodeToIdMap[ESportCode.kiron_racing_roulette]] || [];
  const valueByTypeList = racingRouletteFilterValueByElement(pick, key);

  if (isNumber(+key)) {
    if (pick.includes(key)) {
      return pick.filter((it) => it !== key);
    } else if (valueByTypeList.length < 3) {
      return [...pick, key];
    }
  } else if (valueByTypeList.length < 3) {
    return [...pick, key];
  }

  return pick;
};

const getSpinAndWinVirtualGamePick = (state, key) => {
  const virtualGame = virtualGameSelector(state);
  const pick = virtualGame[sportCodeToIdMap[ESportCode.kiron_roulette]] || [];

  return [...pick, ...key];
};

const getVirtualGamePickMap = {
  [sportCodeToIdMap[ESportCode.kiron_lucky_loot]]: getLuckyLootVirtualGamePick,
  [sportCodeToIdMap[ESportCode.kiron_keno]]: getKenoVirtualGamePick,
  [sportCodeToIdMap[ESportCode.kiron_racing_roulette]]: getRacingRouletteVirtualGamePick,
  [sportCodeToIdMap[ESportCode.kiron_roulette]]: getSpinAndWinVirtualGamePick,
};

const betSlipChangeVirtualGamePickReducer = (state, { payload: { sportId, key } }) => {
  const pick = getVirtualGamePickMap[sportId](state, key);

  return {
    ...state,
    betSlip: {
      ...state.betSlip,
      virtualGame: {
        ...state.betSlip.virtualGame,
        [sportId]: pick,
      },
    },
  };
};

export { betSlipChangeVirtualGamePickReducer };
