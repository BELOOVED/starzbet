import { memo } from "react";
import { type TVoidFn } from "@sb/utils";
import { BaseModalCreator } from "../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { ThemedModalWarningMessage } from "../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

interface IModalContentProps {
    message: string;
}

const PaymentNoteModal = memo<IModalContentProps>(({ message }) => {
  const props = {
    title: [message] as const,
  };
  const modal = (hideModal: TVoidFn) => <ThemedModalWarningMessage hideModal={hideModal} {...props} />;

  return (
    <BaseModalCreator isVisibleOnInit={true} modal={modal} />
  );
});
PaymentNoteModal.displayName = "PaymentNoteModal";

export { PaymentNoteModal };
