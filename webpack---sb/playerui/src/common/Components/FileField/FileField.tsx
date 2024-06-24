import { type ChangeEventHandler, memo } from "react";
import { useFormFileField } from "@sb/file-service-extension";
import { selectIsFormSubmittingStarted, type TFieldPath, useFormSelector } from "@sb/form-new";
import { TICKET_FILE_MAX_SIZE } from "../../../platformui/Store/Ticket/Forms/OpenTicketForm/Model";
import { useModalOpenAction } from "../../Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../Store/Modal/Model/EModal";
import { type TValidatorResult } from "../Field/Model";
import { fileSizeValidator } from "./FileSizeValidator";

interface IFileFieldProps {
  fieldPath: TFieldPath;
  allowedTypes?: string[];
  disabled?: boolean;
}

const FileField = memo<IFileFieldProps>(({
  fieldPath,
  allowedTypes = [],
  ...rest
}) => {
  const {
    disabled,
    onChange,
  } = useFormFileField<TValidatorResult>(fieldPath);

  const isSubmitting = useFormSelector(selectIsFormSubmittingStarted);

  const openErrorModal = useModalOpenAction(EModal.invalidFile);

  const handler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const isValid = fileSizeValidator(files, TICKET_FILE_MAX_SIZE);

    if (isValid) {
      onChange(files);
    } else {
      openErrorModal();
    }
  };

  return (
    <input
      type={"file"}
      disabled={disabled || isSubmitting}
      onChange={handler}
      multiple
      accept={allowedTypes.join(", ")}
      {...rest}
    />
  );
});
FileField.displayName = "FileField";

export { FileField };
