import { type TCms_Page_Fragment } from "@sb/graphql-client/CmsUI";
import {
  CHILD_PAGES_COUNT,
  type IBlockContentContainer,
  type IData,
  type IMetaContent,
  PAGE as pageConst,
  PAGE_CONTENT,
  PAGE_ID,
  PAGE_TYPE,
  PARENT_PAGE_ID,
  PRIORITY,
} from "@sb/cms-core";
import { isNotNil } from "@sb/utils";
import { type TTranslateMap } from "@sb/betting-core/TTranslateMap";
import { getCorrectMultiLangValue } from "./Helpers";

const getCorrectPage = (
  page: TCms_Page_Fragment,
  index: number,
  childPageCount: number,
  childPages: IData[] | null = null,
  pageContent?: IBlockContentContainer,
): IData => {
  const childPagesList = isNotNil(childPages) ? { [pageConst]: childPages } : {};

  return  ({
    [PAGE_ID]: page.id,
    [PARENT_PAGE_ID]: page.parentPageId ?? null,
    title: getCorrectMultiLangValue(page.title),
    url: page.url,
    [PRIORITY]: index,
    [PAGE_TYPE]: page.pageType,
    [CHILD_PAGES_COUNT]: childPageCount,
    [PAGE_CONTENT]: pageContent,
    ...childPagesList,
  });
};

const normalizedMetaContent = (metaContent: IMetaContent) => {
  const metaTagsList = metaContent.content ?? [];
  const metaTags = metaTagsList.reduce<Record<string, TTranslateMap>>(
    (acc, value) => ({
      ...acc,
      [value.simpleBlock]: value.description.description,
    }),
    {},
  );

  return ({
    metaTags,
  });
};

export { getCorrectPage, normalizedMetaContent };
