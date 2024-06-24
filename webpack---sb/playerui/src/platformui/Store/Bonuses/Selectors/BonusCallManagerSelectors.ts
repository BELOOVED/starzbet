import { createMemoSelector, withParams } from "@sb/utils";
import {
  callManagerFailedSelector,
  callManagerStartedSelector,
  callManagerSucceededSelector,
  callManagerWasSucceededSelector,
  type TWithCallManagerState,
} from "@sb/call-manager";
import {
  activateBonusFailedModalIdSelector,
  cancelBonusFailedModalIdSelector,
  claimBonusFailedModalIdSelector,
} from "../../../../common/Store/Modal/Selectors/ModalSelectors";
import { type TAppStateWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import { callManagerErrorTranslateParamsSelectorFactory } from "../../../Utils/СallManagerErrorTranslateParamsSelector";
import {
  ACTIVATE_BONUS_CALL_SYMBOL,
  AVAILABLE_BONUS_CALL_SYMBOL,
  AVAILABLE_BONUSES_CALL_SYMBOL,
  CANCEL_BONUS_CALL_SYMBOL,
  CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL,
  CLAIM_BONUS_CALL_SYMBOL,
  HISTORY_BONUS_CALL_SYMBOL,
  HISTORY_BONUSES_CALL_SYMBOL,
  PLAYER_BONUS_CALL_SYMBOL,
  PLAYER_BONUSES_CALL_SYMBOL,
  REGISTRATION_BONUSES_CALL_SYMBOL,
  REQUEST_CASHBACK_SUM_CALL_SYMBOL,
  TRANSFER_CASHBACK_CALL_SYMBOL,
} from "../BonusVariables";
import { CLAIM_BONUS_BY_PROMOCODE_ERROR_MAP } from "../Model/ErrorMaps/ClaimBonusByPromoCodeErrorMap";
import { CLAIM_BONUS_ERROR_MAP } from "../Model/ErrorMaps/ClaimBonusErrorMap";
import { REQUEST_CASHBACK_ERROR_MAP } from "../Model/ErrorMaps/RequestCashbackErrorMap";
import { ACTIVATE_BONUS_ERROR_MAP } from "../Model/ErrorMaps/ActivateBonusErrorMap";
import { CANCEL_BONUS_ERROR_MAP } from "../Model/ErrorMaps/CancelBonusErrorMap";

type TSelectorWithRequiredId = <S extends TWithCallManagerState>(state: S, id: string) => boolean

const requestCashbackSumTranslateParamsSelector = callManagerErrorTranslateParamsSelectorFactory(REQUEST_CASHBACK_ERROR_MAP);
const claimBonusTranslateParamsSelector = callManagerErrorTranslateParamsSelectorFactory(CLAIM_BONUS_ERROR_MAP);
const claimBonusByPromoCodeTranslateParamsSelector = callManagerErrorTranslateParamsSelectorFactory(CLAIM_BONUS_BY_PROMOCODE_ERROR_MAP);
const activateBonusTranslateParamsSelector = callManagerErrorTranslateParamsSelectorFactory(ACTIVATE_BONUS_ERROR_MAP);
const cancelBonusTranslateParamsSelector = callManagerErrorTranslateParamsSelectorFactory(CANCEL_BONUS_ERROR_MAP);

const availableBonusLoadingSelector: TSelectorWithRequiredId = callManagerStartedSelector.with.symbol(AVAILABLE_BONUS_CALL_SYMBOL);
const playerBonusLoadingSelector: TSelectorWithRequiredId = callManagerStartedSelector.with.symbol(PLAYER_BONUS_CALL_SYMBOL);
const historyBonusLoadingSelector: TSelectorWithRequiredId = callManagerStartedSelector.with.symbol(HISTORY_BONUS_CALL_SYMBOL);
const availableBonusesLoadingSelector = withParams(callManagerStartedSelector, AVAILABLE_BONUSES_CALL_SYMBOL);
const playerBonusesLoadingSelector = withParams(callManagerStartedSelector, PLAYER_BONUSES_CALL_SYMBOL);
const historyBonusesLoadingSelector = withParams(callManagerStartedSelector, HISTORY_BONUSES_CALL_SYMBOL);

const requestCashbackSumLoadingSelector = withParams(callManagerStartedSelector, REQUEST_CASHBACK_SUM_CALL_SYMBOL);
const requestCashbackSumErrorMessageSelector = createMemoSelector(
  withParams(requestCashbackSumTranslateParamsSelector, REQUEST_CASHBACK_SUM_CALL_SYMBOL),
  { resultEqual: "deepEqual" },
);

const transferCashbackLoadingSelector = withParams(callManagerStartedSelector, TRANSFER_CASHBACK_CALL_SYMBOL);
const transferCashbackSucceededSelector = withParams(callManagerSucceededSelector, TRANSFER_CASHBACK_CALL_SYMBOL);
// transferCashback is claimBonus
const transferCashbackErrorMessageSelector = createMemoSelector(
  withParams(claimBonusTranslateParamsSelector, TRANSFER_CASHBACK_CALL_SYMBOL),
  { resultEqual: "deepEqual" },
);

const claimBonusByPromoCodeLoadingSelector = withParams(callManagerStartedSelector, CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL);
const claimBonusByPromoCodeFailedSelector = withParams(callManagerFailedSelector, CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL);
const claimBonusByPromoCodeErrorMessageSelector = createMemoSelector(
  withParams(claimBonusByPromoCodeTranslateParamsSelector, CLAIM_BONUS_BY_PROMO_CODE_CALL_SYMBOL),
  { resultEqual: "deepEqual" },
);

const claimBonusStartedSelector: TSelectorWithRequiredId = callManagerStartedSelector.with.symbol(CLAIM_BONUS_CALL_SYMBOL);
const claimBonusFailedMessageSelector = createMemoSelector(
  (state: TAppStateWithBonuses) => {
    const id = claimBonusFailedModalIdSelector(state);

    return claimBonusTranslateParamsSelector(state, CLAIM_BONUS_CALL_SYMBOL, id);
  },
  { resultEqual: "deepEqual" },
);

const activateBonusStartedSelector: TSelectorWithRequiredId = callManagerStartedSelector.with.symbol(ACTIVATE_BONUS_CALL_SYMBOL);
const activateBonusFailedMessageSelector = createMemoSelector(
  (state: TAppStateWithBonuses) => {
    const id = activateBonusFailedModalIdSelector(state);

    return activateBonusTranslateParamsSelector(state, ACTIVATE_BONUS_CALL_SYMBOL, id);
  },
  { resultEqual: "deepEqual" },
);

const cancelBonusStartedSelector: TSelectorWithRequiredId = callManagerStartedSelector.with.symbol(CANCEL_BONUS_CALL_SYMBOL);
const cancelBonusFailedMessageSelector = createMemoSelector(
  (state: TAppStateWithBonuses) => {
    const id = cancelBonusFailedModalIdSelector(state);

    return cancelBonusTranslateParamsSelector(state, CANCEL_BONUS_CALL_SYMBOL, id);
  },
  { resultEqual: "deepEqual" },
);

const registrationBonusesWasSucceededSelector = withParams(callManagerWasSucceededSelector, REGISTRATION_BONUSES_CALL_SYMBOL);

export {
  historyBonusLoadingSelector,
  playerBonusLoadingSelector,
  availableBonusLoadingSelector,
  historyBonusesLoadingSelector,
  playerBonusesLoadingSelector,
  availableBonusesLoadingSelector,

  transferCashbackErrorMessageSelector,
  transferCashbackSucceededSelector,
  transferCashbackLoadingSelector,

  requestCashbackSumErrorMessageSelector,
  requestCashbackSumLoadingSelector,

  claimBonusByPromoCodeLoadingSelector,
  claimBonusByPromoCodeFailedSelector,
  claimBonusByPromoCodeErrorMessageSelector,

  claimBonusStartedSelector,
  claimBonusFailedMessageSelector,

  activateBonusStartedSelector,
  activateBonusFailedMessageSelector,

  cancelBonusStartedSelector,
  cancelBonusFailedMessageSelector,

  registrationBonusesWasSucceededSelector,
};
