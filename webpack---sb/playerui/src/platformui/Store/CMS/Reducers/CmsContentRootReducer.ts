import { createRootReducer } from "@sb/utils";
import { modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import {
  cmsBlocksAction,
  cmsFilesReceivedAction,
  cmsGamesByIdsReceivedAction,
  cmsGamesByLabelIdsReceivedAction,
  cmsMetaContentAction,
  cmsPageContentReceivedAction,
  cmsPagesAction,
  cmsPagesContentAction,
  cmsPredefinedPagesAction,
  cmsPromotionPageAction,
  cmsPromotionPageActivePromoAction,
  cmsPromotionPageActiveTagsAction,
  cmsPromotionPageSearchValueAction,
  cmsVariablesAction,
  labelsReceivedAction,
} from "../CMSAction";
import {
  addActivePromoReducer,
  cmsBlocksReducer,
  cmsFilesReducer,
  cmsMetaContentReducer,
  cmsPageContentReducer,
  cmsPagesContentReducer,
  cmsPagesReducer,
  cmsPredefinedPagesReducer,
  cmsPromotionPageActivePromoReducer,
  cmsPromotionPageActiveTagsReducer,
  cmsPromotionPageReducer,
  cmsPromotionPageSearchValueReducer,
  cmsVariablesReducer,
} from "./CMSPagesReducer";
import { landingGamesByGameIdsReducer, landingGamesByLabelIdsReducer, landingLabelsReducer } from "./LandingGamesByLabelIdsReducer";

const cmsContentRootReducer = createRootReducer([
  [cmsPagesContentReducer, cmsPagesContentAction],
  [cmsPromotionPageActivePromoReducer, cmsPromotionPageActivePromoAction],
  [cmsPromotionPageSearchValueReducer, cmsPromotionPageSearchValueAction],
  [cmsPromotionPageActiveTagsReducer, cmsPromotionPageActiveTagsAction],
  [cmsPromotionPageReducer, cmsPromotionPageAction],
  [cmsBlocksReducer, cmsBlocksAction],
  [cmsFilesReducer, cmsFilesReceivedAction],
  [landingGamesByGameIdsReducer, cmsGamesByIdsReceivedAction],
  [landingGamesByLabelIdsReducer, cmsGamesByLabelIdsReceivedAction],
  [landingLabelsReducer, labelsReceivedAction],
  [cmsPagesReducer, cmsPagesAction],
  [cmsVariablesReducer, cmsVariablesAction],
  [cmsPageContentReducer, cmsPageContentReceivedAction],
  [cmsPredefinedPagesReducer, cmsPredefinedPagesAction],
  [cmsMetaContentReducer, cmsMetaContentAction],
  [addActivePromoReducer, modalOpenAction],
]);

export { cmsContentRootReducer };
