// @ts-nocheck
import { memo } from "react";
import {
  sportsbookui_starzbet_editBet_addSelectionTip_gotIt,
  sportsbookui_starzbet_editBet_addSelectionTip_ifYouWantToAddANewSelection,
  sportsbookui_starzbet_editBet_addSelectionTip_nowSelectAnyOdds,
  sportsbookui_starzbet_modal_checkbox_dontShowThisMessageAgain,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./AddSelectionTip.module.css";
import { ThemedModal } from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModal";
import { Button } from "../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { ThemedModalBody } from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalBody/ThemedModalBody";
import {
  ThemedModalTextBlock,
} from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalTextBlock/ThemedModalTextBlock";
import { ThemedModalText } from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalText/ThemedModalText";
import {
  ThemedModalHeader,
} from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { EModal } from "../../../../../../../../common/Store/Modal/Model/EModal";
import { useSkipModal } from "../../../../../../../../common/Store/Modal/Hooks/UseSkipModal";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { CheckboxIcon } from "../../../../Components/Icons/CheckboxIcon/CheckboxIcon";

const AddSelectionTip = memo(() => {
  const [t] = useTranslation();

  const [skipAddSelectionTip, toggleHandler, closeHandler] = useSkipModal(EModal.addSelectionTip);

  return (
    <ThemedModal onCancel={closeHandler} className={classes.addSelectionTip}>
      <ThemedModalHeader closeButtonClickHandler={closeHandler} />

      <ThemedModalBody>
        <ThemedModalTextBlock>
          <ThemedModalText size={"xl"}>
            {t(sportsbookui_starzbet_editBet_addSelectionTip_nowSelectAnyOdds)}
          </ThemedModalText>

          <ThemedModalText size={"md"}>
            {t(sportsbookui_starzbet_editBet_addSelectionTip_ifYouWantToAddANewSelection)}
          </ThemedModalText>
        </ThemedModalTextBlock>

        <Button
          colorScheme={"orange-gradient"}
          capitalize
          wide
          onClick={closeHandler}
        >
          {t(sportsbookui_starzbet_editBet_addSelectionTip_gotIt)}
        </Button>

        <div className={classes.checkboxGroup} onClick={toggleHandler}>
          <CheckboxIcon checked={skipAddSelectionTip} color={skipAddSelectionTip ? "active" : "text"} />

          <Ellipsis className={classes.checkboxGroupText}>{t(sportsbookui_starzbet_modal_checkbox_dontShowThisMessageAgain)}</Ellipsis>
        </div>
      </ThemedModalBody>
    </ThemedModal>
  );
});
AddSelectionTip.displayName = "AddSelectionTip";

export { AddSelectionTip };
