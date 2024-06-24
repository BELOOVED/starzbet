import { type IListDef, type TFieldDefs, type TResolver, withValidation } from "@sb/form-new";
import { entries, isNil, type TExplicitAny } from "@sb/utils";
import {
  cmsui_general_blockContent,
  cmsui_general_metaContent,
  cmsui_general_placeholder_enterUrl,
  cmsui_general_title,
} from "@sb/translates/cmsui/Keys";
import { isListPage, isPage as isPageGuard, isSimplePage } from "../../Utils/CMSTypeGuards";
import { type TGeneralForPage } from "../../Types";
import { type IChildPage, type IChildPageBuilder, type IPage } from "../../Interfaces";
import { EComponentsType, EPageContentType, EPageType } from "../../EnumTypes";
import {
  BLOCK_CONTENT,
  BLOCK_ID,
  CHILD_PAGES_COUNT,
  PAGE as pageVar,
  PAGE_CONTENT,
  PAGE_ID,
  PAGE_TYPE as pageTypeConst,
  PARENT_PAGE_ID,
  PRIORITY,
  STATE_WAS_CHANGED,
  META_CONTENT,
  VERSION,
  BLOCK_TYPE,
} from "../../Constants";
import { childValidator, requiredValidator } from "../../CMSValidations";
import { oneOfRules } from "../../Utils/CMSFormType";
import {
  formContainer,
  listContainerWithoutWrapper,
  simpleField,
  simpleObjectField,
} from "../../Utils/CMSFieldBuilders";
import { CMSTypeError } from "../../Utils/CMSHelpers";
import { roundBlocks } from "./BlockDefCreator";
import { tagListForm } from "./TagListForm";
import { filesField } from "./FilesField";

const pageContentType: Partial<Record<EPageType, EPageContentType>> = {
  [EPageType.childInfoPage]: EPageContentType.simplePage,
  [EPageType.privacyPage]: EPageContentType.simplePage,
  [EPageType.termsPage]: EPageContentType.simplePage,
  [EPageType.landingPage]: EPageContentType.landingPage,
  [EPageType.promoPage]: EPageContentType.promoPage,
};

const roundDynamicPages = (pageMap: Record<string, TGeneralForPage>): TFieldDefs =>
  entries(pageMap).reduce(
    (acc, [pageName, page], index) => {
      if (isListPage(page)) {
        return ({
          ...acc,
          [pageName]: listDefForPages(page.page, oneOfRules.simple(), page.maxCount, false, index),
        });
      }
      if (isSimplePage(page)) {
        return ({
          ...acc,
          [pageName]: simpleDefForPages(page, false, page.pageType),
        });
      }

      return acc;
    },
    {},
  );
const roundChildPages = (pagesMap: IChildPageBuilder | undefined): Record<string, TExplicitAny> | void => {
  if (isNil(pagesMap)) {
    return {};
  }

  return entries<IChildPageBuilder>(pagesMap).reduce(
    (acc, value, index) => {
      if (isNil(value)) {
        return acc;
      }

      const [pageType, page] = value;

      if (isNil(page)) {
        return acc;
      }
      const isRequired = pageType === "static";
      if (isListPage(page)) {
        return ({
          ...acc,
          [pageVar]: listDefForPages(page.page, oneOfRules.simple(), page.maxCount, isRequired, index),
        });
      }

      return acc;
    },
    {},
  );
};
const roundStaticPages = (taxMap: Record<string, IPage>): TFieldDefs => entries(taxMap).reduce(
  (acc, [pageName, page]) => ({
    ...acc,
    [pageName]: roundPage(page, true, true, page.pageType),
  }),
  {},
);

const pageField = <P extends IPage | IChildPage = IPage | IChildPage>(page: P, typeOfPage: EPageType) => {
  const metaContent = page.metaContent
    ? {
      [META_CONTENT]: formContainer({
        fields: roundBlocks(page.metaContent),
        containerTitle: cmsui_general_metaContent,
      }),
    }
    : null;

  return ({
    title: simpleObjectField({
      title: cmsui_general_title,
      extensions: withValidation(requiredValidator()),
      componentType: EComponentsType.multiLangInputTitle,
      multi: true,
    }),
    url: simpleField({
      title: cmsui_general_placeholder_enterUrl,
      extensions: withValidation(requiredValidator()),
      componentType: EComponentsType.textInputUrl,
    }),
    [PRIORITY]: simpleField({ componentType: EComponentsType.priorityInput }),
    [PAGE_ID]: simpleField({ componentType: EComponentsType.idInput }),
    [pageTypeConst]: simpleField({ componentType: EComponentsType.pageTypeInput }),
    [PARENT_PAGE_ID]: simpleField({ componentType: EComponentsType.idInput }),
    [CHILD_PAGES_COUNT]: simpleField({ componentType: EComponentsType.priorityInput }),
    [PAGE_CONTENT]: formContainer({
      componentType: EComponentsType.emptyContainer,
      extensions: withValidation(childValidator()),
      customExtensions: {
        [BLOCK_TYPE]: typeOfPage,
        [VERSION]: page[VERSION],
      },
      fields: {
        [STATE_WAS_CHANGED]: simpleField(),
        [BLOCK_ID]: simpleField({ componentType: EComponentsType.idInput }),
        [BLOCK_TYPE]: simpleField({ componentType: EComponentsType.pageTypeInput }),
        [BLOCK_CONTENT]: formContainer({
          componentType: EComponentsType.emptyContainer,
          containerTitle: cmsui_general_blockContent,
          fields: {
            ...metaContent,
            ...roundBlocks(page.blocksMap),
            ...tagListForm,
            ...filesField,
          },
          customExtensions: {
            blockType: pageContentType[page.pageType],
          },
        }),
      },
    }),

    ...roundChildPages(page.childPage),
  });
};

const roundPage = (
  page: IPage | IChildPage,
  required: boolean,
  isPage: boolean,
  typeOfPage: EPageType,
) => formContainer({
  componentType: EComponentsType.mainContainer,
  containerTitle: isPageGuard(page) ? page.title : undefined,
  extensions: withValidation(childValidator()),
  customExtensions: {
    required,
    isPage,
    [pageTypeConst]: typeOfPage,
    [VERSION]: page[VERSION],
    isBlockContent: !!page.blocksMap,
    withMetaContent: Boolean(page.metaContent),
    defaultPageName: "title" in page ? page.title : "Empty page name",
  },
  fields: pageField(page, typeOfPage),
});

const listDefForPages = (
  page: TGeneralForPage,
  oneOfFunc: TResolver,
  maxCount: number,
  isRequired: boolean,
  index: number,
): IListDef => {
  if (isSimplePage(page)) {
    return listContainerWithoutWrapper({
      fields: formContainer({
        componentType: EComponentsType.mainContainer,
        customExtensions: {
          isPage: true,
          required: isRequired,
          [PRIORITY]: index,
          [pageTypeConst]: page.pageType,
          [VERSION]: page[VERSION],
          isBlockContent: !!page.blocksMap,
          withMetaContent: Boolean(page.metaContent),
        },
        fields: pageField(page, page.pageType),
      }),
      customExtensions: { maxCount, isPage: true },
    });
  } else {
    throw new CMSTypeError("Page can't be anything but simple");
  }
};

const simpleDefForPages = (
  page: IChildPage,
  required: boolean,
  pageType: EPageType,
) => roundPage(page, required, true, pageType);

export {
  roundStaticPages,
  roundDynamicPages,
};

