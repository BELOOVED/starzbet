import { EMPTY, merge, mergeMap, of } from "rxjs";
import { isCreator, isNil } from "@sb/utils";
import { isResponseErrors } from "@sb/network-bus/Utils";
import {
  EActivatePlayerBonusByPlayerCommandErrorCode,
} from "@sb/sdk/ErrorMapping/bonus/ActivatePlayerBonusByPlayerErrorMapping";
import {
  ECancelPlayerBonusByPlayerCommandErrorCode,
} from "@sb/sdk/ErrorMapping/bonus/CancelPlayerBonusByPlayerErrorMapping";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { EClaimBonusByPlayerCommandErrorCode } from "@sb/sdk/ErrorMapping/bonus/ClaimBonusByPlayerErrorMapping";
import type { TAppEpicWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import { pushLocalized } from "../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { playerRequestWalletAction } from "../../../../common/Store/Player/PlayerActions";
import { rpcLoadingFactory } from "../../../../common/Utils/EpicUtils/RpcLoadingFactory";
import { routeMap } from "../../../RouteMap/RouteMap";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import type { IDepsWithPlatformHttpApi } from "../../Root/Epic/TPlatformEpic";
import { activateBonusAction, cancelBonusAction, claimBonusAction } from "../BonusesActions";
import { playerBonusByIdNotNilSelector } from "../Selectors/BonusesSelectors";
import { isNotFreeBetBonusType } from "../Utils/CommonBonusUtils";
import { ACTIVATE_BONUS_CALL_SYMBOL, CANCEL_BONUS_CALL_SYMBOL, CLAIM_BONUS_CALL_SYMBOL } from "../BonusVariables";
import {
  loadAvailableBonusesEpic,
  loadDetailedAvailableBonusEpic,
  loadMyBonusEpicFactory,
  loadPlayerBonusesEpic,
} from "./LoadBonusEpics";

const callClaimBonus = (bonusId: string): TAppEpicWithBonuses => rpcLoadingFactory({
  callSymbol: [CLAIM_BONUS_CALL_SYMBOL, bonusId],
  payload: bonusId,
  method: (deps: IDepsWithPlatformHttpApi) => deps.platformHttpApi.callClaimBonus,
  onLoad: (): TAppEpicWithBonuses => (_, state$) => {
    const locale = localeSelector(state$.value);

    return of(pushLocalized(locale, routeMap.myBonusesRoute));
  },
  onError: (error): TAppEpicWithBonuses => (action$, state$, deps) => {
    if (isResponseErrors(error)) {
      switch (error[0].code) {
        case EClaimBonusByPlayerCommandErrorCode.bonusNotFound:
        case EClaimBonusByPlayerCommandErrorCode.bonusUserLimitExceeded:
        case EClaimBonusByPlayerCommandErrorCode.bonusTotalLimitExceeded:
        case EClaimBonusByPlayerCommandErrorCode.bonusTagValidationAlreadyUsedBonusWithNewCustomerTag:
        case EClaimBonusByPlayerCommandErrorCode.bonusTagValidationAlreadyUsedBonusWithNewCustomerTagAndProducts:
        case EClaimBonusByPlayerCommandErrorCode.bonusTagValidationAlreadyUsedWithOnePerPlayerTag:
        case EClaimBonusByPlayerCommandErrorCode.bonusTagValidationDuplicatedByEmailWithOtherPlayers:
        case EClaimBonusByPlayerCommandErrorCode.bonusTagValidationDuplicatedByIpWithOtherPlayers:
        case EClaimBonusByPlayerCommandErrorCode.bonusTagValidationDuplicatedByPhoneNumberWithOtherPlayers:
        case EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerHasAlreadyClaimedThisBonus:
        case EClaimBonusByPlayerCommandErrorCode.bonusPlayerWithDepositCriteriaDoesntMatch:
        case EClaimBonusByPlayerCommandErrorCode.bonusPlayerAffiliateDoesntMatch:
        case EClaimBonusByPlayerCommandErrorCode.bonusPlayerGroupDoesntMatch:
        case EClaimBonusByPlayerCommandErrorCode.bonusPlayerDaysSinceRegistrationDoesntMatch:
        case EClaimBonusByPlayerCommandErrorCode.bonusPlayerRegisterDateDoesntMatch:
        case EClaimBonusByPlayerCommandErrorCode.bonusPlayerVipClubLevelCriteriaDoesntMatch: {
          const locale = localeSelector(state$.value);
          const pathname = routerLocationPathnameSelector(state$.value);
          const onDetailsRoute = matchPath(pathname, { path: routeMap.availableBonusRoute, exact: true });

          if (onDetailsRoute) {
            return of(pushLocalized(locale, routeMap.availableBonusesRoute));
          } else {
            return loadAvailableBonusesEpic(action$, state$, deps);
          }
        }
        // cashback
        case EClaimBonusByPlayerCommandErrorCode.playerBonusCashBackAmountShouldBeGreaterThanZero:
        case EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerBalanceShouldBeEqualOrLess:
        case EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveActiveBonuses:
        case EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenBets:
        case EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenGameRounds:
        case EClaimBonusByPlayerCommandErrorCode.playerBonusPlayerShouldNotHaveOpenWithdrawals: {
          return EMPTY;
        }
        case EClaimBonusByPlayerCommandErrorCode.bonusEligibilityClaimRulesNotSatisfied:
        default: {
          return loadDetailedAvailableBonusEpic(bonusId, true)(action$, state$, deps);
        }
      }
    }

    return loadDetailedAvailableBonusEpic(bonusId, true)(action$, state$, deps);
  },
});

const callActivateBonus = (playerBonusId: string): TAppEpicWithBonuses => rpcLoadingFactory({
  callSymbol: [ACTIVATE_BONUS_CALL_SYMBOL, playerBonusId],
  payload: playerBonusId,
  method: (deps: IDepsWithPlatformHttpApi) => deps.platformHttpApi.callActivateBonus,
  onLoad: ({ playerBonusId }): TAppEpicWithBonuses => (action$, state$, deps) => {
    const playerBonus = playerBonusByIdNotNilSelector(state$.value, playerBonusId);

    // if bonusType === "custom" | "firstDeposit" and wagering is Nil ->
    // bonus will be automatically finished and player should be redirected on it in history
    if (isNotFreeBetBonusType(playerBonus.bonusType) && isNil(playerBonus.bonusWagering)) {
      const locale = localeSelector(state$.value);

      return merge(
        of(playerRequestWalletAction()), // todo check on external themes ws updates, drop if it's ok
        of(pushLocalized(locale, routeMap.historyBonusesRoute)),
      );
    }

    return merge(
      of(playerRequestWalletAction()),  // todo check on external themes ws updates, drop if it's ok
      loadMyBonusEpicFactory(playerBonusId)(action$, state$, deps),
    );
  },
  onError: (error): TAppEpicWithBonuses => (action$, state$, deps) => {
    const locale = localeSelector(state$.value);
    const pathname = routerLocationPathnameSelector(state$.value);
    const onDetailsRoute = matchPath(pathname, { path: routeMap.myBonusRoute, exact: true });

    if (isResponseErrors(error)) {
      switch (error[0].code) {
        case EActivatePlayerBonusByPlayerCommandErrorCode.bonusEligibilityActivateRulesNotSatisfied:
        case EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerBonusHasAlreadyBeenActivated: {
          return loadMyBonusEpicFactory(playerBonusId)(action$, state$, deps);
        }
        case EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusAlreadyFinished: {
          return merge(
            of(pushLocalized(locale, routeMap.historyBonusesRoute)),
            loadPlayerBonusesEpic(action$, state$, deps),
          );
        }
        case EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusNotFound: {
          return of(pushLocalized(locale, routeMap.availableBonusesRoute));
        }
        case EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerIsNotVerified: {
          return of(pushLocalized(locale, routeMap.accountVVerificationRoute));
        }
        case EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusProviderUnknownProviderError: {
          return EMPTY;
        }
        case EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerAlreadyHasAnActivatedBonus:
        case EActivatePlayerBonusByPlayerCommandErrorCode.playerBonusPlayerHasBonusThatConflicts:
        default: {
          if (onDetailsRoute) {
            return of(pushLocalized(locale, routeMap.myBonusesRoute));
          }

          return loadPlayerBonusesEpic(action$, state$, deps);
        }
      }
    }

    if (onDetailsRoute) {
      return of(pushLocalized(locale, routeMap.myBonusesRoute));
    }

    return loadPlayerBonusesEpic(action$, state$, deps);
  },
});

const callCancelBonus = (playerBonusId: string): TAppEpicWithBonuses => rpcLoadingFactory({
  callSymbol: [CANCEL_BONUS_CALL_SYMBOL, playerBonusId],
  payload: playerBonusId,
  method: (deps: IDepsWithPlatformHttpApi) => deps.platformHttpApi.callCancelBonus,
  onLoad: (): TAppEpicWithBonuses => (_, state$) => {
    const locale = localeSelector(state$.value);

    return merge(
      of(pushLocalized(locale, routeMap.availableBonusesRoute)),
      of(playerRequestWalletAction()),
    );
  },
  onError: (error): TAppEpicWithBonuses => (action$, state$, deps) => {
    if (isResponseErrors(error)) {
      switch (error[0].code) {
        case ECancelPlayerBonusByPlayerCommandErrorCode.playerBonusAlreadyFinished:
        case ECancelPlayerBonusByPlayerCommandErrorCode.playerBonusAlreadyCancelled: {
          const locale = localeSelector(state$.value);

          return of(pushLocalized(locale, routeMap.historyBonusesRoute));
        }
        case ECancelPlayerBonusByPlayerCommandErrorCode.playerBonusNotFound:
        default: {
          const locale = localeSelector(state$.value);
          const pathname = routerLocationPathnameSelector(state$.value);
          const onDetailsRoute = matchPath(pathname, { path: routeMap.myBonusRoute, exact: true });

          if (onDetailsRoute) {
            return of(pushLocalized(locale, routeMap.myBonusesRoute));
          } else {
            return loadPlayerBonusesEpic(action$, state$, deps);
          }
        }
      }
    }

    return EMPTY;
  },
});

const claimBonusEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(claimBonusAction),
  mergeMap(({ payload: { bonusId } }) => callClaimBonus(bonusId)(action$, state$, deps)),
);

const activateBonusEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(activateBonusAction),
  mergeMap(({ payload: { playerBonusId } }) => callActivateBonus(playerBonusId)(action$, state$, deps)),
);

const cancelBonusEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(cancelBonusAction),
  mergeMap(({ payload: { playerBonusId } }) => callCancelBonus(playerBonusId)(action$, state$, deps)),
);

export {
  claimBonusEpic,
  activateBonusEpic,
  cancelBonusEpic,
};
