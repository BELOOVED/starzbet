// @ts-nocheck
import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_betSlip_title_selectAnyOdds,
  sportsbookui_starzbet_betSlip_title_toAddNewSelections,
  sportsbookui_starzbet_editPick_button_addSelectionSlashs,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { sportsbookui_button_cancel } from "@sb/translates/sportsbookui/CommonTKeys";
import { useAction, usePersistCallback, withCondition } from "@sb/utils";
import classes from "./AddingSelections.module.css";
import { Button } from "../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useModalOpenAction } from "../../../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../../../../../common/Store/Modal/Model/EModal";
import {
  addingEditableBetSelector,
  editableBetChangedSinceLastCommitSelector,
} from "../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import {
  cancelCommittingPicksAction,
  completeCommittingPicksAction,
} from "../../../../../../../Store/MyBets/MyBetsActions";

const AddingSelections = withCondition(
  addingEditableBetSelector,
  memo(() => {
    const [t] = useTranslation();
    const changedSinceLastCommit = useSelector(editableBetChangedSinceLastCommitSelector);
    const openBetSlip = useModalOpenAction(EModal.betSlip);
    const cancelCommittingPicks = useAction(cancelCommittingPicksAction);
    const completeCommittingPicks = useAction(completeCommittingPicksAction);

    const onCancel = usePersistCallback(() => {
      cancelCommittingPicks();
      openBetSlip();
    });

    const onComplete = usePersistCallback(() => {
      completeCommittingPicks();
      openBetSlip();
    });

    return (
      <div className={classes.adding}>
        <div className={classes.title}>
          <Ellipsis>
            {t(sportsbookui_starzbet_betSlip_title_selectAnyOdds)}

            {"  "}

            {t(sportsbookui_starzbet_betSlip_title_toAddNewSelections)}
          </Ellipsis>
        </div>

        <div className={classes.buttonsGroup}>
          <Button
            colorScheme={"secondary-grey"}
            capitalize
            className={classes.button}
            onClick={onCancel}
          >
            <Ellipsis>
              {t(sportsbookui_button_cancel)}
            </Ellipsis>
          </Button>

          <Button
            colorScheme={"orange-gradient"}
            capitalize
            disabled={!changedSinceLastCommit}
            className={classes.button}
            onClick={onComplete}
          >
            <Ellipsis>
              {t(sportsbookui_starzbet_editPick_button_addSelectionSlashs)}
            </Ellipsis>
          </Button>
        </div>
      </div>
    );
  }),
);
AddingSelections.displayName = "AddingSelections";

export { AddingSelections };
