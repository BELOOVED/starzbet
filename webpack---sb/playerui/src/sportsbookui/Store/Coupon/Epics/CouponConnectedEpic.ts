import { combineEpics, type Epic } from "redux-observable";
import { EMPTY, merge, of } from "rxjs";
import { catchError, distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { type IWithAuthState, loggedSelector } from "@sb/auth";
import { createCallManagerSymbol } from "@sb/call-manager";
import {
  query_Sportsbook_CouponGroupsByPlayerGroupId,
  query_Sportsbook_PlayerCouponGroupsByPlayerId,
  type TSportsbook_CouponGroup_Fragment,
} from "@sb/graphql-client/PlayerUI";
import {
  sportsbookCouponGroupsByPlayerGroupIdQueryOptionalFields,
} from "@sb/graphql-client/PlayerUI/OptionalFields/Sportsbook/Sportsbook_CouponGroupsByPlayerGroupId_Query";
import {
  sportsbookPlayerCouponGroupsByPlayerIdQueryOptionalFields,
} from "@sb/graphql-client/PlayerUI/OptionalFields/Sportsbook/Sportsbook_PlayerCouponGroupsByPlayerId_Query";
import { Logger } from "../../../../common/Utils/Logger";
import { type IWithPlayerState } from "../../../../common/Store/Player/InitialState/PlayerInitialState";
import { playerGroupIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerGroupIdSelectors";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { whenPlayerGroupIdChangedEpic } from "../../../../common/Store/Player/Epics/WhenPlayerGroupIdChangedEpic";
import { resyncResourceFactory } from "../../../../common/Utils/EpicUtils/ResyncResourceFactory";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlSportsbookDataSelector } from "../../../../platformui/Store/Root/Selectors/GraphQlSelectors";
import { DEFAULT_PLAYER_GROUP_ID } from "../../../../common/Constants/DefaultPlayerGroupId";
import { type TEpicWithHttpApi } from "../../../../common/Store/Root/Epics/TEpicWithHttpApi";
import { couponGroupsFetchedAction, couponRemoveNotDefaultAction } from "../CouponActions";

type TCouponEpic = TEpicWithHttpApi<IWithPlayerState & IWithAuthState>;

const COUPONS_BY_GROUP_ID_LOADING_SYMBOL = createCallManagerSymbol("COUPONS_BY_GROUP_ID_LOADING_SYMBOL");
const COUPONS_BY_PLAYER_ID_LOADING_SYMBOL = createCallManagerSymbol("COUPONS_BY_PLAYER_ID_LOADING_SYMBOL");

const storeCouponsPayloadEpic = (payload: TSportsbook_CouponGroup_Fragment[]): Epic => () => of(couponGroupsFetchedAction(payload));

const loadCouponsByGroupIdEpic = (playerGroupId: string) => gqlLoadingFactory(
  COUPONS_BY_GROUP_ID_LOADING_SYMBOL,
  query_Sportsbook_CouponGroupsByPlayerGroupId,
  {
    optionalFields: sportsbookCouponGroupsByPlayerGroupIdQueryOptionalFields,
    variables: { playerGroupId },
  },
  couponGroupsFetchedAction,
  (res) => [graphQlSportsbookDataSelector(res).CouponGroupsByPlayerGroupId],
);

const loadCouponsByPlayerIdEpic = (playerId: string) => gqlLoadingFactory(
  COUPONS_BY_PLAYER_ID_LOADING_SYMBOL,
  query_Sportsbook_PlayerCouponGroupsByPlayerId,
  {
    optionalFields: sportsbookPlayerCouponGroupsByPlayerIdQueryOptionalFields,
    variables: { playerId },
  },
  couponGroupsFetchedAction,
  (res) => [graphQlSportsbookDataSelector(res).PlayerCouponGroupsByPlayerId],
);

const couponsByGroupIdResyncEpic = (groupId: string): TCouponEpic => resyncResourceFactory({
  loadEpic: loadCouponsByGroupIdEpic(groupId),
  loadSymbol: COUPONS_BY_GROUP_ID_LOADING_SYMBOL,
  subscriptions: [{
    uri: `sumstats.frontserver.coupon_group_updated.${groupId}`,
    onUpdate: storeCouponsPayloadEpic,
  }],
});

const couponsByPlayerIdResyncEpic = (playerId: string) => resyncResourceFactory({
  loadEpic: loadCouponsByPlayerIdEpic(playerId),
  loadSymbol: COUPONS_BY_PLAYER_ID_LOADING_SYMBOL,
  subscriptions: [{
    uri: `sumstats.frontserver.player_coupon_group_updated.${playerId}`,
    onUpdate: storeCouponsPayloadEpic,
  }],
});

const fetchByGroupNoDefaultId: TCouponEpic = (action$, state$, dependencies) => {
  const groupId = playerGroupIdNotNilSelector(state$.value);

  if (groupId === DEFAULT_PLAYER_GROUP_ID) {
    return EMPTY;
  }

  return couponsByGroupIdResyncEpic(groupId)(action$, state$, dependencies);
};

const whenReceivePlayerIdCouponEpic: TCouponEpic = (action$, state$, dependencies) => (
  state$.pipe(
    map(playerDetailsSelectors.id),
    distinctUntilChanged(),
    switchMap((playerId?: string) => {
      if (!playerId) {
        return EMPTY;
      }

      return merge(
        whenPlayerGroupIdChangedEpic(fetchByGroupNoDefaultId)(action$, state$, dependencies),
        couponsByPlayerIdResyncEpic(playerId)(action$, state$, dependencies),
      );
    }),
    catchError((error) => {
      Logger.warn.epic("Fail whenReceivePlayerIdCouponEpic:", error);

      return EMPTY;
    }),
  )
);

const whenLoggedOutCouponEpic: TCouponEpic = (_, state$) => state$.pipe(
  map(loggedSelector),
  distinctUntilChanged(),
  filter(Boolean),
  map(() => couponRemoveNotDefaultAction()),
  catchError((error) => {
    Logger.warn.epic("Fail whenLoggedOutCouponEpic:", error);

    return EMPTY;
  }),
);

const couponConnectedEpic = combineEpics(
  couponsByGroupIdResyncEpic(DEFAULT_PLAYER_GROUP_ID),
  whenReceivePlayerIdCouponEpic,
  whenLoggedOutCouponEpic,
);

export { couponConnectedEpic, COUPONS_BY_GROUP_ID_LOADING_SYMBOL, COUPONS_BY_PLAYER_ID_LOADING_SYMBOL };
