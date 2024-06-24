import { type TPaginatorName, createPaginatorSymbol } from "@sb/adminui-utils";

const NAME = "cms";

const CMS_BONUS_RESULT_ID: TPaginatorName = "CMS_BONUS_RESULT_ID";
const CMS_PAGES_PAGINATOR: TPaginatorName = "CMS_PAGES_PAGINATOR";
const CMS_BLOCKS_PAGINATOR: TPaginatorName = "CMS_BLOCKS_PAGINATOR";
const CMS_LANDING_GAMES_PAGINATOR = createPaginatorSymbol(NAME);
const CMS_VARIABLE_TABLE_COMMON_PAGINATOR_NAME: TPaginatorName = "CMS_VARIABLES_TABLE_COMMON";

export {
  CMS_LANDING_GAMES_PAGINATOR,
  CMS_VARIABLE_TABLE_COMMON_PAGINATOR_NAME,
  CMS_BONUS_RESULT_ID,
  CMS_PAGES_PAGINATOR,
  CMS_BLOCKS_PAGINATOR,
};