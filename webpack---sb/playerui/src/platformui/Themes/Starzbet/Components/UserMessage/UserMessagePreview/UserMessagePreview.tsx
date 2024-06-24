import { withProps } from "@sb/utils";
import classes from "./UserMessagePreview.module.css";
import { UserMessagesPreview } from "../../../../../Components/UserMessages/UserMessagesPreview";

const UserMessagePreview = withProps(UserMessagesPreview)({ containerClassName: classes.container, className: classes.image });
UserMessagePreview.displayName = "UserMessagePreview";

export { UserMessagePreview };
