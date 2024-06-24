import {
  createMemoSelector,
  createOptionalPropertySelector,
  createPropertySelector,
  createSimpleSelector,
  isArraysHasEqualElement,
  isNil,
  isNotEmpty,
  isNotNil,
  isNotVoid,
  isString,
  isVoid,
  type TNullable,
} from "@sb/utils";
import { EPageType, PAGE_ID } from "@sb/cms-core";
import { routerLocationPathnameSelector, routerLocationSelector } from "@sb/router";
import { callManagerWasSucceededSelector } from "@sb/call-manager";
import { type TCms_LinksBlockListContent_Type_Fragment, type TCms_MediaLink_Union_Fragment } from "@sb/graphql-client/CmsUI";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type TArrayNullable } from "../../../Themes/Betwiz/Model/FooterInterfaceAndTypes";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { bonusForCMSByIdSelector } from "../../Bonuses/Selectors/BonusesSelectors";
import { isEternalMediaLink, isExternalMediaLink, isPromotionPageBlockContent, isSimplePageBlockContent } from "../Utils/TypeGuards";
import { recursiveGetCorrectUrl } from "../Utils/RecursiveGetCorrectUrl";
import { CMS_PAGE_CONTENT_SYMBOL } from "../Model/CmsSymbols";
import { recursiveGetCorrectPage } from "../Utils/RecursiveGetCorrectPage";
import { getUrlByPageType } from "../Utils/GetUrlByPageType";
import { type EPagesDefaultThemeOne } from "../Model/CmsEnums";
import { predefinedPageIdByTitle } from "../Utils/PredefinedPageIdByTitle";
import { recursiveUrlsMap } from "../Utils/RecursiveUrlsMap";
import { EMPTY_ARRAY, getBonusId, getLocalizedUrlsWithCMSPrefix, isAllElementInArrayNotNil } from "../Utils/Helpers";
import { getCorrectLinkByUrl } from "../Utils/GetCorrectLinkByUrl";
import { getPageByPageType } from "../Utils/GetPageByPageType";
import { CMSContentSelector, CMSFooterLinkListSelector, CMSPagesSelector, CMSSelector } from "./CMSSelectors";

const CMSPageContentsSelector = createOptionalPropertySelector(
  CMSContentSelector,
  "pagesContent",
);

const CMSPageContentByPageIdSelector = (state: TPlatformAppState, pageId: string) => {
  const pageContents = CMSPageContentsSelector(state);

  return pageContents?.[pageId];
};

const isCMSSimplePageSelector = (state: TPlatformAppState) => {
  const pathname = routerLocationPathnameSelector(state);

  const page = CMSPageByPathSelector(state, pathname);

  if (isNil(page)) {
    return false;
  }

  const content = CMSPageContentByPageIdSelector(state, page.id);

  return isSimplePageBlockContent(content);
};

const CMSPromoPageContentSelector = (state: TPlatformAppState) => {
  const pages = CMSPagesSelector(state);

  const pagesContent = CMSPageContentsSelector(state);

  if (isNil(pagesContent)) {
    return null;
  }

  const promoPageId = pages?.find((page) => page.pageType === EPageType.promoPage)?.id;

  if (isNil(promoPageId)) {
    return null;
  }

  const content = pagesContent[promoPageId];

  return isPromotionPageBlockContent(content) ? content.promotionPageContent : null;
};

const CMSPromoPagePromosWrapperSelector = createOptionalPropertySelector(
  CMSPromoPageContentSelector,
  ["promos"],
);

const cmsPromoPagePromosSelector = createOptionalPropertySelector(
  CMSPromoPagePromosWrapperSelector,
  ["content"],
);

const cmsPromoPagePromosBonusesIdsSelector = createMemoSelector(
  [cmsPromoPagePromosSelector],
  (promos) => {
    const ids = promos?.reduce<string[]>(
      (acc, promo) => {
        if (promo) {
          const id = getBonusId(promo);
          if (id) {
            acc.push(id);
          }
        }

        return acc;
      },
      [],
    );

    if (isVoid(ids)) {
      return null;
    }

    return ids;
  },
);

const cmsPromoPageTagsSelector = createOptionalPropertySelector(
  CMSPromoPageContentSelector,
  ["tags", "content"],
);

const CMSPredefinedPagesSelector = createOptionalPropertySelector(
  CMSContentSelector,
  "predefinedPages",
);

const isCMSPromoPagePromosSelector = (state: TPlatformAppState) => {
  const content = cmsPromoPagePromosSelector(state);

  return isNotVoid(content);
};

const CMSPageUrlPageIdSelector = (state: TPlatformAppState, pageId: string) => {
  const pages = CMSPagesSelector(state);

  return recursiveGetCorrectUrl(pages, pageId);
};

const CMSPageByPathSelector = (state: TPlatformAppState, pathWithPrefix: string) => {
  const pages = CMSPagesSelector(state);

  return recursiveGetCorrectPage(pages, pathWithPrefix);
};

const CMSPageContentSucceededSelector = callManagerWasSucceededSelector.with.symbol(CMS_PAGE_CONTENT_SYMBOL);

const CMSCurrentPageSelector = (state: TPlatformAppState) => {
  const pathname = routerLocationPathnameSelector(state);

  return CMSPageByPathSelector(state, pathname);
};

const CMSCurrentPageTypeSelector = (state: TPlatformAppState) => CMSCurrentPageSelector(state)?.pageType;

const CMSMatchRouteByPageIdListSelector = (state: TPlatformAppState, pageIds: string[]) => {
  const pages = CMSPagesSelector(state);

  if (isVoid(pages)) {
    return false;
  }

  const location = routerLocationSelector(state);

  const urlsList = pageIds.map(getLocalizedUrlsWithCMSPrefix.bind(null, pages));

  if (!urlsList.every(isString)) {
    return false;
  }

  return Boolean(getMatch({ path: urlsList, exact: true })(location));
};

const CMSPromotionPageSelector = createPropertySelector(
  CMSSelector,
  "promotionPage",
);

const CMSPromotionPageActiveTagsSelector = createPropertySelector(
  CMSPromotionPageSelector,
  "activeTags",
);

// this selector works if you have only one pageType, that you use in this selector
const CMSUrlByPageTypeSelector = (state: TPlatformAppState, pageType: EPageType) => {
  const pages = CMSPagesSelector(state);

  return getUrlByPageType(pages, pageType);
};

// this selector works if you have only one pageType, that you use in this selector
const CMSLinkByPageTypeSelector = (state: TPlatformAppState, pageType: EPageType) => getCorrectLinkByUrl(
  routeMap.cms,
  CMSUrlByPageTypeSelector(state, pageType),
);

const CMSPageIdByPageTitleSelector = (state: TPlatformAppState, pageType: EPagesDefaultThemeOne) => {
  const predefinedPages = CMSPredefinedPagesSelector(state);

  return predefinedPageIdByTitle(predefinedPages, pageType);
};

const CMSUrlsMapSelector = createSimpleSelector(
  [CMSPagesSelector],
  recursiveUrlsMap,
);

const CMSUrlByTitleSelector = (state: TPlatformAppState, title: EPagesDefaultThemeOne) => {
  const pages = CMSUrlsMapSelector(state);

  const id = CMSPageIdByPageTitleSelector(state, title);

  if (isNil(id) || isNil(pages)) {
    return null;
  }

  return pages[id];
};

const CMSIsShowBonusSelector = (state: TPlatformAppState, chooseTags: TArrayNullable<string>, bonusId?: string | null) => {
  const activeTags = CMSPromotionPageActiveTagsSelector(state);

  const isBonusHaveEqualTagWithActivePromo = isAllElementInArrayNotNil(chooseTags)
    ? isArraysHasEqualElement(activeTags, chooseTags)
    : false;

  const conditions = !isBonusHaveEqualTagWithActivePromo && isNotEmpty(activeTags);

  if (isNil(bonusId)) {
    return conditions;
  }

  const bonusInfo = bonusForCMSByIdSelector(state, bonusId);

  return isNotNil(bonusInfo) && conditions;
};

const CMSSimplePageAnchorSelector = (state: TPlatformAppState) => {
  const pathname = routerLocationPathnameSelector(state);

  const page = CMSPageByPathSelector(state, pathname);

  const id = page?.id;

  if (isNil(id)) {
    return null;
  }
  const linkList = CMSFooterLinkListSelector(state);

  const findFn = (it: TCms_LinksBlockListContent_Type_Fragment | null) => {
    const mediaLink = it?.mediaLink;

    return isEternalMediaLink(mediaLink) ? mediaLink.pageId === id : false;
  };

  return linkList?.find((it) => it?.linkList?.content?.find(findFn))?.linkList?.content?.find(findFn)?.mediaLink?.anchor ?? EMPTY_ARRAY;
};

const CMSCorrectUrlSelector = (state: TPlatformAppState, obj: TNullable<TCms_MediaLink_Union_Fragment>): string => {
  // if we have an internal link, we return correct url, CMSUrlByIdSelector return correct url by pageId like /info/about/affiliate
  // we check obj, because external link have only obj.url: string, and internal link have only obj[pageId]:string
  // if we have an external link to another page, we return url with // to go to another page
  const pageIdOrUrl = isExternalMediaLink(obj) ? obj.url : obj?.[PAGE_ID];
  if (isExternalMediaLink(obj) && obj.url) {
    return (/^(http|https):*/.test(obj.url)) ? obj.url : "//".concat(obj.url);
  }

  const url = CMSPageUrlPageIdSelector(state, pageIdOrUrl || "");

  return url || "/";
};

const CMSMetaContentSelector = createOptionalPropertySelector(
  CMSContentSelector,
  "metaContent",
);

// this selector works if you have only one pageType, that you use in this selector
const CMSMetaOrPageTitleByPageTypeSelector = (state: TPlatformAppState, pageType: EPageType) => {
  const pages = CMSPagesSelector(state);

  const page = getPageByPageType(pages, pageType);

  if (isNil(page)) {
    return null;
  }
  const metaContents = CMSMetaContentSelector(state);

  const pageContent = CMSPageContentByPageIdSelector(state, page.id);

  if (isPromotionPageBlockContent(pageContent)) {
    return pageContent.promotionPageContent?.pageTitle?.description;
  }

  return metaContents?.find((value) => value.pageId === page.id)?.pageTitle;
};

const CMSPromosChooseTagsSelector = createSimpleSelector(
  [CMSPromoPageContentSelector],
  (pagesContent) => {
    if (isVoid(pagesContent)) {
      return null;
    }

    const tagsArrays = pagesContent.promos?.content?.map((promo) => promo?.chooseTags);

    return [...new Set(tagsArrays?.reduce(
      (acc, curVal) =>
        !isVoid(curVal) ? acc?.concat(curVal) : acc,
      [],
    ))];
  },
);

export {
  CMSSimplePageAnchorSelector,
  isCMSSimplePageSelector,
  isCMSPromoPagePromosSelector,
  CMSPageByPathSelector,
  CMSIsShowBonusSelector,
  CMSUrlByTitleSelector,
  CMSPageUrlPageIdSelector,
  CMSPageContentSucceededSelector,
  CMSCurrentPageTypeSelector,
  CMSMatchRouteByPageIdListSelector,
  CMSLinkByPageTypeSelector,
  CMSUrlByPageTypeSelector,
  CMSPageContentByPageIdSelector,
  cmsPromoPagePromosSelector,
  cmsPromoPageTagsSelector,
  CMSPromoPageContentSelector,
  CMSCorrectUrlSelector,
  CMSMetaOrPageTitleByPageTypeSelector,
  cmsPromoPagePromosBonusesIdsSelector,
  CMSPromosChooseTagsSelector,
};
