import { omit } from "ramda";
import {
  _HIDDEN_FIELD_,
  CMS_EXTENSION_KEY,
  FILES_FIELD,
  getFormFieldPaths,
  isListDef,
  type IWithFormsState,
  KindService,
  selectFieldDef,
  selectFieldDefExtension,
  selectFieldMeta,
  selectFieldMetaValidationExtension,
  selectFieldNotNilValue,
  selectFieldValue,
  type TFieldDef,
  type TFieldPath,
  type TFieldValue,
} from "@sb/form-new";
import {
  combineSelectors,
  createMemoSelector,
  createPropertySelectors,
  createSimpleSelector,
  getNotNil,
  isAnyObject,
  isArray,
  isNil,
  isNotNil,
  isNotVoid,
  isNumber,
  isString,
  isVoid,
  sort,
  type TNullable,
  uuid4,
  withParams,
} from "@sb/utils";
import { createOrmSelector, deferFindMany, deferFindOne, deferGetMany, deferGetOne, type IWithOrmState } from "@sb/rorm";
import { type TCallPayload } from "@sb/sdk";
import { type call_UpdateCmsBlockCommand, type call_UpdateCmsPageMetaContentCommand } from "@sb/sdk/SDKClient/cms";
import {
  BLOCK_CONTENT,
  BLOCK_ID,
  BLOCK_TYPE,
  CMS_AFFILIATE_FORM_NAME,
  CMS_PLATFORM_FORM_NAME,
  DISABLED_FIELD,
  EBlockTypeMap,
  EComponentsType,
  EPageType,
  type ERootPages,
  getIdByPath,
  getParentPath,
  type IBlockGeneralFields,
  type ICMSExtensions,
  type IData,
  type IMetaContent,
  type IMultilang,
  isCmsTKeyApp,
  isCorrectFormName,
  META_CONTENT,
  PAGE_CONTENT,
  PAGE_ID,
  PAGE_ID as pageIdConst,
  PathPageTypeMap,
  type TComponentsPropsMap,
  type TFormNames,
  VARIABLES,
  VERSION,
} from "@sb/cms-core";
import { callManagerSucceededSelector, callManagerWasSucceededSelector } from "@sb/call-manager";
import { keys } from "@sb/utils/Keys";
import { deleteNoValidFieldHelper } from "@sb/adminui-core/Utils/FormUtils/MountFormHelper/DeleteNoValidFieldHelper";
import {
  ERecordName as ECmsRecordName,
  type TCms_Block_Record,
  type TCms_GameIdsContent_Type_Fragment,
  type TCms_LabelOrGameIds_Union_Fragment,
  type TCms_Page_Fragment,
  type TCms_PageMetaContent_Fragment,
  type TCms_ThemeTwo_Landing_BlockContent_Fragment,
  type TCms_Variable_Fragment,
} from "@sb/graphql-client/CmsUI";
import { EFileStateType, fileServiceSelectors, type TFileDto } from "@sb/file-service";
import { ERecordName } from "@sb/graphql-client";
import { ERecordName as EAdminUIRecordName, type TPlatform_Bonus_Record } from "@sb/graphql-client/AdminUI";
import { permanentFileToFormValue } from "@sb/file-service-extension";
import { loadedResultIdsSelector } from "@sb/adminui-core/Store/Selectors/RecordIdsSelectorFactory";
import { type TProjectCode } from "@sb/sdk/common/cms/api/model/ProjectCode";
import { CMS_BONUS_RESULT_ID, CMS_VARIABLE_TABLE_COMMON_PAGINATOR_NAME } from "../../CMS/Model/PaginatorNames";
import {
  BLOCK_CALL_SYMBOL,
  BONUS_CALL_SYMBOL,
  META_CONTENT_CALL_SYMBOL,
  PAGES_CALL_SYMBOL,
  VARIABLE_TABLE_COMMON_LOADER_SYMBOL,
} from "../../CMS/Model/CMSSymbol";
import { normalizedMetaContent } from "../../CMSPageLayout/Utils/EpicUtils";
import { cmsPageIdsSelector, getCmsPageByPageIdSelector, getOneBlockContentByBlockIdSelector } from "../../CMS/Selectors/CMSSelectors";
import { type TLocaleSelector, type TScaleSelector } from "../../Context/Model";
import { type TCmsAppState } from "../../Model/TCmsAppState";
import { getMetaPageContentPath } from "../../CMS/Utils/Helpers";
import { type pushBlockAction, type pushImportedBlockAction, type pushMetaContentAction } from "../CMSLayoutActions";
import {
  getCorrectMetaTags,
  getCorrectMultilang,
  getCorrectTranslate,
  normalizedPushedContent,
  sortedByPriority,
  uniqueArray,
} from "../Utils/Helpers";
import { type IFiles } from "../Model";
import { getInitialState } from "../Utils/CMSGetInitialState";
import { getFileIdsPath } from "../Utils/PathCreators";

const EMPTY_OBJECT = {};

const EMPTY_ARRAY: [] = [];

const platformBonusesForPromotionsIdsSelector = (state: TCmsAppState) => loadedResultIdsSelector(
  state,
  EAdminUIRecordName.platformBonusesForPromotions,
  CMS_BONUS_RESULT_ID,
  BONUS_CALL_SYMBOL,
);

const isNotDraggableChildForParentSelector = (state: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
  Boolean(customExtensionsSelector(state, formName, getParentPath(fieldPath)).isNotDraggableChild);

const conditionForDragIconSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const def = selectFieldDef(state, formName, path);
  const parentPath = getParentPath(path);
  const parentDef = selectFieldDef(state, formName, parentPath);
  const parentValue = selectFieldValue(state, formName, parentPath);
  // we check that parent def have draggable child elements,
  const isDraggableChildForParentDef = !isNotDraggableChildForParentSelector(state, formName, path);

  // we check that parent def type is list,
  // we check that def and parent def have child with list type,
  const isListChildForDef = def.extensions[CMS_EXTENSION_KEY].customExtensions.listChild;
  const isListChildForParentDef = isListDef(parentDef) && parentDef.fields.extensions[CMS_EXTENSION_KEY].customExtensions.listChild;

  // we check that parent value is array, and it has length below that one
  return Boolean(isDraggableChildForParentDef &&
    (isListChildForDef ||
      (isListChildForParentDef && (isArray(parentValue) && parentValue.length > 1))
    ));
};

const blockSucceededSelector = callManagerSucceededSelector.with.symbol(BLOCK_CALL_SYMBOL);

const metaContentSucceededSelector = callManagerSucceededSelector.with.symbol(META_CONTENT_CALL_SYMBOL);

const cmsPagesWasSucceededSelector = withParams(callManagerWasSucceededSelector, PAGES_CALL_SYMBOL);

const getOnePlatformBonusSelector = createOrmSelector(
  (bonusId: string) => deferGetOne<TPlatform_Bonus_Record>({
    what: EAdminUIRecordName.platformBonus,
    id: bonusId,
  }),
);
//возможно бонус был не синхронизированно удален из Bonuses. (в блоке cms id хранится как value).
//поддержать синхронизированное удаление - походу анрил
const findOnePlatformBonusSelector = createOrmSelector(
  (bonusId: string) => deferFindOne<TPlatform_Bonus_Record>({
    what: EAdminUIRecordName.platformBonus,
    id: bonusId,
  }),
);

const isNilBonusSelector = createSimpleSelector([findOnePlatformBonusSelector], isNil);

const getManyPlatformBonusesShownForPlayersSelector = createOrmSelector(
  (maxLength: number) => deferGetMany<TPlatform_Bonus_Record>({
    what: EAdminUIRecordName.platformBonus,
    field: "isShownForPlayers",
    value: true,
    length: {
      max: maxLength,
    },
  }),
);

const shownBonusesForPlayerSelector = (state: TCmsAppState) => {
  const bonusIds = platformBonusesForPromotionsIdsSelector(state);

  return getManyPlatformBonusesShownForPlayersSelector(state, bonusIds.length);
};

const bonusPropertySelectors = createPropertySelectors(getOnePlatformBonusSelector);

const getTranslateByLocaleOrFirstNonNullableTranslateSelector =
  (state: TCmsAppState, arr: IMultilang[], appServiceLocaleSelector: TLocaleSelector) => {
    const currentLocale = appServiceLocaleSelector(state);

    return getCorrectTranslate(arr, currentLocale);
  };

const getOneBlockByBlockTypeSelector = (state: IWithOrmState, blockType: string) => {
  const blockList = findManyBlockContentByBlockTypeSelector(state, blockType);

  if (isVoid(blockList)) {
    return null;
  }

  return blockList[0];
};

const findManyBlockContentByPageIdSelector = createOrmSelector(
  (pageId: string) => deferFindMany<TCms_Block_Record>({
    what: ECmsRecordName.cmsBlock,
    value: pageId,
    field: "pageId",
  }),
);

const findManyBlockContentByBlockTypeSelector = createOrmSelector(
  (blockType: string) => deferFindMany<TCms_Block_Record>({
    what: ECmsRecordName.cmsBlock,
    value: blockType,
    field: "blockType",
  }),
);

const getOneVariableByIdSelector = createOrmSelector(
  (variableId: string) => deferGetOne<TCms_Variable_Fragment>({
    what: ECmsRecordName.cmsVariable,
    id: variableId,
  }),
);

const cmsVariablesIdsSelector = (state: TCmsAppState) =>
  loadedResultIdsSelector(
    state,
    ECmsRecordName.cmsVariablesQueryResult,
    CMS_VARIABLE_TABLE_COMMON_PAGINATOR_NAME,
    VARIABLE_TABLE_COMMON_LOADER_SYMBOL,
  );

const getAllNotDeletedVariablesSelector = createMemoSelector(
  (state: TCmsAppState) => cmsVariablesIdsSelector(state).map((id) => getOneVariableByIdSelector(state, id)),
  { resultEqual: "deepEqual" },
);

const getAllNotDeletedVariablesKeySelector = createMemoSelector(
  [
    getAllNotDeletedVariablesSelector,
  ],
  (variables) => Object.values(variables).map(({ key }) => key),
);

const getOneBlockByPageIdSelector = (state: IWithOrmState, pageId: string) => {
  const blockList = findManyBlockContentByPageIdSelector(state, pageId);
  if (blockList.length > 1) {
    throw new Error(`page with id "${pageId}" have not one block`);
  }

  return blockList[0];
};

const getOneMetaContentByPageIdSelector = createOrmSelector(
  (pageId: string) => deferFindOne<Omit<TCms_PageMetaContent_Fragment, "metaTags" | "image"> & { imageId: string; }>({
    what: ECmsRecordName.cmsPageMetaContent,
    id: pageId,
  }),
);

const getMetaContentImageIdSelector = (state: TCmsAppState, id: string) => {
  const metaContentWithoutIconAndMetaTags = getOneMetaContentByPageIdSelector(state, id);

  return isNil(metaContentWithoutIconAndMetaTags) ? null : metaContentWithoutIconAndMetaTags.imageId;
};

const getMetaContentPageTitleSelector = (state: TCmsAppState, id: string) => {
  const metaContentWithoutIconAndMetaTags = getOneMetaContentByPageIdSelector(state, id);

  return isNil(metaContentWithoutIconAndMetaTags) ? null : metaContentWithoutIconAndMetaTags.pageTitle;
};

const getSubFormStateBlockSelector = createMemoSelector(
  combineSelectors(
    [
      getOneBlockContentByBlockIdSelector,
      deleteNoValidFieldHelper,
    ],
    (
      formName: string,
      value: TFieldValue,
      path: TFieldPath,
      blockId: string,
    ) =>
      [[blockId], [formName, value, path]] as const,
  ),
  (notNullBlock, validContent) => {
    const content = notNullBlock.content;

    if (isNotNil(content)) {
      const disabledMap = DISABLED_FIELD in content ? { [DISABLED_FIELD]: content[DISABLED_FIELD] } : {};

      return ({
        [BLOCK_CONTENT]: {
          ...validContent,
          [FILES_FIELD]: {
            files: notNullBlock.imageIds?.map((id) => ({ id })) ?? EMPTY_ARRAY,
          },
        },
        [BLOCK_TYPE]: notNullBlock.blockType,
        [BLOCK_ID]: notNullBlock.id,
        ...disabledMap,
      });
    }

    return {};
  },
);

const fileByFileIdSelector = createOrmSelector(
  (fileId) => deferFindOne<TFileDto>({
    what: ERecordName.file,
    id: fileId,
  }),
);

// const metaTagByIdSelector = createOrmSelector(
//   (id) => deferGetOne<TFileDto>({
//     what: ECmsRecordName.cmsTranslateMap,
//     id: id,
//   }),
// );

const getMetaContentMetaTagsSelector = (
  state: TCmsAppState,
  id: string,
) => {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const metaContentWithoutIconAndMetaTags = getOneMetaContentByPageIdSelector(state, id);
  //todo ds оно все равно не работает фикс в некст мр будет
  //   : metaContentWithoutIconAndMetaTags?.metaTagsIds.map((id) => metaTagByIdSelector(state, id));

  return null;
}
;

const getMetaContentAndFileByPageIdSelector = createMemoSelector(
  combineSelectors(
    [
      (_, id: string) => id,
      getMetaContentPageTitleSelector,
      getMetaContentMetaTagsSelector,
    ],
    (id: string, v2: string) => [[id], [v2], [v2]] as const,
  ),
  (id, pageTitle, metaTags) => {
    const description = getCorrectMultilang(pageTitle);
    const title = isNotVoid(description) ? { title: { description } } : {};
    const logoImage = id
      ? {
        logoImage: {
          image: {
            files: [
              permanentFileToFormValue(id),
            ],
          },
        },
      }
      : {};

    const content = getCorrectMetaTags(metaTags);

    const metaTagContentList = isNotVoid(content) ? { metaTagContentList: { content } } : {};

    return {
      ...title,
      ...logoImage,
      ...metaTagContentList,
    };
  },
);

const isContentExistSelector = (state: TCmsAppState, formName: string, fieldPath: TFieldPath) => {
  const value = selectFieldValue(state, formName, fieldPath);

  return isNotVoid(value);
};

const projectCodeMap: Record<TFormNames, TProjectCode> = {
  [CMS_PLATFORM_FORM_NAME]: "PLATFORM",
  [CMS_AFFILIATE_FORM_NAME]: "AFFILIATE",
};

const getProjectCodeByFormName = (formName: string): TProjectCode => {
  const projectCode = isCorrectFormName(formName) ? projectCodeMap[formName] : null;

  return getNotNil(projectCode, ["CMS", "getProjectCodeByFormName"], `FormName: "${formName}" doesnt exist in definitions`);
};

const getBlockIdSelector =
  (state: TCmsAppState, formName: string, fieldPath: TFieldPath, pageId: TNullable<string>, blockType: TNullable<string>) => {
    const blockIdPath = pageId ? fieldPath.concat(PAGE_CONTENT, BLOCK_ID) : fieldPath.concat(BLOCK_ID);

    if (isNotNil(pageId)) {
      const idFromOrm = getOneBlockByPageIdSelector(state, pageId)?.id;

      if (isNotNil(idFromOrm)) {
        return idFromOrm;
      }

      const idFromState = selectFieldValue<string>(state, formName, blockIdPath);

      return idFromState ?? uuid4();
    }

    if (isNotNil(blockType)) {
      const idFromOrm = getOneBlockByBlockTypeSelector(state, blockType)?.id;

      if (isNotNil(idFromOrm)) {
        return idFromOrm;
      }

      const idFromState = selectFieldValue<string>(state, formName, blockIdPath);

      return idFromState ?? uuid4();
    }

    throw new Error("[CMS, getBlockIdSelector], \"pageId\" and \"blockType\" cannot be null both");
  };

const blockTypeSelector = (state: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
  getNotNil(customExtensionsSelector(state, formName, fieldPath)[BLOCK_TYPE], ["blockTypeSelector"], BLOCK_TYPE);

const versionSelector = (state: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
  getNotNil(
    customExtensionsSelector(state, formName, fieldPath)[VERSION],
    ["blockTypeSelector"],
    VERSION,
  );

const customExtensionsSelector = (state: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
  getNotNil(
    selectFieldDefExtension<ICMSExtensions>(state, formName, fieldPath, CMS_EXTENSION_KEY)?.customExtensions,
    ["customExtensionsSelector"],
    "customExtensions",
  );

const pushBlockSelector = (
  state: TCmsAppState,
  {
    payload: {
      fieldPath,
      activeTab,
    },
    metadata: { formName },
  }: {
    payload: ReturnType<typeof pushBlockAction>["payload"];
    metadata: ReturnType<typeof pushBlockAction>["metadata"];
  },
): TCallPayload<typeof call_UpdateCmsBlockCommand> => {
  const projectCode = getProjectCodeByFormName(formName);

  const isPage = activeTab === EBlockTypeMap.PAGES;

  const path = isPage ? [...fieldPath, PAGE_CONTENT] : fieldPath;

  const pathToFile = getFileIdsPath(fieldPath, activeTab);

  const pageId = isPage
    ? getNotNil(selectFieldValue<IData>(state, formName, fieldPath)?.[pageIdConst], ["pushBlockSelector"], "pageId")
    : null;

  const pushState = selectFieldValue<IBlockGeneralFields>(state, formName, path);

  const blockType = blockTypeSelector(state, formName, path);

  const id = getNotNil(
    getBlockIdSelector(state, formName, fieldPath, pageId, blockType),
    ["CMS", "pushBlockSelector"],
    "id",
  );

  const correctBlockVersion = versionSelector(state, formName, path);

  if (isNil(pushState)) {
    return {
      blockType,
      blockVersion: correctBlockVersion,
      files: {},
      content: JSON.stringify({}),
      pageId,
      id,
      projectCode,
    };
  }
  const fileIds = selectFieldValue<IFiles>(state, formName, pathToFile) ?? { files: [] };

  const content = omit([FILES_FIELD], { ...pushState.blockContent, [DISABLED_FIELD]: pushState[DISABLED_FIELD] });

  const contentWithCorrectIds = normalizedPushedContent(state, content);

  const filesUuid = getFilesUuidSelector(state, fileIds);

  let stringifyContent = JSON.stringify(contentWithCorrectIds);

  for (const { id } of fileIds.files) {
    stringifyContent = stringifyContent.replace(
      id,
      (temporaryId) => {
        const temporaryFile = fileServiceSelectors[EFileStateType.temporary](state)[temporaryId];

        return isNotNil(temporaryFile) ? temporaryFile.id : temporaryId;
      },
    );
  }

  const existedFilesIds = filesUuid.filter((id) => stringifyContent.includes(id));

  const existedFiles = getExistedFilesSelector(state, fileIds, existedFilesIds);

  return {
    blockType,
    blockVersion: correctBlockVersion,
    files: existedFiles,
    content: stringifyContent,
    pageId,
    id,
    projectCode,
  };
};

const pushImportedBlockSelector = (
  state: TCmsAppState,
  {
    payload: {
      fieldPath,
      activeTab,
      content,
    },
    metadata: { formName },
  }: ReturnType<typeof pushImportedBlockAction>,
): TCallPayload<typeof call_UpdateCmsBlockCommand> => {
  const projectCode = getProjectCodeByFormName(formName);

  const isPage = activeTab === EBlockTypeMap.PAGES;

  const path = isPage ? [...fieldPath, PAGE_CONTENT] : fieldPath;

  const pageId = isPage
    ? getNotNil(selectFieldValue<IData>(state, formName, fieldPath), ["pushImportedBlockSelector"], "page")[pageIdConst]
    : null;

  const blockType = blockTypeSelector(state, formName, path);

  const id = getNotNil(
    getBlockIdSelector(state, formName, fieldPath, pageId, blockType),
    ["CMS", "pushBlockSelector"],
    "id",
  );
  const correctBlockVersion = versionSelector(state, formName, path);

  return {
    blockType,
    blockVersion: correctBlockVersion,
    files: {},
    content,
    pageId,
    id,
    projectCode,
  };
};

const getExistedFilesSelector = (state: TCmsAppState, fileIds: IFiles, existedFilesIds: string[]) =>
  fileIds.files.reduce<Record<string, TFileDto>>(
    (acc, { id }) => {
      const temporaryFile = fileServiceSelectors[EFileStateType.temporary](state)[id];

      if (isNotNil(temporaryFile) && existedFilesIds.includes(temporaryFile.id)) {
        acc[temporaryFile.id] = temporaryFile;

        return acc;
      }

      const permanentFile = fileByFileIdSelector(state, id);

      if (isNotNil(permanentFile) && existedFilesIds.includes(permanentFile.id)) {
        acc[id] = permanentFile;

        return acc;
      }

      return acc;
    },
    {},
  );

const getFilesUuidSelector = (state: TCmsAppState, fileIds: IFiles) => fileIds.files.reduce<string[]>(
  (acc, { id }) => {
    const temporaryFile = fileServiceSelectors[EFileStateType.temporary](state)[id];

    if (isNotNil(temporaryFile)) {
      return acc.concat(temporaryFile.id);
    } else {
      const permanentFile = fileByFileIdSelector(state, id);

      if (isNotNil(permanentFile)) {
        return acc.concat(permanentFile.id);
      }
    }

    return acc;
  },
  [],
);

type TMetaPageContentPayload = TCallPayload<typeof call_UpdateCmsPageMetaContentCommand>

const pushMetaContentSelector = (
  state: TCmsAppState,
  {
    payload: { fieldPath },
    metadata: { formName },
  }: ReturnType<typeof pushMetaContentAction>,
): TMetaPageContentPayload => {
  const metaContentValue = selectFieldValue<IMetaContent>(state, formName, getMetaPageContentPath(fieldPath));
  const id = selectFieldNotNilValue<string>(state, formName, [...fieldPath, PAGE_ID]);
  //todo ds .metaTagContentList;

  return ({
    ...normalizedMetaContent(metaContentValue ?? {}),
    pageId: id,
  });
};

const subFormValidationSelector = (state: TCmsAppState, formName: string, fieldPath: TFieldPath, activeTab: EBlockTypeMap) => {
  const paths = activeTab === EBlockTypeMap.VARIABLES
    ? getFormFieldPaths(state, formName, [VARIABLES])
    : getFormFieldPaths(state, formName, fieldPath);

  let isValid = true;

  for (const path of paths) {
    if (!path.includes(BLOCK_CONTENT)) {
      continue;
    }

    const validation = selectFieldMetaValidationExtension(state, formName, path);

    if (isNil(validation) || validation.isValid) {
      continue;
    }
    if (!validation.isValid) {
      const meta = selectFieldMeta(state, formName, path) ?? {};
      // system field startWith "@", we check, if we have no system field, it's subForm, not field, and we need go deeper
      if (keys(meta).findIndex((key) => !key.startsWith("@")) !== -1) {
        continue;
      }
      isValid = false;

      return false;
    }
  }

  return isValid;
};

const getRequiredSelector = (state: TCmsAppState, formName: string, path: TFieldPath) =>
  customExtensionsSelector(state, formName, path).required;

const getMaxCountSelector = (state: IWithFormsState, formName: string, path: TFieldPath) =>
  customExtensionsSelector(state, formName, path).maxCount ?? Infinity;

const getListLengthSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const value = selectFieldValue(state, formName, KindService.getPathWithoutKinds(path));

  if (isNil(value)) {
    return 0;
  }

  if (!isArray(value)) {
    return null;
  }

  return value.length;
};

const isMaxListElementsSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const listLength = getListLengthSelector(state, formName, path);
  const maxCount = getMaxCountSelector(state, formName, path);

  return !isNumber(listLength) || !(listLength < maxCount);
};

const getContainerTitleSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const cmsExtension = selectFieldDefExtension<ICMSExtensions>(state, formName, path, CMS_EXTENSION_KEY);

  return cmsExtension?.containerTitle;
};

const getOneOfDescriptionSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const cmsExtension = selectFieldDefExtension<ICMSExtensions>(state, formName, path, CMS_EXTENSION_KEY);

  return cmsExtension?.oneOfDescription;
};

const getContainerTitleForListSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const def = selectFieldDef(state, formName, path);

  const title = isListDef(def)
    ? def.fields.extensions[CMS_EXTENSION_KEY].containerTitle
    : def.extensions[CMS_EXTENSION_KEY].containerTitle;

  return isString(title) && isCmsTKeyApp(title) ? title : null;
};

const isListDefSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const def = selectFieldDef(state, formName, path);

  return isListDef(def);
};

const isGamesIds = (candidate: TCms_LabelOrGameIds_Union_Fragment | null): candidate is TCms_GameIdsContent_Type_Fragment =>
  isAnyObject(candidate) && candidate._HIDDEN_FIELD_ === "Block_games";

const landingNormalizedGamesIdsSelector = createMemoSelector(
  [
    selectFieldValue.type<TCms_ThemeTwo_Landing_BlockContent_Fragment>(),
  ],
  (value) => {
    const ids = value?.listWithLabelsOrGames?.content?.map((it) =>
      it?.labelOrGames?.content?.map((it) => isGamesIds(it) ? it.gameIds : [])).flat(4);
    if (!isArray(ids)) {
      return [];
    }

    return uniqueArray(ids).filter(isNotNil);
  },
);

const validBlockContentSelector = createMemoSelector(
  (state: TCmsAppState, formName: string, path: TFieldPath, block: TCms_Block_Record) => {
    const initialState = getInitialState(block.content ?? {});

    const validContent = deleteNoValidFieldHelper(state, formName, initialState, path);

    const metaContentPath = path.concat(META_CONTENT);

    const metaContent = selectFieldValue(state, formName, metaContentPath);

    const metaContentWrapper = isNotVoid(metaContent)
      ? {
        [META_CONTENT]: metaContent,
      }
      : {};

    return ({
      [BLOCK_CONTENT]: {
        ...validContent,
        ...metaContentWrapper,
        [FILES_FIELD]: {
          files: block.imageIds?.map((id) => ({ id })) ?? EMPTY_ARRAY,
        },
      },
      [BLOCK_TYPE]: block.blockType,
      [BLOCK_ID]: block.id,
    });
  },
  {
    resultEqual: "deepEqual",
  },
);

const getPageIdByPageTypeSelector = (state: TCmsAppState, pageType: string) => {
  const pageIds = cmsPageIdsSelector(state);

  return pageIds.find((id) => getCmsPageByPageIdSelector(state, id).pageType === pageType);
};

const childPageIdByPathSelector = (state: TCmsAppState, path: TFieldPath) => {
  const parentPath = path.slice(0, -2);
  const pageIndex = Number(path.at(-1));
  const parentPageType = PathPageTypeMap[getIdByPath(parentPath) as ERootPages];
  const parentPageId = getPageIdByPageTypeSelector(state, parentPageType);
  const pageIds = cmsPageIdsSelector(state);
  const correctChildPages = pageIds.reduce<Required<TCms_Page_Fragment>[]>(
    (acc, pageId) => {
      const page = getCmsPageByPageIdSelector(state, pageId);

      // in some envs we have bug, when infoPage have childInfoPage type
      if (isNil(parentPageId)) {
        if (isNotNil(page.parentPageId) && page.pageType === EPageType.childInfoPage) {
          if (page) {
            acc.push(page);
          }
        }

        return acc;
      }
      if (page.parentPageId === parentPageId) {
        acc.push(page);
      }

      return acc;
    },
    [],
  );

  return sort(sortedByPriority, correctChildPages)[pageIndex]?.id;
};

const dragDropOffsetSelector = (state: TCmsAppState, appServiceScaleSelector: TScaleSelector) => {
  const scale = appServiceScaleSelector(state);

  return scale === "1"
    ? EMPTY_OBJECT
    : ({
      offsetY: 20,
      offsetX: 35,
    });
};

const isMetaContentDefExistSelector = (state: TCmsAppState, formName: string, path: TFieldPath) =>
  customExtensionsSelector(state, formName, path).withMetaContent;

const getBlockTitleSelector = (state: TCmsAppState, formName: string, path: TFieldPath) =>
  customExtensionsSelector(state, formName, path).blockTitle;

const isWithoutWrapperSelector = (state: TCmsAppState, formName: string, path: TFieldPath) =>
  customExtensionsSelector(state, formName, path).simpleConfig?.withoutWrapper;

const isSimpleFormSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const cmsExtension = selectFieldDefExtension<ICMSExtensions>(state, formName, path, CMS_EXTENSION_KEY);

  return cmsExtension?.simpleForm;
};

const isListByComponentTypeSelector = (state: TCmsAppState, formName: string, path: TFieldPath) => {
  const cmsExtension = selectFieldDefExtension<ICMSExtensions>(state, formName, path, CMS_EXTENSION_KEY);

  return cmsExtension?.componentType === EComponentsType.listContainer;
};

const hiddenFieldSelector = (state: TCmsAppState, formName: string, path: TFieldPath) =>
  selectFieldValue<string>(state, formName, path.concat(_HIDDEN_FIELD_));

const componentPropsSelector = <
  T extends EComponentsType = EComponentsType
>(def: TFieldDef) => def
  .extensions[CMS_EXTENSION_KEY]
  .customExtensions?.simpleConfig?.componentProps as TComponentsPropsMap[T];

export {
  componentPropsSelector,
  shownBonusesForPlayerSelector,
  bonusPropertySelectors,
  getOneOfDescriptionSelector,
  isListByComponentTypeSelector,
  isMaxListElementsSelector,
  hiddenFieldSelector,
  isSimpleFormSelector,
  isWithoutWrapperSelector,
  getBlockTitleSelector,
  getListLengthSelector,
  getMaxCountSelector,
  getAllNotDeletedVariablesKeySelector,
  isContentExistSelector,
  isMetaContentDefExistSelector,
  getContainerTitleForListSelector,
  getContainerTitleSelector,
  dragDropOffsetSelector,
  childPageIdByPathSelector,
  validBlockContentSelector,
  landingNormalizedGamesIdsSelector,
  getRequiredSelector,
  getTranslateByLocaleOrFirstNonNullableTranslateSelector,
  getSubFormStateBlockSelector,
  subFormValidationSelector,
  blockSucceededSelector,
  pushMetaContentSelector,
  getMetaContentAndFileByPageIdSelector,
  cmsPagesWasSucceededSelector,
  getMetaContentImageIdSelector,
  getOneBlockByPageIdSelector,
  isNotDraggableChildForParentSelector,
  getOneBlockByBlockTypeSelector,
  conditionForDragIconSelector,
  isListDefSelector,
  metaContentSucceededSelector,
  pushBlockSelector,
  pushImportedBlockSelector,
  getPageIdByPageTypeSelector,
  isNilBonusSelector,
};
