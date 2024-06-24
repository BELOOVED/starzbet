import { type ComponentType, memo } from "react";
import { useTranslation } from "@sb/translator";
import { type IWithId, useAction, usePersistCallback, withProps } from "@sb/utils";
import { deleteMessageAction, type TMessageType, useMessageById } from "@sb/messages";
import { OverlayModal } from "../../../../Components/OverlayModal/OverlayModal";
import { ErrorModal, type IErrorModalProps } from "../../../../Components/ErrorModal/ErrorModal";
import { CompleteModal } from "../../../../Components/CompleteModal/CompleteModal";

type TUsedMessagesTypes = Extract<TMessageType, "success" | "warning" | "error">;

const messageTypeToComponentMap: Record<TUsedMessagesTypes, ComponentType<IErrorModalProps>> = {
  success: CompleteModal,
  error: ErrorModal,
  warning: withProps(ErrorModal)({ isWarning: true }),
};

const MessagesModal = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();
  const removeMessage = useAction(deleteMessageAction);

  const { content, type } = useMessageById<{ subtitleTKey: string; titleTKey: string; }, "success" | "error">(id);

  const handleMessageClose = usePersistCallback(() => removeMessage({ id }));

  return (
    <OverlayModal
      component={messageTypeToComponentMap[type]}
      subtitle={t(content.subtitleTKey)}
      title={t(content.titleTKey)}
      capitalizeText={false}
      onClose={handleMessageClose}
    />
  );
});
MessagesModal.displayName = "MessagesModal";

export { MessagesModal };
