import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_transactionRequest_title_declineReason } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import type { TPlatform_Decline_Fragment } from "@sb/graphql-client/PlayerUI";
import { platformui_transactionRequest_status_declined } from "@sb/translates/platformui/CommonTKeys";
import classes from "./DeclinedReasonModal.module.css";
import { type TWithHideModal } from "../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalText } from "../../ThemedModal/ThemedModalText/ThemedModalText";
import { ThemedModalBody } from "../../ThemedModal/ThemedModalBody/ThemedModalBody";

interface IDeclineReasonModalProps {
  decline: TPlatform_Decline_Fragment;
}

const DeclinedReasonModal = memo<IDeclineReasonModalProps & TWithHideModal>(({ decline, hideModal }) => {
  const [t] = useTranslation();

  return (
    <ThemedModal onCancel={hideModal}>
      <ThemedModalHeader closeButtonClickHandler={hideModal}>
        <ThemedModalText color={"error"} size={"lg"}>
          {t(platformui_transactionRequest_status_declined)}
        </ThemedModalText>
      </ThemedModalHeader>

      <ThemedModalBody className={classes.declineContent}>
        <div className={classes.declineTime}>
          <DateFormat date={decline.declinedAt} format={"dd.LL.yyyy HH:mm:ss"} />
        </div>

        <div className={classes.declineItem}>
          <div className={classes.declineReasonTitle}>
            {t(platformui_starzbet_transactionRequest_title_declineReason)}

            {":"}
          </div>

          <div className={classes.declineReasonSubtitle}>
            {decline.notes}
          </div>
        </div>
      </ThemedModalBody>
    </ThemedModal>
  );
});
DeclinedReasonModal.displayName = "DeclinedReasonModal";

export type { IDeclineReasonModalProps };
export { DeclinedReasonModal };
