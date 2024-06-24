import { type Selector } from "react-redux";
import {
  createMemoSelector,
  createOptionalPropertySelector,
  getNotNil,
  isNil,
  isNotNil,
  isNotVoid,
  isString,
  isVoid,
  type TNullable,
} from "@sb/utils";
import { BLOCK_CONTENT, VARIABLES } from "@sb/cms-core";
import { callManagerSucceededSelector } from "@sb/call-manager";
import type {
  TCms_Image_Type_Fragment,
  TCms_ImageWithTheme_Type_Fragment,
  TCms_MultiLang_Type_Fragment,
  TCms_Variable_Fragment,
} from "@sb/graphql-client/CmsUI";
import { EFileType, isFileType } from "@sb/file-service";
import { getTranslateByLocaleOrFirstNonNullableTranslate } from "../../../../common/Utils/GetTranslateByLocaleOrFirstNonNullableTranslate";
import { themeSelector } from "../../../../common/Store/Theme/ThemeSelectors";
import { type IWithThemeState } from "../../../../common/Store/Theme/ThemeState";
import { getPathToPublicFileWithFormatExt } from "../../../../common/Utils/GetImageFormatParam";
import { isMobileSelector } from "../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { type TArrayNullable } from "../../../Themes/Betwiz/Model/FooterInterfaceAndTypes";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ICmsState, type ICmsWrapperState, type TContent } from "../Model/CmsModel";
import { CMS_BLOCKS_SYMBOL } from "../Model/CmsSymbols";
import { EMPTY_ARRAY, getListByPageId, getNumberedNotVoidValueInArray, imgByTheme, isAllElementInArrayNotNil } from "../Utils/Helpers";
import { isThemeImage } from "../Utils/TypeGuards";

const CMSSelector: Selector<ICmsWrapperState<TContent>, ICmsState<TContent>> = ({ CMS }) => CMS;

const CMSContentSelector = (state: ICmsWrapperState<TContent>) => state.CMS.content;

const CMSPagesSelector = createOptionalPropertySelector(
  CMSContentSelector,
  "pages",
);

const CMSFooterLinkListSelector = (state: TPlatformAppState) => {
  const footerContent = CMSContentSelector(state)[BLOCK_CONTENT].footer;

  if (isNotNil(footerContent) && "linkListMap" in footerContent) {
    return footerContent.linkListMap?.content;
  }

  return null;
};

const CMSVariablesSelector = createOptionalPropertySelector(
  CMSContentSelector,
  [VARIABLES, "nodes"],
);

const isCmsVariablesServerLoadedSelector = createOptionalPropertySelector(
  CMSContentSelector,
  [VARIABLES, "isServerLoaded"],
);

const CMSVariablesMapSelector = createMemoSelector(
  [CMSVariablesSelector],
  (variables) => variables?.reduce<Record<string, TCms_Variable_Fragment>>(
    (acc, value) => {
      acc[value.key] = value;

      return acc;
    },
    {},
  ),
);

const CMSVariableValueByKeySelector = (state: TPlatformAppState, key: string) => {
  const variablesMap = CMSVariablesMapSelector(state);

  return variablesMap?.[key]?.value;
};

interface IFileId {
  type: EFileType.temporary | EFileType.permanent;
  id: string;
}

const separator = "@@@";

const parseFileId = (imageId: string): IFileId => {
  const typeAndIdArr = imageId.split(separator);

  if (typeAndIdArr.length === 1) {
    return ({
      type: EFileType.permanent,
      id: imageId,
    });
  }

  const type = getNotNil(typeAndIdArr[0], ["parseFileId"], "type");

  const id = getNotNil(typeAndIdArr[1], ["parseFileId"], "id");

  if (isFileType(type) && isString(id)) {
    return { type, id };
  }

  throw new Error(`"${type}"  is not EFileType or ${id} is not String`);
};

const getPayloadWithCorrectValueFromDataAttrSelector = createMemoSelector(
  (state: TPlatformAppState, value: TArrayNullable<TCms_MultiLang_Type_Fragment>): TArrayNullable<TCms_MultiLang_Type_Fragment> => {
    const files = CMSFilesSelector(state);
    if (isAllElementInArrayNotNil(value)) {
      return value.map(({ translate, ...rest }) => {
        if (isNil(translate)) {
          return { translate, ...rest };
        }
        const source = new DOMParser().parseFromString(translate, "text/html").body;

        const images = source.getElementsByTagName("img");

        const spans = source.getElementsByTagName("span");

        for (const span of spans) {
          const variable = span.dataset.variable;
          if (variable) {
            const variableContent = CMSVariableValueByKeySelector(state, variable);
            if (isNotVoid(variableContent)) {
              const locale = localeSelector(state);

              const content = getTranslateByLocaleOrFirstNonNullableTranslate(variableContent, locale);
              if (isNotNil(content)) {
                span.innerHTML = content;
              }
            }
          }
        }

        for (const image of images) {
          const imageId = image.dataset.imageId;
          if (imageId) {
            const { id } = parseFileId(imageId);

            const pathToFile = files?.[id]?.pathToFile;
            if (isNotNil(pathToFile)) {
              image.src = getPathToPublicFileWithFormatExt(pathToFile);
            }
          }
        }

        return { translate: source.innerHTML, ...rest };
      });
    }

    return EMPTY_ARRAY;
  },
  { resultEqual: "deepEqual" },
)
;

const cmsBlockSucceededSelector = callManagerSucceededSelector.with.symbol(CMS_BLOCKS_SYMBOL);

const CMSFilesSelector = createOptionalPropertySelector(
  CMSContentSelector,
  "files",
);

const CMSCorrectFileByFileIdsSelector = (state: TPlatformAppState, ids: TArrayNullable<string>) => {
  const files = CMSFilesSelector(state);
  if (isVoid(files) || isVoid(ids)) {
    return null;
  }
  const desktopId = getNumberedNotVoidValueInArray(ids, 0);
  const isMobile = isMobileSelector(state);

  if (isMobile) {
    const mobileId = getNumberedNotVoidValueInArray(ids, 1);

    if (mobileId) {
      return files[mobileId];
    }

    if (desktopId) {
      return files[desktopId];
    }

    return null;
  }

  if (desktopId) {
    return files[desktopId];
  }

  return null;
};

type TImage = TCms_ImageWithTheme_Type_Fragment | TCms_Image_Type_Fragment

const CMSPathToFileSelector = (state: TPlatformAppState & IWithThemeState, img: TNullable<TImage>) => {
  const theme = themeSelector(state);

  const fileId = isThemeImage(img) ? imgByTheme(img, theme) : img?.files;

  return CMSCorrectFileByFileIdsSelector(state, fileId)?.pathToFile;
};

const CMSSimplePageLinksSelector = (state: TPlatformAppState, id: string) => {
  const linkList = CMSFooterLinkListSelector(state);

  return getListByPageId(linkList, id);
};

export {
  CMSCorrectFileByFileIdsSelector,
  CMSSimplePageLinksSelector,
  CMSFooterLinkListSelector,
  CMSPathToFileSelector,
  getPayloadWithCorrectValueFromDataAttrSelector,
  CMSPagesSelector,
  CMSSelector,
  CMSContentSelector,
  cmsBlockSucceededSelector,

  isCmsVariablesServerLoadedSelector,
};
