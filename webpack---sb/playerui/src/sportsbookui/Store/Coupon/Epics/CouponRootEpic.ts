import { concat, EMPTY, ignoreElements, merge, of, switchMap, takeUntil, tap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { routerEpic, routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { getNotNil, isCreator } from "@sb/utils";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { ESportsbook_CouponView } from "@sb/graphql-client";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { noopEpic } from "../../../../common/Utils/EpicUtils/NoopEpic";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { pushLocalized } from "../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import {
  generateLocalizedPathByRoute,
} from "../../../../common/Client/Core/Services/RouterService/Utils/GenerateLocalizedPathByRoute";
import {
  getLocalizedRouteParams,
} from "../../../../common/Client/Core/Services/RouterService/Utils/GetLocalizedRouteProps";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { sportMenuSetActiveIdsAction } from "../../SportMenu/SportMenuActions";
import { categoriesSelector, tournamentsSelector } from "../../Feed/Selectors/FeedSelectors";
import { sportPeriodEnum } from "../../SportMenu/Model/SportPeriod";
import { preLiveRootRouteSelector } from "../../PreLive/Selectors/PreLiveSelectors";
import { type TAppState } from "../../InitialState";
import { localeSelector } from "../../Locale/LocaleSelector";
import {
  couponCancelCreateAction,
  couponCompleteSaveAction,
  couponRemoveAction,
  couponSaveAction,
  couponStartCreateAction,
  couponUpdateAction,
} from "../CouponActions";
import {
  couponGroupIdByPlayerIdSelector,
  couponPlayerSelector,
  couponsByPlayerIdSelector,
} from "../Selectors/CouponsSelector";

const couponsMatchOptions = { path: [routeMap.preLive.coupons, routeMap.esport.preLive.coupons], exact: true };

const updateRouteEpic: TAppEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(couponUpdateAction),
  switchMap(({ payload: { couponId } }) => {
    const pathname = routerLocationPathnameSelector(state$.value);

    const match = matchPath(pathname, couponsMatchOptions);

    if (!match) {
      return updateRoute(couponId, state$.value);
    }

    return completeOnRouteEpic(action$, state$, dependencies);
  }),
);

const updateRoute = (couponId: string, state: TAppState) => {
  const coupons = couponsByPlayerIdSelector(state);

  const coupon = coupons.find(({ id }) => id === couponId);

  if (!coupon) {
    return EMPTY;
  }

  const tournaments = tournamentsSelector(state);
  const categories = categoriesSelector(state);

  let path = "";

  const sportIds: string[] = [];
  const categoryIds: string[] = [];
  const tournamentIds: string[] = [];

  coupon.filters.forEach(({ tournamentId }) => {
    const notNilTournamentId = getNotNil(tournamentId, ["CouponRootEpic"], "updateRoute");

    const tournament = tournaments[notNilTournamentId];

    if (!tournament) {
      return;
    }

    const category = categories[tournament.categoryId];

    if (!category) {
      return;
    }

    sportIds.push(category.sportId);
    categoryIds.push(tournament.categoryId);
    tournamentIds.push(notNilTournamentId);

    path += `/${sportIdToCodeMap[category.sportId]}/${category.slug}/${
      tournament.slug
    }`;
  });

  if (!path) {
    return EMPTY;
  }

  const pathname = routerLocationPathnameSelector(state);

  const esport = matchPath(
    pathname,
    {
      path: routeMap.esport.preLive.root,
    },
  );

  const route = esport
    ? routeMap.esport.preLive.selection
    : routeMap.preLive.selection;

  const locale = localeSelector(state);

  return merge(
    of(pushLocalized(locale, route, { period: sportPeriodEnum.all, path }, decodeURIComponent)),
    of(sportMenuSetActiveIdsAction(sportIds, categoryIds, tournamentIds)),
  );
};

const removePlayerCouponEntryEpic: TAppEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(couponRemoveAction),
  switchMap(({ payload: { couponId } }) => {
    const couponGroupId = couponGroupIdByPlayerIdSelector(state$.value);

    const coupons = (couponsByPlayerIdSelector(state$.value))
      .filter(({ id }) => id !== couponId);

    return callWithAbort(
      dependencies.sportsbookHttpApi.callUpdatePlayerCoupon,
      {
        id: couponGroupId,
        view: ESportsbook_CouponView.playerTopCouponMenu,
        coupons,
      },
    );
  }),
  tap({
    error: (e) => {
      Logger.warn.rpc("removePlayerCouponEntryEpic", e);
    },
  }),
  ignoreElements(),
);

const startCreateEpic: TAppEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(couponStartCreateAction),
  switchMap(() => {
    const path = preLiveRootRouteSelector(state$.value);
    const pathname = routerLocationPathnameSelector(state$.value);

    if (path) {
      const locale = localeSelector(state$.value);
      const params = [
        locale,
        ...getLocalizedRouteParams(path),
      ] as const;

      const route = generateLocalizedPathByRoute(...params);

      const match = matchPath(
        pathname,
        {
          path: [route, routeMap.preLive.coupons, routeMap.esport.preLive.coupons],
          exact: true,
        },
      );

      if (!match) {
        return concat(
          of(pushLocalized(...params)),
          of(completeOnRouteEpic(action$, state$, dependencies)),
        );
      }
    }

    return of(completeOnRouteEpic(action$, state$, dependencies));
  }),
  ignoreElements(),
);

const savePlayerCouponEpic: TAppEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(couponSaveAction),
  switchMap(() => {
    const { newCoupon } = couponPlayerSelector(state$.value);
    const couponGroupId = couponGroupIdByPlayerIdSelector(state$.value);

    if (!couponGroupId) {
      return callWithAbort(
        dependencies.sportsbookHttpApi.callCreatePlayerCoupon,
        {
          view: ESportsbook_CouponView.playerTopCouponMenu,
          coupons: [newCoupon],
        },
      ).pipe(
        map(couponCompleteSaveAction),
        catchError((e) => {
          Logger.warn.rpc("savePlayerCouponEpic", e);

          return EMPTY;
        }),
      );
    }

    const currentCoupons = couponsByPlayerIdSelector(state$.value);

    const notNilCoupon = getNotNil(newCoupon, ["CouponRootEpic"], "savePlayerCouponEpic");

    const coupons = notNilCoupon.id
      ? currentCoupons.map((oldCoupon) => oldCoupon.id === notNilCoupon.id
        ? newCoupon
        : oldCoupon)
      : [...currentCoupons, newCoupon];

    return callWithAbort(
      dependencies.sportsbookHttpApi.callUpdatePlayerCoupon,
      {
        id: couponGroupId,
        view: ESportsbook_CouponView.playerTopCouponMenu,
        coupons,
      },
    ).pipe(
      map(couponCompleteSaveAction),
      catchError((e) => {
        Logger.warn.rpc("savePlayerCouponEpic", e);

        return EMPTY;
      }),
    );
  }),
);

const completeOnRouteEpic = routerEpic({
  name: "completeOnRoute",
  match: getMatch([routeMap.preLive.selection, routeMap.esport.preLive.selection]),
  onStart: () => noopEpic,
  onStop: (): TAppEpic => (action$) => action$.pipe(
    map(couponCompleteSaveAction),
    takeUntil([couponCompleteSaveAction, couponCancelCreateAction]),
  ),
});

const couponRootEpic = combineEpics(
  savePlayerCouponEpic,
  updateRouteEpic,
  startCreateEpic,
  removePlayerCouponEntryEpic,
);

export { couponRootEpic };
