import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_betSlip_title_selectAnyOdds,
  sportsbookui_starzbet_betSlip_title_toAddNewSelections,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useAction, usePersistCallback } from "@sb/utils";
import classes from "./AddSelections.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { EModal } from "../../../../../../../../../../common/Store/Modal/Model/EModal";
import { useModalCloseAction } from "../../../../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { useModalOpenAction } from "../../../../../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { useAddingBetActions } from "../../../../../../../../../Store/MyBets/Hooks/UseAddingBetActions";
import { startCommittingPicksAction } from "../../../../../../../../../Store/MyBets/MyBetsActions";
import { AddIcon } from "../../../../../Icons/AddIcon/AddIcon";

const AddSelections = memo(() => {
  const [t] = useTranslation();

  const [startAddingBet] = useAddingBetActions();
  const startCommittingPicks = useAction(startCommittingPicksAction);
  const hideModal = useModalCloseAction(EModal.betSlip);
  const openAddSelectionTip = useModalOpenAction(EModal.addSelectionTip);

  const handler = usePersistCallback(() => {
    if (!IS_MOBILE_CLIENT_SIDE) {
      return;
    }
    openAddSelectionTip();
    startAddingBet();
    startCommittingPicks();
    hideModal();
  });

  return (
    <div className={classes.addSelection} onClick={handler}>
      <div className={classes.button}>
        <AddIcon className={classes.addIcon} color={"active"} />

        <div className={classes.subtitle}>
          {t(sportsbookui_starzbet_betSlip_title_toAddNewSelections)}
        </div>

        <div className={classes.subtitle}>
          {t(sportsbookui_starzbet_betSlip_title_selectAnyOdds)}
        </div>
      </div>
    </div>
  );
});
AddSelections.displayName = "AddSelections";

export { AddSelections };
