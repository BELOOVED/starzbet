import { isNil, isNotEmpty, isNumber, isVoid, simpleReducer, type TExplicitAny } from "@sb/utils";
import { BLOCK_CONTENT, EPlatformBlockMap, VARIABLES } from "@sb/cms-core";
import { assocPath } from "@sb/utils/AssocPath";
import type { TFile_Fragment, TTranslateRecord_Fragment } from "@sb/graphql-client";
import { callManagerSucceeded, type TWithCallManagerState } from "@sb/call-manager";
import type {
  TCms_GameIdsWithImageContent_Type_Fragment,
  TCms_Image_Type_Fragment,
  TCms_LabelOrGameIds_Union_Fragment,
  TCms_LabelOrGameWithImageIds_Union_Fragment,
  TCms_MultiLang_Type_Fragment,
} from "@sb/graphql-client/CmsUI";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { landingImageByFragmentSelector, landingTitleByFragmentSelector } from "../../Landing/LandingSelectors";
import { type TWithLandingState } from "../../Landing/LandingInitialState";
import {
  type cmsBlocksAction,
  type cmsFilesReceivedAction,
  type cmsMetaContentAction,
  type cmsPageContentReceivedAction,
  type cmsPagesAction,
  type cmsPredefinedPagesAction,
  type cmsVariablesAction,
} from "../CMSAction";
import { META_CONTENT } from "../Model/CmsConstants";
import { CMS_BLOCKS_SYMBOL } from "../Model/CmsSymbols";
import { getListWithLabelsOrGamesIds } from "../Utils/Helpers";
import { cmsLandingBlockGameIdsSelector, cmsLandingBlockLabelsOrGamesSelector } from "../Selectors/LandingSelectors/CMSLandingSelectors";
import { type ICmsWrapperState, type TContent } from "../Model/CmsModel";

const cmsPagesContentReducer = simpleReducer(["content"], ["CMS", "content"]);

const cmsPromotionPageReducer = simpleReducer(["promotionPage"], ["CMS", "promotionPage"]);

const cmsPromotionPageSearchValueReducer = simpleReducer(["searchValue"], ["CMS", "promotionPage", "searchValue"]);

const cmsPromotionPageActivePromoReducer = simpleReducer(["activePromo"], ["CMS", "promotionPage", "activePromo"]);

const cmsPromotionPageActiveTagsReducer = simpleReducer(["activeTags"], ["CMS", "promotionPage", "activeTags"]);

const fileReducer = <T extends TContent, S extends ICmsWrapperState<T>>(state: S, files: TFile_Fragment[] | null): S => {
  if (isVoid(files)) {
    return state;
  }

  return {
    ...state,
    CMS: {
      ...state.CMS,
      content: {
        ...state.CMS.content,
        files: {
          ...state.CMS.content.files,
          ...files.reduce(
            (acc, value) => ({
              ...acc,
              [value.id]: value,
            }),
            {},
          ),
        },
      },
      // Remove alias, when finish CMS in Starzbet
    },
  };
};

const cmsBlocksReducer = <T extends TContent, S extends ICmsWrapperState<T> & TWithLandingState & TWithCallManagerState>(
  state: S,
  { payload: { blockType, content, images } }: ReturnType<typeof cmsBlocksAction>,
): S => {
  let nextState = {
    ...state,
    CMS: {
      ...state.CMS,
      content: {
        ...state.CMS.content,
        [BLOCK_CONTENT]: {
          ...state.CMS.content[BLOCK_CONTENT],
          [blockType]: { ...content, isServerLoaded: false },
        },
      },
      // Remove alias, when finish CMS in Starzbet
    } as TExplicitAny,
  };

  if (blockType === EPlatformBlockMap.LANDING) {
    const vipTablesLabel = content?.__typename === "ThemeSix_Landing_BlockContent"
      ? content.vipTables?.label?.labelId
      : undefined;

    nextState.CMS.content.vipTablesLabel = vipTablesLabel;

    const listWithLabelOrGameIds = cmsLandingBlockLabelsOrGamesSelector(nextState)?.content;
    const correctIds = getListWithLabelsOrGamesIds<
      TCms_LabelOrGameIds_Union_Fragment | TCms_GameIdsWithImageContent_Type_Fragment | TCms_LabelOrGameWithImageIds_Union_Fragment
    >(listWithLabelOrGameIds,
    );

    if (isVoid(correctIds)) {
      return nextState;
    }

    const gamesMap: Record<number, {
      title: TTranslateRecord_Fragment[] | undefined | (TCms_MultiLang_Type_Fragment | null)[] | null;
      gameIds: string[];
      labelId: string | null | undefined;
      pageInfo: undefined;
      count: number;
      loaded: {
        gameIds: [];
        pageInfo: null;
      };
      image: TCms_Image_Type_Fragment | null;
    }> = {};

    const layout: number[][] = [];

    let gamesIndex = 0;

    correctIds.forEach((labelOrGamesList) => {
      if (isVoid(labelOrGamesList)) {
        return;
      }

      const row: number[] = [];

      labelOrGamesList.forEach(
        (fragment) => {
          if (isNil(fragment)) {
            return;
          }

          const gameIds = cmsLandingBlockGameIdsSelector(state, fragment);
          const title = landingTitleByFragmentSelector(state, fragment);

          const labelId = fragment.__typename === "LabelsListContent_Type" ||
          fragment.__typename === "LabelsListWithImageContent_Type"
            ? fragment.labelId
            : undefined;

          gamesMap[gamesIndex] = {
            image: landingImageByFragmentSelector(fragment),
            title,
            labelId,
            gameIds,
            pageInfo: undefined,
            count: labelOrGamesList.length,
            loaded: {
              gameIds: [],
              pageInfo: null,
            },
          };

          row.push(gamesIndex);

          gamesIndex = ++gamesIndex;
        },
      );

      layout.push(row);
    });

    if (isNotEmpty(gamesMap)) {
      nextState = {
        ...nextState,
        CMS: {
          ...state.CMS,
          content: {
            ...state.CMS.content,
            vipTablesLabel,
            cmsGames: {
              gamesMap,
              layout,
            },
          },
          // Remove alias, when finish CMS in Starzbet
        } as TExplicitAny,
      };
    }
  }

  return callManagerSucceeded(
    fileReducer(
      nextState,
      images,
    ),
    CMS_BLOCKS_SYMBOL,
    blockType,
  );
};

const cmsFilesReducer = (
  state: TMixAppState,
  action: ReturnType<typeof cmsFilesReceivedAction>,
): TMixAppState => fileReducer(state, action.payload);

const cmsPagesReducer = (
  state: TMixAppState,
  action: ReturnType<typeof cmsPagesAction>,
): TMixAppState => ({
  ...state,
  CMS: {
    ...state.CMS,
    content: {
      ...state.CMS.content,
      pages: action.payload,
    },
    // Remove alias, when finish CMS in Starzbet
  } as TExplicitAny,
});

const cmsVariablesReducer = (
  state: TMixAppState,
  action: ReturnType<typeof cmsVariablesAction>,
): TMixAppState => ({
  ...state,
  CMS: {
    ...state.CMS,
    content: {
      ...state.CMS.content,
      [VARIABLES]: {
        nodes: [
          ...state.CMS.content[VARIABLES].nodes,
          ...action.payload,
        ],
        isServerLoaded: false,
      },
    },
    // Remove alias, when finish CMS in Starzbet
  } as TExplicitAny,
});

const cmsPredefinedPagesReducer = (
  state: TMixAppState,
  action: ReturnType<typeof cmsPredefinedPagesAction>,
): TMixAppState => ({
  ...state,
  CMS: {
    ...state.CMS,
    content: {
      ...state.CMS.content,
      predefinedPages: action.payload,
    },
    // Remove alias, when finish CMS in Starzbet
  } as TExplicitAny,
});

const cmsMetaContentReducer = (
  state: TMixAppState,
  action: ReturnType<typeof cmsMetaContentAction>,
): TMixAppState => ({
  ...state,
  CMS: {
    ...state.CMS,
    content: {
      ...state.CMS.content,
      [META_CONTENT]: [
        ...action.payload,
      ],
    },
    // Remove alias, when finish CMS in Starzbet
  } as TExplicitAny,
});

const cmsPageContentReducer = (
  state: TMixAppState,
  action: ReturnType<typeof cmsPageContentReceivedAction>,
): TMixAppState => ({
  ...state,
  CMS: {
    ...state.CMS,
    content: {
      ...state.CMS.content,
      pagesContent: {
        ...state.CMS.content.pagesContent,
        [action.payload.id]: action.payload.content,
      },
    },
    // Remove alias, when finish CMS in Starzbet
  } as TExplicitAny,
});

interface IPayload {
  type: EModal;
  data: number | null;
}

const addActivePromoReducer = (state: TMixAppState, { payload }: { payload: IPayload; }) => {
  const { type, data } = payload;
  if (type !== EModal.cmsPromo || !isNumber(data)) {
    return state;
  }

  return assocPath(["CMS", "promotionPage", "activePromo"], data, state);
};

export {
  addActivePromoReducer,
  cmsMetaContentReducer,
  cmsPredefinedPagesReducer,
  cmsPageContentReducer,
  cmsVariablesReducer,
  cmsPagesReducer,
  cmsFilesReducer,
  cmsBlocksReducer,
  cmsPagesContentReducer,
  cmsPromotionPageActivePromoReducer,
  cmsPromotionPageSearchValueReducer,
  cmsPromotionPageActiveTagsReducer,
  cmsPromotionPageReducer,
};
