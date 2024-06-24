import { type ComponentType, memo } from "react";
import { useAction, withCondition } from "@sb/utils";
import { type TWithHideModal } from "../../../common/Components/BaseModalCreator/BaseModalCreator";
import { userMessageHasUnseenIdSelector } from "../../Store/UserMessage/UserMessageSelectors";
import { userMessageDropUnseenMessageIdAction } from "../../Store/UserMessage/UserMessageActions";

interface IUserMessagesModalProps {
  Modal: ComponentType<TWithHideModal>;
}

const UserMessagesModal = withCondition(
  userMessageHasUnseenIdSelector,
  memo<IUserMessagesModalProps>(({ Modal }) => {
    const hideModal = useAction(userMessageDropUnseenMessageIdAction);

    return <Modal hideModal={hideModal} />;
  }),
);
UserMessagesModal.displayName = "UserMessagesModal";

export { UserMessagesModal };
