import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { DateFormat } from "../../../common/Components/Date/DateFormat";
import { userMessageMessagePropertySelectors } from "../../Store/UserMessage/UserMessageSelectors";

interface IUserMessagesPublishedProps extends IWithId {
  format: string;
}

const UserMessagesPublished = memo<IUserMessagesPublishedProps>(({ id, format }) => {
  const value = useParamSelector(userMessageMessagePropertySelectors.publishedAt, [id]);

  return (
    <DateFormat
      date={value}
      format={format}
    />
  );
});
UserMessagesPublished.displayName = "UserMessagesPublished";

export { UserMessagesPublished };
