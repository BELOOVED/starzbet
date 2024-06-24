import { createLocalStorageEpic } from "@sb/utils/EpicUtils/CreateLocalStorageEpic";
import { betStrategyChangeAction } from "../../../../sportsbookui/Store/BetStrategy/BetStrategyActions";
import {
  betSlipChangeBetGroupAction,
  betSlipChangeDefaultAmountAction,
  betSlipSetMinimizeAction,
  betSlipSetPositionAction,
} from "../../../../sportsbookui/Store/BetSlip/BetSlipActions";
import { changeSkipAddSelectionTipAction, changeSkipEditBetTutorialAction } from "../../../../sportsbookui/Store/MyBets/MyBetsActions";
import { couponChangeSkipCreateTipAction } from "../../../../sportsbookui/Store/Coupon/CouponActions";
import { modalCloseAction } from "../../Modal/ModalActions";
import { setThemeAction } from "../../Theme/ThemeActions";
import { getLocalStorage, localStorageKeys } from "../localStorageKeys";

const selectBetStrategy = ({ payload: { betStrategy } }: ReturnType<typeof betStrategyChangeAction>) => betStrategy;

const selectChangeAmount = ({ payload: { changeAmount } }: ReturnType<typeof betSlipChangeDefaultAmountAction>) => changeAmount;

const selectGroup = ({ payload: { group } }: ReturnType<typeof betSlipChangeBetGroupAction>) => group;

const selectValue = ({ payload: { value } }) => value;

const selectModal = ({ payload: { type, skip } }: ReturnType<typeof modalCloseAction>) => {
  const alreadyIgnoredModals = getLocalStorage(localStorageKeys.skippedModals) || [];
  if (!skip || alreadyIgnoredModals.includes(type)) {
    return alreadyIgnoredModals;
  }

  return [...alreadyIgnoredModals, type];
};

const sportsbookLocalStorageEpic = createLocalStorageEpic([
  [betStrategyChangeAction, selectBetStrategy, localStorageKeys.betStrategy],
  [betSlipChangeDefaultAmountAction, selectChangeAmount, localStorageKeys.betChangeAmount],
  [betSlipChangeBetGroupAction, selectGroup, localStorageKeys.betGroup],
  [changeSkipEditBetTutorialAction, selectValue, localStorageKeys.skipEditBetTutorial],
  [changeSkipAddSelectionTipAction, selectValue, localStorageKeys.skipAddSelectionTip],
  [couponChangeSkipCreateTipAction, selectValue, localStorageKeys.skipCouponCreateTip],
  [setThemeAction, ({ payload: { theme } }) => theme, localStorageKeys.theme],
  [betSlipSetMinimizeAction, ({ payload: { minimize } }) => minimize, localStorageKeys.betSlipMinimize],
  [betSlipSetPositionAction, (pos) => pos, localStorageKeys.betSlipPos],
  [modalCloseAction, selectModal, localStorageKeys.skippedModals],
]);

export { sportsbookLocalStorageEpic };
