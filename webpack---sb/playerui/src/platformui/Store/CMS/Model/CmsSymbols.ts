import { createCallManagerSymbol } from "@sb/call-manager";

const CMS_BLOCKS_SYMBOL = createCallManagerSymbol("cms_blocks");

const CMS_PAGES_SYMBOL = createCallManagerSymbol("cms_pages");

const CMS_PAGE_META_CONTENTS_SYMBOL = createCallManagerSymbol("cms_page_meta_contents");

const CMS_PAGE_CONTENT_SYMBOL = createCallManagerSymbol("cms_page_content");

const CMS_VARIABLES_SYMBOL = createCallManagerSymbol("cms_variables");

const CMS_GAMES_LOADING_SYMBOL = createCallManagerSymbol("cms_games");

export {
  CMS_GAMES_LOADING_SYMBOL,
  CMS_PAGE_CONTENT_SYMBOL,
  CMS_BLOCKS_SYMBOL,
  CMS_PAGES_SYMBOL,
  CMS_VARIABLES_SYMBOL,
  CMS_PAGE_META_CONTENTS_SYMBOL,
};
