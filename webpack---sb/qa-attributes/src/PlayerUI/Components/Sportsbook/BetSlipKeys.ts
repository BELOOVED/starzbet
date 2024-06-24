import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__bet_slip");

class BetSlipKeys {
  static Container = withAttr("container");
  static BetPlacedContainer = withAttr("container", "bet_placed");

  static BetConstructorTab = withAttr("first_line_tabs", "bet_constructor");
  static MyBetsTab = withAttr("first_line_tabs", "my_bets");
  static CashOutTab = withAttr("my_bets_tabs", "cash_out");
  static SingleTab = withAttr("bet_constructor_tabs", "single");
  static MultiTab = withAttr("bet_constructor_tabs", "multi");
  static SystemTab = withAttr("bet_constructor_tabs", "system");

  static RemoveAllPicks = withAttr("bet_constructor", "remove_all_picks");
  static Settings = withAttr("bet_constructor", "settings");
  static OddsChangeStrategyCheckbox = withAttr("settings", "odds_change_strategy", "checkbox");
  static SaveSettingsButton = withAttr("settings", "save", "button");

  static BetPick = withAttr("bet_constructor", "bet_pick");
  static BetPickBanker = withAttr("bet_constructor", "bet_pick", "banker");

  static StakeInput = withAttr("input", "stake");
  static IncreaseStakeButton = withAttr("button", "increase_stake");
  static DecreaseStakeButton = withAttr("button", "decrease_stake");
  static SystemTypeSelect = withAttr("select", "system_type");
  static SystemTypeSelectOption = withAttr("select_option", "system_type");

  static OpenBetSlipButton = withAttr("open_bet_slip", "button");
  static CloseBetSlipButton = withAttr("close_bet_slip", "button");
  static RegisterButton = withAttr("button", "register");
  static PlaceBet = withAttr("button", "place_bet");
  static DoneBetPlacing = withAttr("button", "done_bet_placing");

  static MyBetsContainer = withAttr("container", "my_bets");

  static EditBetButton = withAttr("edit_bet", "button");
  static ConfirmEditBet = withAttr("edit_bet", "confirm");
  static EditBetOutcomeSelect = withAttr("edit_bet", "outcome", "select");
  static EditBetOutcomeSelectOption = withAttr("edit_bet", "outcome", "select_option");
  static EditBetTutorial = withAttr("edit_bet", "tutorial");
  static EditBetTutorialNext = withAttr("edit_bet", "tutorial", "next");
  static EditBetAddSelections = withAttr("edit_bet", "add_selections");
  static EditBetGoBack = withAttr("edit_bet", "go_back");
  static EditBetRemovePick = withAttr("edit_bet", "remove_pick");

  static BetHistoryContainer = withAttr("bet_history", "container");
  static BetHistoryButton = withAttr("bet_history", "button");
  static BetHistoryItem = withAttr("bet_history", "item");

  static CashOutButton = withAttr("cash_out", "button");
  static CashOutSettingsButton = withAttr("cash_out", "settings", "button");
  static CashOutSettingsContainer = withAttr("cash_out", "settings", "container");
  static CashOutPartialButton = withAttr("cash_out", "partial", "button");
  static CashOutRuleActivated = withAttr("cash_out", "rule_activated");
  static CashOutCreateRuleButton = withAttr("cash_out", "create_rule", "button");
  static CashOutRemoveRuleButton = withAttr("cash_out", "create_rule", "button");
  static CashOutAutoInput = withAttr("cash_out", "auto", "input");
  static CashOutPartialFirstInput = withAttr("cash_out", "partial", "first_input");
  static CashOutPartialSecondInput = withAttr("cash_out", "partial", "second_input");
}

export { BetSlipKeys };
