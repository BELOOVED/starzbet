import { memo } from "react";
import { platformui_validateFile_error_fileSizeMustBeUnder10mb, type TCommonTKeys } from "@sb/translates/platformui/CommonTKeys";
import { useModalCloseAction } from "../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { ThemedModalErrorMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

const subtitle: readonly [translateKey: TCommonTKeys] = [platformui_validateFile_error_fileSizeMustBeUnder10mb];

const InvalidFileModal = memo(() => {
  const close = useModalCloseAction(EModal.invalidFile);

  return <ThemedModalErrorMessage hideModal={close} subtitle={subtitle} />;
});
InvalidFileModal.displayName = "InvalidFileModal";

export { InvalidFileModal };
