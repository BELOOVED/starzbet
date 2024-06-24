import { concat, EMPTY, filter, iif, merge, type Observable, of, take, takeUntil } from "rxjs";
import { catchError, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { type AnyAction } from "redux";
import { getNotNil, isNil, isNotNil, isNotVoid, not, withParams } from "@sb/utils";
import {
  callManagerFailedAction,
  callManagerRemoveSymbolAction,
  callManagerStartAction,
  callManagerSucceededAction,
  callManagerSucceededSelector,
  createCallManagerSymbol,
} from "@sb/call-manager";
import { routerEpic, routerLocationPathnameSelector } from "@sb/router";
import { EPageType, EPlatformBlockMap } from "@sb/cms-core";
import { matchPath, type TMatch } from "@sb/react-router-compat";
import type { TCms_Block_Fragment } from "@sb/graphql-client/CmsUI";
import { fromCMSUpdEvent } from "@sb/cms-on-site-editor";
import { query_Platform_FindBonusesForPromotions } from "@sb/graphql-client/PlayerUI";
import {
  platformFindBonusesForPromotionsOptionalFields,
} from "@sb/graphql-client/PlayerUI/OptionalFields/Platform/Platform_FindBonusesForPromotions_Query";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { Logger } from "../../../../common/Utils/Logger";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import {
  CMSLoadAllVariables,
  CMSLoadNotEmptyMetaPageContents,
  CMSLoadNotRemovedPagesByProjectCode,
  cmsLoadPageContentByPageId,
  CMSLoadPagesContentByPageIds,
} from "../../../Api/CMSApi";
import { withoutFooterExceptProfile } from "../../../Model/PathsForRenderComponents";
import { routeMap } from "../../../RouteMap/RouteMap";
import { platformCMSBonusesFetchedAction } from "../../Bonuses/BonusesActions";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { PROMO_PAGE_CONTENT_CALL_MANAGER_ID } from "../Model/CmsConstants";
import {
  cmsFilesReceivedAction,
  cmsMetaContentAction,
  cmsPageContentReceivedAction,
  cmsPagesAction,
  cmsPredefinedPagesAction,
  cmsVariablesAction,
} from "../CMSAction";
import { isFooterPageType } from "../Utils/TypeGuards";
import { getPredefinedPages } from "../Utils/GetPredefinedPages";
import {
  CMS_PAGE_CONTENT_SYMBOL,
  CMS_PAGE_META_CONTENTS_SYMBOL,
  CMS_PAGES_SYMBOL,
  CMS_VARIABLES_SYMBOL,
} from "../Model/CmsSymbols";
import { getLocalizedUrlsWithCMSPrefix } from "../Utils/Helpers";
import { cmsBlockSucceededSelector, isCmsVariablesServerLoadedSelector } from "../Selectors/CMSSelectors";
import { CMSPageByPathSelector, cmsPromoPagePromosBonusesIdsSelector } from "../Selectors/CMSPageContentSelectors";
import { cmsLoadBlockEpic } from "./CmsLoadBlockEpic";

const FOOTER_PAGES_CONTENT_EPIC_NAME = "CMSPageContent: footerPages";

const cmsPagesEpic: TPlatformEpic = (action$, state$, dependencies) => {
  const observable = concat(
    of(callManagerStartAction(CMS_PAGES_SYMBOL)),
    CMSLoadNotRemovedPagesByProjectCode("PLATFORM", dependencies.graphQLClient).pipe(
      switchMap((response) => {
        const predefinedPages = getPredefinedPages(response);

        const ids: string[] = [];
        const footerIds: string[] = [];
        const footerUrls: string[] = [];

        const promoPageId = response.find((page) => page.pageType === EPageType.promoPage)?.id;

        for (const it of response) {
          ids.push(it.id);

          if (isFooterPageType(it.pageType)) {
            footerUrls.push(getLocalizedUrlsWithCMSPrefix(response, it.id));
            footerIds.push(it.id);
          }
        }

        const epic = isNotNil(promoPageId)
          ? cmsPromoPageContentEpic(promoPageId)
          : () => EMPTY;

        return combineEpics(
          () => merge(
            of(cmsPagesAction(response)),
            of(cmsPredefinedPagesAction(predefinedPages)),
            of(callManagerSucceededAction(CMS_PAGES_SYMBOL)),
          ),
          CMSPageMetaContentsEpic(ids),
          CMSPagesContentEpicFactory(footerIds, footerUrls, true, FOOTER_PAGES_CONTENT_EPIC_NAME),
          epic,
        )(action$, state$, dependencies);
      }),
      catchError((error) => {
        Logger.warn.epic("[loadCMSPages] load error", error);

        return of(callManagerFailedAction(CMS_PAGES_SYMBOL, error));
      }),
    ),
  );

  const fromCmsPanelUpd: Observable<AnyAction> = fromCMSUpdEvent.pipe(
    filter((value) => Boolean(value.pages)),
    switchMap(() => concat(
      of(callManagerRemoveSymbolAction(CMS_PAGE_CONTENT_SYMBOL)),
      observable,
    )),
  );

  return merge(
    fromCmsPanelUpd,
    observable.pipe(
      takeUntil(
        fromCMSUpdEvent.pipe(
          filter((value) => Boolean(value.pages)),
        ),
      ),
    ),
  );
};

const CMSPageMetaContentsEpic = (pageIds: string[]): TPlatformEpic => (
  _,
  __,
  { graphQLClient },
) => {
  const observable = concat(
    of(callManagerStartAction(CMS_PAGE_META_CONTENTS_SYMBOL)),
    CMSLoadNotEmptyMetaPageContents(pageIds, graphQLClient).pipe(
      switchMap((response) => {
        if (isNil(response)) {
          return EMPTY;
        }

        return merge(
          of(cmsMetaContentAction(response)),
          of(callManagerSucceededAction(CMS_PAGE_META_CONTENTS_SYMBOL)),
        );
      }),
      catchError((error) => {
        Logger.warn.epic("[loadMetaContent] load error", error);

        return of(callManagerFailedAction(CMS_PAGE_META_CONTENTS_SYMBOL, error));
      }),
    ),
  );
  const fromCmsPanelUpd: Observable<AnyAction> = fromCMSUpdEvent.pipe(
    filter((value) => Boolean(value.metaContent)),
    switchMap(() => observable),
  );

  return merge(
    fromCmsPanelUpd,
    observable.pipe(
      takeUntil(
        fromCMSUpdEvent.pipe(
          filter((value) => Boolean(value.metaContent)),
        ),
      ),
    ),
  );
};

const CMSPagesContentEpicFactory = (ids: string[], urls: string[], isExact: boolean, name: string) => routerEpic({
  name,
  match: getMatch({ path: urls, exact: isExact }),
  onStart: (pathname) => CMSPagesContentEpic(pathname, ids, name),
  shouldRestart: restartOnParamsChanged,
});

const PROMO_BONUSES_SYMBOL = createCallManagerSymbol("PROMO_BONUSES_SYMBOL");

const cmsBonusesForPromotionsEpicFactory = (bonusIds: string[]): TPlatformEpic => gqlLoadingFactory(
  PROMO_BONUSES_SYMBOL,
  query_Platform_FindBonusesForPromotions,
  { optionalFields: platformFindBonusesForPromotionsOptionalFields, variables: { bonusIds } },
  platformCMSBonusesFetchedAction,
  ({ platform: { FindBonusesForPromotions } }) => [FindBonusesForPromotions],
);

const cmsPromoPageContentEpic = (pageId: string): TPlatformEpic =>
  (_, state$, dependencies) => state$.pipe(
    take(1),
    switchMap(() => merge(
      concat(
        of(callManagerStartAction(CMS_PAGE_CONTENT_SYMBOL, PROMO_PAGE_CONTENT_CALL_MANAGER_ID)),
        cmsLoadPageContentByPageId(
          pageId,
          dependencies.graphQLClient,
        ).pipe(
          switchMap(LoadPageContentEpicFactory),
        ),
        of(callManagerSucceededAction(CMS_PAGE_CONTENT_SYMBOL, PROMO_PAGE_CONTENT_CALL_MANAGER_ID)),
      ),
      fromCMSUpdEvent.pipe(
        filter((value) => value.pageId === pageId),
        switchMap(() => cmsLoadPageContentByPageId(
          pageId,
          dependencies.graphQLClient,
        ).pipe(
          switchMap(LoadPageContentEpicFactory),
        )),
      ),
    ).pipe(
      catchError((error) => {
        Logger.warn.epic("[CMSPromoPageContentEpic] load error", error);

        return of(callManagerFailedAction(CMS_PAGE_CONTENT_SYMBOL, error));
      }),
    )),
  );

const CMSPagesContentEpic = (pathname: TMatch, ids: string[], name: string): TPlatformEpic =>
  (_, state$, dependencies) => state$.pipe(
    map(withParams(callManagerSucceededSelector, CMS_PAGE_CONTENT_SYMBOL, name)),
    filter(not<boolean>),
    take(1),
    switchMap(() => {
      const page = CMSPageByPathSelector(state$.value, pathname.path);

      const currentPageId = page?.id;

      const idsWithoutCurrentPageId = ids.filter((id) => id !== currentPageId);

      const LoadCurrentBlockById = isNotNil(currentPageId)
        ? cmsLoadPageContentByPageId(currentPageId, dependencies.graphQLClient).pipe(
          switchMap(LoadPageContentEpicFactory),
        )
        : EMPTY;

      const fromCMSUpdEvents: Observable<AnyAction>[] = ids.map((id) => fromCMSUpdEvent.pipe(
        filter((value) => value.pageId === id),
        switchMap(() => cmsLoadPageContentByPageId(id, dependencies.graphQLClient).pipe(
          switchMap(LoadPageContentEpicFactory),
        )),
      ));

      return concat(
        of(callManagerStartAction(CMS_PAGE_CONTENT_SYMBOL, name)),
        LoadCurrentBlockById,
        iif(
          () => isNotVoid(idsWithoutCurrentPageId),
          CMSLoadPagesContentByPageIds(idsWithoutCurrentPageId, dependencies.graphQLClient).pipe(
            switchMap(LoadPageContentEpicFactory),
          ),
          EMPTY,
        ),
        of(callManagerSucceededAction(CMS_PAGE_CONTENT_SYMBOL, name)),
        merge(...fromCMSUpdEvents),
      ).pipe(
        catchError((error) => {
          Logger.warn.epic("[loadPageContent] load error", error);

          return of(callManagerFailedAction(CMS_PAGE_CONTENT_SYMBOL, error));
        }),
      );
    }),
  );

const loadPromoPageBonuses: TPlatformEpic = (action$, state$, dependencies) => state$.pipe(
  map(() => cmsPromoPagePromosBonusesIdsSelector(state$.value)),
  distinctUntilChanged(),
  filter(isNotNil),
  switchMap((ids: string[]) => cmsBonusesForPromotionsEpicFactory(ids)(action$, state$, dependencies)),
);

const LoadPageContentEpicFactory = (content: TCms_Block_Fragment[]) =>
  merge(...content.map(({ content, pageId, images }) => merge(
    of(cmsFilesReceivedAction(images)),
    of(cmsPageContentReceivedAction(content, pageId)),
    of(callManagerSucceededAction(CMS_PAGE_CONTENT_SYMBOL, getNotNil(pageId, ["LoadPageContentEpicFactory"], "pageId"))),
  )));

const cmsLoadFooterContentEpic: TPlatformEpic = (action$, state$, dependencies) => state$.pipe(
  map(routerLocationPathnameSelector),
  distinctUntilChanged(),
  filter((pathname) =>
    !matchPath(pathname, { path: withoutFooterExceptProfile }) && !cmsBlockSucceededSelector(state$.value, EPlatformBlockMap.FOOTER)),
  take(1),
  switchMap(() => cmsLoadBlockEpic(EPlatformBlockMap.FOOTER)(action$, state$, dependencies)),
);

const cmsLoadTVChannelContentEpic: TPlatformEpic = (action$, state$, dependencies) => state$.pipe(
  filter(() => !cmsBlockSucceededSelector(state$.value, EPlatformBlockMap.TV_CHANNEL)),
  take(1),
  switchMap(() => cmsLoadBlockEpic(EPlatformBlockMap.TV_CHANNEL)(action$, state$, dependencies)),
);

const ACCOUNT_ROUTES = [
  routeMap.myAccountRoute,
  routeMap.userMessages,
  routeMap.tickets,
  routeMap.historyRoute,
  routeMap.bankingRoute,
  routeMap.contactUs,
];

const cmsLoadContactUsProfileContentEpic = routerEpic({
  name: "CMSLoadContactUsProfileContent",
  match: getMatch(ACCOUNT_ROUTES),
  onStart: () => cmsLoadBlockEpic(EPlatformBlockMap.CONTACT_US),
});

const cmsLoadBannersEpic = cmsLoadBlockEpic(EPlatformBlockMap.BANNERS);

const CMSLoadHighlightsEpic = cmsLoadBlockEpic(EPlatformBlockMap.HIGHLIGHTS);

const cmsLoadVariablesEpic: TPlatformEpic = (_, state$, { graphQLClient }) => {
  const isServerLoaded = isCmsVariablesServerLoadedSelector(state$.value);

  if (isServerLoaded) {
    return EMPTY;
  }

  return state$.pipe(
    map(routerLocationPathnameSelector),
    distinctUntilChanged(),
    take(1),
    filter((pathname) => !matchPath(pathname, { path: withoutFooterExceptProfile })),
    switchMap(() => concat(
      of(callManagerStartAction(CMS_VARIABLES_SYMBOL)),
      CMSLoadAllVariables(graphQLClient).pipe(
        switchMap((response) => merge(
          of(cmsVariablesAction(response)),
          of(callManagerSucceededAction(CMS_VARIABLES_SYMBOL)),
        )),
        catchError((error) => {
          Logger.warn.epic("[loadCMSVariables] load error", error);

          return of(callManagerFailedAction(CMS_VARIABLES_SYMBOL, error));
        }),
      ),
    )),
  );
};

const cmsRootEpic = combineEpics(
  cmsLoadVariablesEpic,
  cmsPagesEpic,
  cmsLoadContactUsProfileContentEpic,
  cmsLoadFooterContentEpic,
  cmsLoadTVChannelContentEpic,
  cmsLoadBannersEpic,
  loadPromoPageBonuses,
  CMSLoadHighlightsEpic,
);

export { cmsRootEpic, PROMO_BONUSES_SYMBOL };
