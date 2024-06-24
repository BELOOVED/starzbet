import type { TCms_BlockContent_Fragment } from "@sb/graphql-client/CmsUI";
import type { TPlatform_Game_Fragment, TPlatform_GameLabel_Fragment, TPlatform_GamePageInfo_Fragment } from "@sb/graphql-client/PlayerUI";
import type { TFile_Fragment } from "@sb/graphql-client";
import { type EPlatformBlockMap } from "@sb/cms-core";

const cmsPagesContentAction = (content) => ({
  type: "@CMS/CONTENT_RECEIVED",
  payload: { content },
});

const cmsBlocksAction = (
  content: TCms_BlockContent_Fragment & { updatedAt?: string; } | null,
  blockType: EPlatformBlockMap,
  images: TFile_Fragment[] | null,
) => ({
  type: "@CMS/BLOCKS_RECEIVED",
  payload: {
    content,
    blockType,
    images,
  },
});

const cmsMetaContentAction = (content) => ({
  type: "@CMS/META_CONTENT_RECEIVED",
  payload: content,
});

const cmsVariablesAction = (content) => ({
  type: "@CMS/VARIABLES_RECEIVED",
  payload: content,
});

const cmsPagesAction = (content) => ({
  type: "@CMS/PAGES_RECEIVED",
  payload: content,
});

const cmsPredefinedPagesAction = (content) => ({
  type: "@CMS/PREDEFINED_PAGES_RECEIVED",
  payload: content,
});

const cmsPageContentReceivedAction = (content, id) => ({
  type: "@CMS/PAGE_CONTENT_RECEIVED",
  payload: {
    content,
    id,
  },
});

const cmsFilesReceivedAction = (content: TFile_Fragment[] | null) => ({
  type: "@CMS/FILES_RECEIVED",
  payload: content,
});

const cmsPromotionPageAction = (promotionPage) => ({
  type: "@CMS/PROMOTION_PAGE",
  payload: { promotionPage },
});

const cmsPromotionPageSearchValueAction = (searchValue) => ({
  type: "@CMS/PROMOTION_PAGE_SEARCH_VALUE",
  payload: { searchValue },
});

const cmsPromotionPageActivePromoAction = (activePromo: number | null) => ({
  type: "@CMS/PROMOTION_PAGE_ACTIVE_PROMO",
  payload: { activePromo },
});

const cmsPromotionPageActiveTagsAction = (activeTags) => ({
  type: "@CMS/PROMOTION_PAGE_ACTIVE_TAGS",
  payload: { activeTags },
});

const cmsGamesByLabelIdsReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment,
  id: string,
  index: number,
) => ({
  type: "@CMS_LANDING/GAMES_BY_LABEL_IDS_RECEIVED",
  payload: {
    games,
    pageInfo,
    id,
    index,
  },
});

const cmsGamesByIdsReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment,
  index: number,
) => ({
  type: "@CMS_LANDING/GAMES_BY_IDS_RECEIVED",
  payload: { games, pageInfo, index },
});

const labelsReceivedAction = (
  labels: TPlatform_GameLabel_Fragment[],
) => ({
  type: "@CMS_LANDING/LABEL_RECEIVED",
  payload: { labels },
});

const cmsLoadMoreGames = (index: number) => ({
  type: "@CMS_LANDING/LOAD_MORE_GAMES",
  payload: {
    index,
  },
});

export {
  cmsGamesByLabelIdsReceivedAction,
  cmsGamesByIdsReceivedAction,
  cmsPromotionPageActivePromoAction,
  labelsReceivedAction,
  cmsMetaContentAction,
  cmsPredefinedPagesAction,
  cmsVariablesAction,
  cmsPageContentReceivedAction,
  cmsPagesAction,
  cmsFilesReceivedAction,
  cmsBlocksAction,
  cmsPagesContentAction,
  cmsPromotionPageSearchValueAction,
  cmsPromotionPageActiveTagsAction,
  cmsPromotionPageAction,
  cmsLoadMoreGames,
};
