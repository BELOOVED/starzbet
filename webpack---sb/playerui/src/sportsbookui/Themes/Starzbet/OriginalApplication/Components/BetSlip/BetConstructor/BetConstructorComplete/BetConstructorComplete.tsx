import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { useAction } from "@sb/utils";
import {
  sportsbookui_starzbet_betConstructor_completed,
  sportsbookui_starzbet_betConstructor_title_betPlaced,
  sportsbookui_starzbet_betSlip_button_done,
  sportsbookui_starzbet_betSlip_button_reuseSelection,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./BetConstructorComplete.module.css";
import { Button } from "../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { TickIcon } from "../../../../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { betSlipCompletePlaceBetAction } from "../../../../../../../Store/BetSlip/BetSlipActions";
import { useBetSlipFinishCompleteAction } from "../../../../../../../Store/BetSlip/Hooks/UseBetSlipFinishCompleteAction";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";

const BetConstructorComplete = memo(() => {
  const [t] = useTranslation();
  const reUseAction = useAction(betSlipCompletePlaceBetAction);
  const finishComplete = useBetSlipFinishCompleteAction();

  const onReuseClick = () => {
    reUseAction(true);
    finishComplete();
  };

  const onDoneClick = () => {
    reUseAction(false);
    finishComplete();
  };

  return (
    <div className={classes.betPlacedMessage}>
      <TickIcon
        className={classes.tickIcon}
        color={"validation"}
      />

      <div className={classes.title}>
        {t(sportsbookui_starzbet_betConstructor_title_betPlaced)}
      </div>

      <div className={classes.subTitle}>{t(sportsbookui_starzbet_betConstructor_completed)}</div>

      <Button
        className={classes.button}
        onClick={onReuseClick}
        colorScheme={"secondary-grey"}
        wide
      >
        <Ellipsis>
          {t(sportsbookui_starzbet_betSlip_button_reuseSelection)}
        </Ellipsis>
      </Button>

      <Button
        className={classes.button}
        onClick={onDoneClick}
        colorScheme={"secondary-grey"}
        wide
      >
        <Ellipsis>
          {t(sportsbookui_starzbet_betSlip_button_done)}
        </Ellipsis>
      </Button>
    </div>

  );
});
BetConstructorComplete.displayName = "BetConstructorComplete";

export { BetConstructorComplete };
