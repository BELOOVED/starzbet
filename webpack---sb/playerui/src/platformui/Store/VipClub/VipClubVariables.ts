import { createCallManagerSymbol } from "@sb/call-manager";

const addPrefix = (name: string) => `vip_club/${name}`;

const VIP_CLUB_CONTRIBUTION_TABLE_LOADING_SYMBOL = createCallManagerSymbol(addPrefix("contribution_table"));

const VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL = createCallManagerSymbol(addPrefix("level_rules"));

const VIP_CLUB_PLAYER_STATE_LOADING_SYMBOL = createCallManagerSymbol(addPrefix("player_state"));

const VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL = createCallManagerSymbol(addPrefix("do_commission_refund"));

const VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL = createCallManagerSymbol(addPrefix("leader_board"));

const VIP_CLUB_TOURNAMENTS_LOADING_SYMBOL = createCallManagerSymbol(addPrefix("tournaments"));

const VIP_CLUB_LEADER_BOARD_SELF_PLACE_LOADING_SYMBOL = createCallManagerSymbol(addPrefix("leader_board_self_place"));

const VIP_CLUB_LEADER_BOARD_LAST_PLACE_LOADING_SYMBOL = createCallManagerSymbol(addPrefix("leader_board_last_place"));

const VIP_CLUB_SETTINGS_LOADING_SYMBOL = createCallManagerSymbol(addPrefix("settings"));

const VIP_CLUB_TIME_ZONE = "Europe/Istanbul";

const VIP_CLUB_LEADER_BOARD_LIMIT = 100;

const VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_NUMBER = 1;

const VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING = "1";

export {
  VIP_CLUB_CONTRIBUTION_TABLE_LOADING_SYMBOL,
  VIP_CLUB_LEVEL_RULES_LOADING_SYMBOL,
  VIP_CLUB_PLAYER_STATE_LOADING_SYMBOL,
  VIP_CLUB_DO_COMMISSION_REFUND_LOADING_SYMBOL,
  VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL,
  VIP_CLUB_LEADER_BOARD_LIMIT,
  VIP_CLUB_TOURNAMENTS_LOADING_SYMBOL,
  VIP_CLUB_LEADER_BOARD_SELF_PLACE_LOADING_SYMBOL,
  VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_NUMBER,
  VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING,
  VIP_CLUB_LEADER_BOARD_LAST_PLACE_LOADING_SYMBOL,
  VIP_CLUB_TIME_ZONE,
  VIP_CLUB_SETTINGS_LOADING_SYMBOL,
};
