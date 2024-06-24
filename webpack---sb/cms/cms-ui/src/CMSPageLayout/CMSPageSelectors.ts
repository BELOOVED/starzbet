import { ascend, getNotNil, isArray, isNil, isNotNil, isNotVoid, isPrimitive, sort } from "@sb/utils";
import {
  type call_ChangeCmsPagePriorityCommand,
  type call_CreateCmsPageCommand,
  type call_UpdateCmsPageCommand,
} from "@sb/sdk/SDKClient/cms";
import { CMS_EXTENSION_KEY, selectFieldDef, selectFieldDefExtension, selectFieldValue, type TFieldPath } from "@sb/form-new";
import {
  CHILD_PAGES_COUNT,
  EPageType,
  getNewTranslateToPageTitle,
  getUrlFromString,
  type IBlockContentContainer,
  type ICMSExtensions,
  type IData,
  type IMultilang,
  PAGE,
  PAGE_CONTENT,
  PAGE_ID,
  PAGE_TYPE,
  PAGE_TYPE_TO_ROOT_PAGE_MAP,
  PARENT_PAGE_ID,
  PRIORITY,
} from "@sb/cms-core";
import { type TCms_Page_Fragment } from "@sb/graphql-client/CmsUI";
import { type TCallPayload } from "@sb/sdk";
import { getProjectCodeByFormName } from "../CMS/Utils/Helpers";
import { cmsPageIdsSelector, getCmsPageByPageIdSelector } from "../CMS/Selectors/CMSSelectors";
import { type TLocaleSelector, type TScaleSelector } from "../Context/Model";
import { type TCmsAppState } from "../Model/TCmsAppState";
import { type addPageAction, type changePageNameAction, type changePagePriorityAction } from "./CMSPageAction";
import { getCorrectPage } from "./Utils/EpicUtils";
import { RootPagePathMap } from "./Model/RootPagePathByType";

const EMPTY_OBJECT = {};

const getAllNotRemovedChildPagesByParentPageIdSelector = (state: TCmsAppState, parentPageId: string) =>
  cmsPageIdsSelector(state)
    .map((pageId) => getCmsPageByPageIdSelector(state, pageId))
    .filter((page) => page.parentPageId === parentPageId);

const addPageSelector = (
  state: TCmsAppState,
  {
    payload: {
      nameChildPage,
      systemLocale,
      typeOfPage,
      fieldPath,
      pageId: id,
    },
    metadata: { formName },
  }: ReturnType<typeof addPageAction>,
): TCallPayload<typeof call_CreateCmsPageCommand> | null => {
  const currentValue = selectFieldValue<IData>(state, formName, fieldPath);
  const url = getUrlFromString(nameChildPage);
  const parentId = currentValue?.[PAGE_ID] || null;
  const projectCode = getProjectCodeByFormName(formName);

  const pageType = parentId
    ? EPageType.childInfoPage
    : typeOfPage ?? EPageType.childInfoPage;

  return {
    url,
    title: [{ locale: systemLocale, translate: nameChildPage }],
    pageId: id,
    parentPageId: parentId,
    pageType,
    pageTitle: null,
    projectCode,
  };
};

const changePagePrioritySelector = (
  state: TCmsAppState,
  {
    payload: {
      lowerPageId,
      upperPageId,
      targetPageId,
      parentPageId,
    },
  }: ReturnType<typeof changePagePriorityAction>,
): TCallPayload<typeof call_ChangeCmsPagePriorityCommand> => ({
  updates: [
    {
      lowerPageId,
      upperPageId,
      targetPageId,
      parentPageId,
      targetId: targetPageId,
    },
  ],
});

const changePageSelector = (
  state: TCmsAppState,
  {
    payload: {
      fieldPath,
      newPageName,
      systemLocale,
    },
    metadata: { formName },
  }: ReturnType<typeof changePageNameAction>,
): TCallPayload<typeof call_UpdateCmsPageCommand> | null => {
  const currentValue =
    getNotNil(selectFieldValue<IData>(state, formName, fieldPath), ["CMS", "changePageSelector"], "cannot change page");
  const url = getUrlFromString(newPageName);

  return {
    pageId: currentValue[PAGE_ID],
    pageType: currentValue[PAGE_TYPE],
    parentPageId: currentValue[PARENT_PAGE_ID],
    title: getNewTranslateToPageTitle(currentValue.title, newPageName, systemLocale),
    url,
  };
};

const isPageWithSameUrlAlreadyExistSelector = (state: TCmsAppState, formName: string, path: TFieldPath, url: string) => {
  const value = selectFieldValue(state, formName, path);

  if (isNil(value)) {
    return false;
  }

  if (isPrimitive(value)) {
    throw new Error(`value by path: ${path.join(".")}, can be only object`);
  }

  const normalizedValue = isArray(value) ? value : Object.values(value);

  return normalizedValue.some((it) => it?.url === url);
};

const getRootPageSelector = (state: TCmsAppState, formName: string, id: string) => {
  const page = getCmsPageByPageIdSelector(state, id);

  if (isNotNil(page.parentPageId) && page.childPagesCount === 0) {
    return null;
  }
  const childPages = getAllNotRemovedChildPagesByParentPageIdSelector(state, id);
  const correctChildPagesMap = (childPages: TCms_Page_Fragment[]): IData[] | null => {
    if (page.parentPageId) {
      return null;
    }
    const parentPageName = getNotNil(
      PAGE_TYPE_TO_ROOT_PAGE_MAP[page.pageType as EPageType],
      ["CMS", "getRootPageSelector", "PAGE_TYPE_TO_ROOT_PAGE_MAP[page.pageType]"],
      "parentPagePath",
    );

    const childPagesPath: TFieldPath = [parentPageName, PAGE];

    const childPagesList = selectFieldValue<IData[]>(state, formName, childPagesPath) ?? [];

    const childPagesContentMap = new Map<string, IBlockContentContainer>();

    for (const page of childPagesList) {
      const pageContent = page[PAGE_CONTENT];

      if (isNotNil(pageContent)) {
        childPagesContentMap.set(page[PAGE_ID], pageContent);
      }
    }

    return childPages.map((page) => {
      const childPageContent = childPagesContentMap.get(page.id);
      if (page.childPagesCount > 0) {
        const childPages = getAllNotRemovedChildPagesByParentPageIdSelector(state, page.id);

        return getCorrectPage(page, parseFloat(page.priority), page.childPagesCount, correctChildPagesMap(childPages), childPageContent);
      }

      return getCorrectPage(page, parseFloat(page.priority), page.childPagesCount, null, childPageContent);
    });
  };

  const correctChildPagesList = correctChildPagesMap(childPages);

  const sortedCorrectChildPagesMap = isNotNil(correctChildPagesList) && correctChildPagesList.length > 0
    ? sort(ascend((page) => page[PRIORITY]), correctChildPagesList)
    : null;

  if (isNil(page.parentPageId)) {
    const rootPageName =
      getNotNil(RootPagePathMap[page.pageType as EPageType].at(-1), ["CMS", "getRootPageSelector"], "rootPageName");

    const rootPageContentPath = [rootPageName, PAGE_CONTENT];
    const pageContent = selectFieldValue<IBlockContentContainer>(state, formName, rootPageContentPath);
    const correctPage = getCorrectPage(page, +page.priority, page.childPagesCount, sortedCorrectChildPagesMap, pageContent);

    return ({
      [rootPageName]: correctPage,
    });
  }

  return {};
};

const isCanHaveChildPageSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const def = selectFieldDef(state, formName, path);

  return "fields" in def && PAGE in def.fields;
};

const isShowLineSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const currentValue = selectFieldValue<IData>(state, formName, path);

  return Boolean(isNotNil(currentValue) && currentValue.page && currentValue[PAGE].length > 0);
};

const indexByValueSelector = (state: TCmsAppState, formName: string, path: TFieldPath, appServiceLocaleSelector: TLocaleSelector) => {
  const systemLocale = appServiceLocaleSelector(state);
  const titleValue = selectFieldValue<IMultilang[]>(state, formName, path);

  return isNotNil(titleValue) && isArray(titleValue) && titleValue.findIndex(({ locale }) => locale === systemLocale);
};

const pageNameSelector = (state: TCmsAppState, formName: string, path: TFieldPath, appServiceLocaleSelector: TLocaleSelector) => {
  const pathToTitle = [...path, "title"];

  const indexByValue = indexByValueSelector(state, formName, pathToTitle, appServiceLocaleSelector);

  const pathToValue = indexByValue && indexByValue !== -1 ? [...pathToTitle, indexByValue, "translate"] : [...pathToTitle, 0, "translate"];

  return selectFieldValue<string>(state, formName, pathToValue) ?? "";
};

const pageNameOrDefaultPageNameSelector =
  (state: TCmsAppState, formName: string, path: TFieldPath, appServiceLocaleSelector: TLocaleSelector) => {
    const pathToTitle = [...path, "title"];

    const indexByValue = indexByValueSelector(state, formName, pathToTitle, appServiceLocaleSelector);

    const pathToValue = indexByValue && indexByValue !== -1 ? [...pathToTitle, indexByValue, "translate"] : [...pathToTitle, 0, "translate"];

    const pageName = selectFieldValue<string>(state, formName, pathToValue);

    if (isNotVoid(pageName)) {
      return pageName;
    }

    return defaultPageNameSelector(state, formName, path);
  };

const pageIdSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const pageIdPath = path.concat(PAGE_ID);

  return selectFieldValue<string>(state, formName, pageIdPath);
};

const customExtensionSelector = (state: TCmsAppState, formName: string, fieldPath: TFieldPath) => {
  const extension = selectFieldDefExtension<ICMSExtensions>(state, formName, fieldPath, CMS_EXTENSION_KEY);

  return extension?.customExtensions;
};

const pageTypeSelector = (state: TCmsAppState, formName: string, fieldPath: TFieldPath) => {
  const extension = customExtensionSelector(state, formName, fieldPath);

  return extension?.[PAGE_TYPE];
};

const isRequiredSelector = (state: TCmsAppState, formName: string, fieldPath: TFieldPath) => {
  const extension = customExtensionSelector(state, formName, fieldPath);

  return extension?.required;
};

const defaultPageNameSelector = (state: TCmsAppState, formName: string, fieldPath: TFieldPath) => {
  const extension = customExtensionSelector(state, formName, fieldPath);

  return extension?.defaultPageName;
};

const childPagesCountSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const pageIdPath = path.concat(CHILD_PAGES_COUNT);

  return selectFieldValue<number>(state, formName, pageIdPath);
};

const dragDropOffsetSelector = (state: TCmsAppState, appServiceScaleSelector: TScaleSelector) => {
  const scale = appServiceScaleSelector(state);

  return scale === "1"
    ? EMPTY_OBJECT
    : ({
      offsetY: 10,
      offsetX: 35,
    });
};

export {
  isPageWithSameUrlAlreadyExistSelector,
  isCanHaveChildPageSelector,
  isRequiredSelector,
  pageTypeSelector,
  dragDropOffsetSelector,
  childPagesCountSelector,
  pageIdSelector,
  pageNameOrDefaultPageNameSelector,
  pageNameSelector,
  isShowLineSelector,
  getRootPageSelector,
  changePagePrioritySelector,
  changePageSelector,
  addPageSelector,
  cmsPageIdsSelector,
};
