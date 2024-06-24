import type React from "react";
import { useAction, usePersistCallback } from "@sb/utils";
import { betSlipChangeTabAction, betSlipChangeTabWithResetAction } from "../BetSlipActions";

const useBetSlipChangeTabAction = () => {
  const changeTab = useAction(betSlipChangeTabAction);

  return usePersistCallback((e: React.SyntheticEvent<HTMLElement>) => changeTab(e.currentTarget.dataset.tab));
};

const useBetSlipChangeTabWithResetAction = () => {
  const changeTab = useAction(betSlipChangeTabWithResetAction);

  return usePersistCallback((e: React.SyntheticEvent<HTMLElement>) => changeTab(e.currentTarget.dataset.tab));
};

export { useBetSlipChangeTabAction, useBetSlipChangeTabWithResetAction };
