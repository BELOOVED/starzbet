import { createCallManagerSymbol } from "@sb/call-manager";
import { createRefSymbol } from "@sb/rorm";

const LANDING_GAMES = "LANDING_GAMES";

const PAGES_CALL_SYMBOL = createCallManagerSymbol("PAGES");

const META_CONTENT_CALL_SYMBOL = createCallManagerSymbol("META_CONTENT");

const BLOCK_CALL_SYMBOL = createCallManagerSymbol("BLOCK");

const EXPORT_BLOCK_CALL_SYMBOL = createCallManagerSymbol("EXPORT_BLOCK_CALL_SYMBOL");

const VARIABLES_CALL_SYMBOL = createCallManagerSymbol("VARIABLES");

const ADD_PAGE_CALL_SYMBOL = createCallManagerSymbol("ADD_PAGE");

const PUSH_BLOCK_CALL_SYMBOL = createCallManagerSymbol("PUSH_BLOCK");

const PUSH_IMPORTED_BLOCK_CALL_SYMBOL = createCallManagerSymbol("PUSH_IMPORTED_BLOCK");

const CHANGE_PAGE_CALL_SYMBOL = createCallManagerSymbol("CHANGE_PAGE");

const PUSH_META_CONTENT_CALL_SYMBOL = createCallManagerSymbol("PUSH_META_CONTENT");

const CHANGE_PAGE_PRIORITY_CALL_SYMBOL = createCallManagerSymbol("CHANGE_PAGE_PRIORITY");

const DELETE_PAGE_CALL_SYMBOL = createCallManagerSymbol("DELETE_PAGE");

const BONUS_CALL_SYMBOL = createCallManagerSymbol("BONUS");

const CMS_REF_SYMBOL = createRefSymbol("CMS_PAGE_REF");

const LANDING_GAMES_REF_SYMBOL = createRefSymbol(LANDING_GAMES);

const VARIABLE_TABLE_COMMON_LOADER_SYMBOL = createCallManagerSymbol("VARIABLE_TABLE_COMMON");

const META_CONTENT_RESULT_ID = "META_CONTENT_RESULT_ID";

const LANDING_GAMES_CALL_SYMBOL = createCallManagerSymbol(LANDING_GAMES);

const CMS_CALL_SYMBOLS = [
  LANDING_GAMES_CALL_SYMBOL,
  VARIABLE_TABLE_COMMON_LOADER_SYMBOL,
  PAGES_CALL_SYMBOL,
  META_CONTENT_CALL_SYMBOL,
  BLOCK_CALL_SYMBOL,
  VARIABLES_CALL_SYMBOL,
  ADD_PAGE_CALL_SYMBOL,
  PUSH_BLOCK_CALL_SYMBOL,
  CHANGE_PAGE_CALL_SYMBOL,
  PUSH_META_CONTENT_CALL_SYMBOL,
  CHANGE_PAGE_PRIORITY_CALL_SYMBOL,
  DELETE_PAGE_CALL_SYMBOL,
  BONUS_CALL_SYMBOL,
  EXPORT_BLOCK_CALL_SYMBOL,
];

export {
  LANDING_GAMES_REF_SYMBOL,
  LANDING_GAMES_CALL_SYMBOL,
  VARIABLE_TABLE_COMMON_LOADER_SYMBOL,
  CMS_CALL_SYMBOLS,
  META_CONTENT_RESULT_ID,
  META_CONTENT_CALL_SYMBOL,
  PUSH_META_CONTENT_CALL_SYMBOL,
  CHANGE_PAGE_PRIORITY_CALL_SYMBOL,
  VARIABLES_CALL_SYMBOL,
  CMS_REF_SYMBOL,
  BLOCK_CALL_SYMBOL,
  PUSH_BLOCK_CALL_SYMBOL,
  CHANGE_PAGE_CALL_SYMBOL,
  ADD_PAGE_CALL_SYMBOL,
  DELETE_PAGE_CALL_SYMBOL,
  PAGES_CALL_SYMBOL,
  BONUS_CALL_SYMBOL,
  EXPORT_BLOCK_CALL_SYMBOL,
  PUSH_IMPORTED_BLOCK_CALL_SYMBOL,
};
