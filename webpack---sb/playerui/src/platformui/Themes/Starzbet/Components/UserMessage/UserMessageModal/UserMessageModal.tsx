import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_userMessages_button_goToNotification } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import classes from "./UserMessageModal.module.css";
import { type TWithHideModal } from "../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { When } from "../../../../../../common/Components/When";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useLocalizedPush } from "../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { userMessageGetUnseenMessageIdSelector } from "../../../../../Store/UserMessage/UserMessageSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { UserMessagesModal } from "../../../../../Components/UserMessages/UserMessagesModal";
import { ThemedModal } from "../../ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalButtonsRow } from "../../ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import { UserMessagePreview } from "../UserMessagePreview/UserMessagePreview";
import { UserMessageSubjectHTML } from "../UserMessageHTML/UserMessageHTML";

const Modal = memo<TWithHideModal>(({ hideModal }) => {
  const [t] = useTranslation();

  const id = useSelector(userMessageGetUnseenMessageIdSelector);
  const gotTo = useLocalizedPush();

  const onOk = useCallback(
    () => {
      hideModal();
      gotTo(routeMap.userMessageDetails, { id });
    },
    [id],
  );

  return (
    <ThemedModal onCancel={hideModal} className={classes.modal}>
      <ThemedModalHeader closeButtonClickHandler={hideModal} />

      <When condition={Boolean(id)}>
        <div className={classes.content}>
          <UserMessagePreview id={id} />

          <UserMessageSubjectHTML id={id} className={classes.subject} />
        </div>
      </When>

      <ThemedModalButtonsRow>
        <Button
          colorScheme={"orange-gradient"}
          capitalize
          onClick={onOk}
          qaAttribute={PlayerUIQaAttributes.Modal.SubmitButton}
        >
          {t(platformui_starzbet_userMessages_button_goToNotification)}
        </Button>
      </ThemedModalButtonsRow>
    </ThemedModal>
  );
});
Modal.displayName = "Modal";

const UserMessageModal = withProps(UserMessagesModal)({ Modal });

UserMessageModal.displayName = "UserMessageModal";

export { UserMessageModal };
