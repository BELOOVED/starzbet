import { memo } from "react";
import { EFileStatus, EFileType, useFile } from "@sb/file-service";
import { type TVoidFn, withStopPropagation } from "@sb/utils";
import { type IWithFieldPath, useFormSelector } from "@sb/form-new";
import { useFormFileField } from "@sb/file-service-extension";
import classes from "./UploadFiles.module.css";
import { BaseModalCreator } from "../../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { CloseDefaultIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { BaseModalComponent } from "../../../../../../../common/Components/BaseModalComponent/BaseModalComponent";
import { openTicketFormFileSelector } from "../../../../../../Store/Ticket/Selectors/TicketSelectors";

const FileButton = memo<IWithId & IWithFieldPath>(({ id, fieldPath }) => {
  const { file, status } = useFile(EFileType.temporary, id, null);
  const { remove } = useFormFileField(fieldPath);

  if (status !== EFileStatus.ready) {
    return null;
  }

  const modal = (toggleModal: TVoidFn) => (
    <BaseModalComponent onCancel={toggleModal} withMobileOnCancel>
      <img src={file.src} alt={"uploadedFile"} className={classes.image} />
    </BaseModalComponent>
  );

  return (
    <BaseModalCreator modal={modal}>
      {
        (toggleModal) => (
          <div onClick={toggleModal} className={classes.fileButton}>
            {file.name}

            <CloseDefaultIcon onClick={withStopPropagation(() => remove(id))} size={"xs"} />
          </div>
        )
      }
    </BaseModalCreator>
  );
});
FileButton.displayName = "FileButton";

const FilesList = memo<IWithFieldPath>(({ fieldPath }) => {
  const value = useFormSelector(openTicketFormFileSelector, [fieldPath]);

  if (!value?.files) {
    return null;
  }

  return (
    <div className={classes.list}>
      {value.files.map((props) => <FileButton {...props} fieldPath={fieldPath} key={props.id} />)}
    </div>
  );
});
FilesList.displayName = "FilesList";

export { FilesList };
