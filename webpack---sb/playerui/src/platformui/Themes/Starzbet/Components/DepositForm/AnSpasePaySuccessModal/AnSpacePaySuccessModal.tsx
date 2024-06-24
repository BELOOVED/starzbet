import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_button_gotIt } from "@sb/translates/platformui/CommonTKeys";
import classes from "./AnSpacePaySuccessModal.module.css";
import { useAnSpacePayModal } from "../../../../../Store/Banking/Hooks/UseModalWithRedirect";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../ThemedModal/ThemedModalBody/ThemedModalBody";
import { ThemedModalTextBlock } from "../../ThemedModal/ThemedModalTextBlock/ThemedModalTextBlock";
import { ThemedModalText } from "../../ThemedModal/ThemedModalText/ThemedModalText";
import { ThemedModalButtonsRow } from "../../ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import { ThemedModalButton } from "../../ThemedModal/ThemedModalButton/ThemedModalButton";
import { Copy } from "../../Copy/Copy";

const AnSpacePaySuccessModal = memo(() => {
  const [t] = useTranslation();

  const {
    hideModal,
    qrCode,
    qrCodeString,
  } = useAnSpacePayModal();

  return (
    <ThemedModal onCancel={hideModal}>
      <ThemedModalHeader closeButtonClickHandler={hideModal} />

      <ThemedModalBody>
        <ThemedModalTextBlock>
          <img src={qrCode} alt={"QA-code"} />

          <ThemedModalText size={"md"}>
            <div className={classes.pixLabel}>
              <Ellipsis>
                {qrCodeString}
              </Ellipsis>

              <Copy text={qrCodeString} />
            </div>
          </ThemedModalText>
        </ThemedModalTextBlock>

        <ThemedModalButtonsRow>
          <ThemedModalButton onClick={hideModal}>
            {t(platformui_button_gotIt)}
          </ThemedModalButton>
        </ThemedModalButtonsRow>
      </ThemedModalBody>
    </ThemedModal>
  );
});
AnSpacePaySuccessModal.displayName = "AnSpacePaySuccessModal";

export { AnSpacePaySuccessModal };
