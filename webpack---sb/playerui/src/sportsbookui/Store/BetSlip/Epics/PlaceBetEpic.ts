import { catchError, filter, map, repeat, switchMap } from "rxjs/operators";
import { concat, finalize, of } from "rxjs";
import { isCreator, isEmpty, isNil, isNotEmptyStake } from "@sb/utils";
import {
  sportsbookui_belSlip_saga_title_errorBetWasDeclined,
  sportsbookui_betSlip_title_invalidStake,
  sportsbookui_betSlip_title_youMustBeLogged,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { Logger } from "../../../../common/Utils/Logger";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import {
  EPlaceBetError,
  isBetEligibleForBonusError,
  isBetLimitError,
  isBonusDurationError,
  isClientError,
  isNotEnoughMoney,
  isOddsValidationError,
} from "../Model/EPlaceBetError";
import {
  betSlipCompletePlaceBetAction,
  betSlipPlaceBetAction,
  betSlipRejectPlaceBetAction,
  betSlipStartPlaceBetAction,
} from "../BetSlipActions";
import {
  betSlipPlacingSelector,
  notDisabledPicksSelector,
  picksAreExceededSelector,
} from "../Selectors/BetSlipSelectors";
import { betEntriesSelector } from "../Selectors/BetEntriesSelector";
import { isSingleHash } from "../Model/BetHash";
import { placeFoldAndSystemBetSelector, placeSingleBetSelector } from "../Selectors/PlaceBetSelector";
import { type TBetSlipBet } from "../Model/TBetSlip";

const generateClientError = (message: string) => [
  {
    code: EPlaceBetError.clientError,
    message,
  },
];

const generateUnexpendedError = () => [
  {
    code: EPlaceBetError.unexpected,
    message: sportsbookui_belSlip_saga_title_errorBetWasDeclined,
  },
];

const isCaughtError = (errorCode: EPlaceBetError) => [
  isBetLimitError,
  isNotEnoughMoney,
  isClientError,
  isBonusDurationError,
  isBetEligibleForBonusError,
  isOddsValidationError,
].some((fn) => fn(errorCode));

const isSingleBet =
  (bet: Record<string, TBetSlipBet> | TBetSlipBet, isSingleHash: boolean): bet is Record<string, TBetSlipBet> => isSingleHash;

const placeBetEpic: TAppEpic = (action$, state$, { sportsbookHttpApi }) => {
  let pending = false;

  return action$.pipe(
    isCreator(betSlipPlaceBetAction),
    filter(() => !picksAreExceededSelector(state$.value) && !betSlipPlacingSelector(state$.value) && !pending),
    switchMap(({ payload: { byGroup, keep } }) => {
      pending = true;

      if (isNil(playerDetailsSelectors.id(state$.value))) {
        throw generateClientError(sportsbookui_betSlip_title_youMustBeLogged);
      }

      const picks = notDisabledPicksSelector(state$.value);

      const betEntries = betEntriesSelector(state$.value, byGroup);

      if (isEmpty(betEntries)) {
        throw generateClientError(sportsbookui_betSlip_title_invalidStake);
      }

      const bets = betEntries.map(([hash, bet]) =>
        isSingleBet(bet, isSingleHash(hash))
          ? placeSingleBetSelector(state$.value, bet, picks, hash)
          : placeFoldAndSystemBetSelector(state$.value, bet, picks, hash)).flat().filter(isNotEmptyStake);

      if (isEmpty(bets)) {
        throw generateClientError(sportsbookui_betSlip_title_invalidStake);
      }

      return concat(
        of(betSlipStartPlaceBetAction()),
        callWithAbort(sportsbookHttpApi.callPlaceBatch, { bets }).pipe(
          map(() => betSlipCompletePlaceBetAction(keep)),
          finalize(() => {
            pending = false;
          }),
        ),
      );
    }),
    catchError((e) => {
      pending = false;

      const code = e?.[0]?.code;

      let error = e;

      if (!isCaughtError(code)) {
        error = generateUnexpendedError();

        Logger.error.rpc("Place Bet", e);
      }

      if (isOddsValidationError(code)) {
        error = generateUnexpendedError();
      }

      return of(betSlipRejectPlaceBetAction(error));
    }),
    repeat(),
  );
};

export { placeBetEpic };
