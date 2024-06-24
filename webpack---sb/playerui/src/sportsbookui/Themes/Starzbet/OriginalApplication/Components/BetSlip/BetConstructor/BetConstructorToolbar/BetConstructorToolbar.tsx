import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_betConstructor_removeAll } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./BetConstructorToolbar.module.css";
import { useModalOpenAction } from "../../../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../../../../../common/Store/Modal/Model/EModal";
import { useRemoveAllPickAction } from "../../../../../../../Store/BetSlip/Hooks/UseRemoveAllPickAction";
import { SettingsIcon } from "../../../Icons/SettingsIcon/SettingsIcon";
import { BetSlipShare } from "../../BetSlipShare/BetSlipShare";

const RemoveAllPickButton = memo(() => {
  const removeAllHandle = useRemoveAllPickAction();
  const [t] = useTranslation();

  return (
    <div
      className={classes.removeAllPickButton}
      onClick={removeAllHandle}
    >
      {t(sportsbookui_starzbet_betConstructor_removeAll)}
    </div>
  );
});
RemoveAllPickButton.displayName = "RemoveAllPickButton";

const BetConstructorToolbar = memo(() => {
  const modalHandler = useModalOpenAction(EModal.betSettings);

  return (
    <div className={classes.toolbar}>
      <RemoveAllPickButton />

      <div className={classes.shareSettingsWrapper}>
        <BetSlipShare />

        <SettingsIcon
          className={classes.settings}
          onClick={modalHandler}
        />
      </div>
    </div>
  );
});
BetConstructorToolbar.displayName = "BetConstructorToolbar";

export { BetConstructorToolbar };
