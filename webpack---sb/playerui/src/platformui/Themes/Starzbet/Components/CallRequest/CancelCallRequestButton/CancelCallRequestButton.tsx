import { memo } from "react";
import {
  platformui_starzbet_button_cancel,
  platformui_starzbet_button_confirm,
  platformui_starzbet_button_no,
  platformui_starzbet_callRequests_title_areYouSureYouWantToCancelThisCallRequest,
  platformui_starzbet_callRequests_title_youCantUndoThisAction,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { type TVoidFn, useActionWithBind } from "@sb/utils";
import classes from "./CancelCallRequestButton.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { BaseModalCreator, type TWithHideModal } from "../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { CloseIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon";
import { cancelCallRequestAction } from "../../../../../Store/CallRequests/CallRequestsActions";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { ThemedModalButton } from "../../ThemedModal/ThemedModalButton/ThemedModalButton";
import { ThemedModalPrompt } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalPrompt";

type TWithRequestId = {
  requestId: string;
}

type TWithToggle = {
  toggleModal: TVoidFn;
}

type TCancelCallRequestPromptProps = TWithHideModal & TWithRequestId

const CancelCallRequestPrompt = memo<TCancelCallRequestPromptProps>(({ requestId, hideModal }) => {
  const cancelCallRequest = useActionWithBind(cancelCallRequestAction, requestId);

  const props = {
    title: [platformui_starzbet_callRequests_title_areYouSureYouWantToCancelThisCallRequest] as const,
    subtitle: [platformui_starzbet_callRequests_title_youCantUndoThisAction] as const,
    onOk: cancelCallRequest,
    onCancel: hideModal,
    okButtonText: [platformui_starzbet_button_confirm] as const,
    iconVariant: "warning" as const,
    cancelButtonText: [platformui_starzbet_button_no] as const,
  };

  return <ThemedModalPrompt {...props} />;
});
CancelCallRequestPrompt.displayName = "CancelCallRequestPrompt";

const MobileButton = memo<TWithToggle>(({ toggleModal }) => {
  const [t] = useTranslation();

  return (
    <ThemedModalButton onClick={toggleModal} qaAttribute={PlayerUIQaAttributes.RequestCallBackPage.RequestTicket_CancelButton}>
      <Ellipsis>
        {t(platformui_starzbet_button_cancel)}
      </Ellipsis>
    </ThemedModalButton>
  );
});
MobileButton.displayName = "MobileButton";

const DesktopButton = memo<TWithToggle>(({ toggleModal }) => (

  <CloseIcon
    width={12}
    height={12}
    className={classes.cancelButton}
    onClick={toggleModal}
    {...qaAttr(PlayerUIQaAttributes.RequestCallBackPage.RequestTicket_CancelButton)}
  />
));
DesktopButton.displayName = "DesktopButton";

const CancelCallRequestButton = memo<TWithRequestId>(({ requestId }) => {
  const modal = (hideModal: TVoidFn) => (<CancelCallRequestPrompt requestId={requestId} hideModal={hideModal} />);

  return (
    <BaseModalCreator modal={modal}>
      {
        (toggleModal) => (
          IS_MOBILE_CLIENT_SIDE
            ? <MobileButton toggleModal={toggleModal} />
            : <DesktopButton toggleModal={toggleModal} />
        )
      }
    </BaseModalCreator>
  );
});
CancelCallRequestButton.displayName = "CancelCallRequestButton";

export { CancelCallRequestButton };
