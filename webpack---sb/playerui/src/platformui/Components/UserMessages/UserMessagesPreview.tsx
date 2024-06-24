import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { PublicImage } from "../../../common/Components/PublicImage";
import { userMessageMessagePropertySelectors } from "../../Store/UserMessage/UserMessageSelectors";

interface IUserMessagesPreviewProps extends IWithId, IWithClassName {
  containerClassName?: string;
}

const UserMessagesPreview = memo<IUserMessagesPreviewProps>(({ id, containerClassName, className }) => {
  const file = useParamSelector(userMessageMessagePropertySelectors.previewImage, [id]);

  return file
    ? (
      <div className={containerClassName} {...qaAttr(PlayerUIQaAttributes.NotificationsPage.Image)}>
        <PublicImage pathToFile={file.pathToFile} className={className} />
      </div>
    )
    : null;
});
UserMessagesPreview.displayName = "UserMessagesPreview";

export { UserMessagesPreview };
