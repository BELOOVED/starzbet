import {
  sportsbookui_starzbet_betSlip_message_betMeetsActivationConditionsFor,
  sportsbookui_starzbet_betSlip_message_betMeetsClaimConditionsFor,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./MatchNotActiveBonusLabel.module.css";
import {
  matchNotActiveBonusLabelForParlayFactory,
  matchNotActiveBonusLabelForSingleFactory,
} from "../../../../../../../Components/MatchNotActiveBonusLabelFactory/MatchNotActiveBonusLabelFactory";

const MatchNotActiveBonusLabelForSingle = matchNotActiveBonusLabelForSingleFactory(
  sportsbookui_starzbet_betSlip_message_betMeetsClaimConditionsFor,
  sportsbookui_starzbet_betSlip_message_betMeetsActivationConditionsFor,
  classes.matchNotActiveBonusLabel,
);
MatchNotActiveBonusLabelForSingle.displayName = "MatchNotActiveBonusLabelForSingle";

const MatchNotActiveBonusLabelForParlay = matchNotActiveBonusLabelForParlayFactory(
  sportsbookui_starzbet_betSlip_message_betMeetsClaimConditionsFor,
  sportsbookui_starzbet_betSlip_message_betMeetsActivationConditionsFor,
  classes.matchNotActiveBonusLabel,
);
MatchNotActiveBonusLabelForSingle.displayName = "MatchNotActiveBonusLabelForSingle";

export { MatchNotActiveBonusLabelForSingle, MatchNotActiveBonusLabelForParlay };
