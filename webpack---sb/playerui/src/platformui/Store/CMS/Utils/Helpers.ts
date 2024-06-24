import { type ImgHTMLAttributes } from "react";
import { isNil, isNotEmpty, isNotNil, isNotVoid, type TAnyObject, type TExplicitAny, type TNil, type TNullable } from "@sb/utils";
import type {
  TCms_ImageWithTheme_Type_Fragment,
  TCms_LinksBlockListWithTitleContent_Type_Fragment,
  TCms_Page_Fragment,
  TCms_PromoPageContentPromosUnionThemeTwo_Type_Fragment,
  TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Union_Fragment,
} from "@sb/graphql-client/CmsUI";
import { ETheme } from "../../../../common/Store/Theme/ThemeState";
import { getLocalizedPathPatternByRoute } from "../../../../common/Client/Core/Services/RouterService/Utils/GetLocalizedPathPatternByRoute";
import { type TArrayNullable } from "../Model/CmsModel";
import { CMS_URL } from "../Model/CmsConstants";
import { isEternalMediaLink } from "./TypeGuards";
import { recursiveGetCorrectUrl } from "./RecursiveGetCorrectUrl";

const isAllElementInArrayNotNil = <T extends TExplicitAny>(content: TNullable<T[]>): content is Exclude<T, TNil>[] =>
  isNotVoid(content) && content.every(isNotNil);

const getChildPagesByPageId = (pages: TNullable<TCms_Page_Fragment[]>, pageId: string) =>
  pages?.filter((page) => page.parentPageId === pageId);

// TODO: try to find better solution. Currently such type exist for case of modification cms-graphql
type TLabelWithContent<T> = {
  labelOrGames: TNullable<{
    content: TArrayNullable<T>;
  }>;
}

const getListWithLabelsOrGamesIds = <T>(content: TArrayNullable<TLabelWithContent<T>>) => content?.map((it) => it?.labelOrGames?.content);

const getImgLazyStyles = (size?: { width: string; height: string; }): ImgHTMLAttributes<HTMLImageElement> => {
  if (size) {
    const { width, height } = size;

    return ({
      loading: "lazy",
      width,
      height,
    });
  }

  return ({
    loading: "lazy",
  });
};

const getBonusId = (bonus: TAnyObject): string | null => "bonusId" in bonus ? bonus.bonusId : null;

const getNumberedNotVoidValueInArray = (arr: (string | null)[], index: number) => {
  const nonEmptyArr = arr.filter(isNotVoid);

  return nonEmptyArr[index];
};

const EMPTY_ARRAY: [] = [];

const imgByTheme = (img: TCms_ImageWithTheme_Type_Fragment, theme: ETheme | null) => {
  const lightIds = img.light?.files ?? EMPTY_ARRAY;

  const darkIds = img.dark?.files ?? EMPTY_ARRAY;

  if (theme === ETheme.light) {
    return isNotEmpty(lightIds) ? lightIds : darkIds;
  }

  return isNotEmpty(darkIds) ? darkIds : lightIds;
};

const hasBonusImg = (
  bonus: TCms_PromoPageContentPromosUnionThemeTwo_Type_Fragment
    | TCms_ThemeOne_Promotions_PageContent_BlockContent_PromotionPageContent_Promos_Content_Union_Fragment,
) => {
  if (isNil(bonus.image)) {
    return false;
  }

  const lightImg = bonus.image.light;

  const darkImg = bonus.image.dark;

  return isNotNil(lightImg) || isNotNil(darkImg);
};

const getPageIdList = (list: TCms_LinksBlockListWithTitleContent_Type_Fragment) => list.linkList?.content?.reduce<string[]>(
  (acc, it) => {
    const mediaLink = it?.mediaLink;

    if (isNil(mediaLink)) {
      return acc;
    }

    if (!isEternalMediaLink(mediaLink)) {
      return acc;
    }

    const pageId = mediaLink.pageId;

    if (isNil(pageId)) {
      return acc;
    }

    acc.push(pageId);

    return acc;
  },
  [],
) ?? EMPTY_ARRAY;

const getListByPageId = (footerLinkList: TArrayNullable<TCms_LinksBlockListWithTitleContent_Type_Fragment>, id: string) =>
  footerLinkList?.find((it) => it?.linkList?.content?.find((it) => {
    const mediaLink = it?.mediaLink;

    return isEternalMediaLink(mediaLink) ? mediaLink.pageId === id : false;
  }))?.linkList?.content ?? EMPTY_ARRAY;

const getLocalizedUrlsWithCMSPrefix = (arr: TCms_Page_Fragment[], id: string) =>
  getLocalizedPathPatternByRoute(CMS_URL.concat(recursiveGetCorrectUrl(arr, id)));

const isExternalLink = (link: TNullable<string>): link is string => isNotNil(link) && Boolean(/^(http|https):*/.test(link));

const isStartWithSlash = (link: TNullable<string>): link is string => isNotNil(link) && Boolean(/^\/[^/]/.exec(link));

export {
  isStartWithSlash,
  isExternalLink,
  getLocalizedUrlsWithCMSPrefix,
  getListByPageId,
  getPageIdList,
  EMPTY_ARRAY,
  getNumberedNotVoidValueInArray,
  imgByTheme,
  hasBonusImg,
  getListWithLabelsOrGamesIds,
  getBonusId,
  getImgLazyStyles,
  getChildPagesByPageId,
  isAllElementInArrayNotNil,
};
