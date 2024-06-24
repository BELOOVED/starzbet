import { type TCallManagerSymbol } from "@sb/call-manager";
import { query_Platform_BonusesForPromotions } from "@sb/graphql-client/AdminUI";
import {
  platformBonusesForPromotionsQueryOptionalFields,
} from "@sb/graphql-client/AdminUI/OptionalFields/Platform/Platform_BonusesForPromotions_Query";
import { cmsui_block_error_loadBonuses } from "@sb/translates/cmsui/Keys";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { BONUS_CALL_SYMBOL, CMS_REF_SYMBOL } from "../Model/CMSSymbol";
import { CMS_BONUS_RESULT_ID } from "../Model/PaginatorNames";
import { queryNormalizeEpic } from "../Utils/QueryNormalizeEpic";

const loadBonusesEpicFactory = (
  pageRef: string,
  loadSymbol: TCallManagerSymbol,
  resultId: string,
): TCmsAppEpic => (action$, state$, deps) => queryNormalizeEpic(
  pageRef,
  loadSymbol,
  query_Platform_BonusesForPromotions,
  {
    variables: {},
    optionalFields: platformBonusesForPromotionsQueryOptionalFields,
    normalizationData: { resultId },
  },
  cmsui_block_error_loadBonuses,
)(action$, state$, deps);

const loadBonusesEpic: TCmsAppEpic = (action$, state$, deps) => loadBonusesEpicFactory(
  CMS_REF_SYMBOL,
  BONUS_CALL_SYMBOL,
  CMS_BONUS_RESULT_ID,
)(action$, state$, deps);

export { loadBonusesEpic };
