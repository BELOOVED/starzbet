import { useSelector } from "react-redux";
import { type ComponentType, createElement, memo } from "react";
import { withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_betSlip_placeBet_cannotBeCombined } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import {
  sportsbookui_betSlip_placeBet_acceptChanges,
  sportsbookui_betSlip_placeBet_loginToBet,
  sportsbookui_placeBet_title_placeBet,
} from "@sb/translates/sportsbookui/CommonTKeys";
import classes from "./PlaceBetButton.module.css";
import { Button } from "../../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useLogin } from "../../../../../../../../../common/Hooks/UseAuth";
import { EPlaceBetButtonState } from "../../../../../../../../Store/BetSlip/Model/EPlaceBetButtonState";
import { betSlipPlaceBetButtonStateSelector } from "../../../../../../../../Store/BetSlip/Selectors/BetSlipPlaceBetButtonStateSelector";
import { useBetSlipAcceptChangesAction } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipAcceptChangesAction";
import { betGroupSelector } from "../../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { useBetSlipPlaceBetAction } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipPlaceBetAction";

const BaseButton = withProps(Button)({ className: classes.button, wide: true, capitalize: true });

const DisabledButton = memo(() => {
  const [t] = useTranslation();

  return (
    <BaseButton disabled colorScheme={"error"}>
      {t(sportsbookui_starzbet_betSlip_placeBet_cannotBeCombined)}
    </BaseButton>
  );
});
DisabledButton.displayName = "DisabledButton";

const NeedAcceptChangesButton = memo(() => {
  const acceptChangesHandle = useBetSlipAcceptChangesAction();
  const [t] = useTranslation();

  return (
    <BaseButton colorScheme={"blue-gradient"} onClick={acceptChangesHandle}>
      {t(sportsbookui_betSlip_placeBet_acceptChanges)}
    </BaseButton>
  );
});
NeedAcceptChangesButton.displayName = "NeedAcceptChangesButton";

const NeedLoginButton = memo(() => {
  const [t] = useTranslation();
  const login = useLogin();

  return (
    <BaseButton colorScheme={"orange-gradient"} onClick={login}>
      {t(sportsbookui_betSlip_placeBet_loginToBet)}
    </BaseButton>
  );
});
NeedLoginButton.displayName = "NeedLoginButton";

const PlacingButton = memo(() => {
  const [t] = useTranslation();

  return (
    <BaseButton colorScheme={"orange-gradient"} loading>
      {t(sportsbookui_placeBet_title_placeBet)}
    </BaseButton>
  );
});
PlacingButton.displayName = "PlacingButton";

const ReadyToPlaceButton = memo(() => {
  const [t] = useTranslation();
  const activeGroup = useSelector(betGroupSelector);
  const placeBet = useBetSlipPlaceBetAction(true, activeGroup);

  return (
    <BaseButton colorScheme={"orange-gradient"} onClick={placeBet}>
      {t(sportsbookui_placeBet_title_placeBet)}
    </BaseButton>
  );
});
ReadyToPlaceButton.displayName = "ReadyToPlaceButton";

const BUTTON_STATE_TO_COMPONENT_MAP: Record<EPlaceBetButtonState, ComponentType> = {
  [EPlaceBetButtonState.disabled]: DisabledButton,
  [EPlaceBetButtonState.needAcceptChange]: NeedAcceptChangesButton,
  [EPlaceBetButtonState.needLogin]: NeedLoginButton,
  [EPlaceBetButtonState.placing]: PlacingButton,
  [EPlaceBetButtonState.readyToPlace]: ReadyToPlaceButton,
};

const PlaceBetButton = memo(() => {
  const state = useSelector(betSlipPlaceBetButtonStateSelector);

  return (
    <div className={classes.buttonWrapper}>
      {createElement(BUTTON_STATE_TO_COMPONENT_MAP[state])}
    </div>
  );
});
PlaceBetButton.displayName = "PlaceBetButton";

export { PlaceBetButton };
