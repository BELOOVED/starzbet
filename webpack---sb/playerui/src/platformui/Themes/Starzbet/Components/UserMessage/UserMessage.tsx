import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_userMessages_title_published } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./UserMessage.module.css";
import { Link } from "../../../../../common/Themes/Starzbet/Components/Link/Link";
import {
  userMessageDetailedMessageIdSelector,
  userMessageIsMessageSeenSelector,
} from "../../../../Store/UserMessage/UserMessageSelectors";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { UserMessagesPublished } from "../../../../Components/UserMessages/UserMessagesPublished";
import { UserMessagePreview } from "./UserMessagePreview/UserMessagePreview";
import { UserMessageMessageHTML, UserMessageSubjectHTML, UserMessageSubjectText } from "./UserMessageHTML/UserMessageHTML";

const UserMessageShort = memo<IWithId>(({
  id,
}) => {
  const seen = useParamSelector(userMessageIsMessageSeenSelector, [id]);

  const params = { id };

  return (
    <Link
      toTop
      to={routeMap.userMessageDetails}
      params={params}
      className={clsx(classes.tableRow, seen && classes.seen)}
    >
      <span className={classes.circle} />

      <UserMessageSubjectText id={id} className={classes.subject} qaAttribute={PlayerUIQaAttributes.NotificationsPage.Subject} />

      <div className={classes.published} {...qaAttr(PlayerUIQaAttributes.NotificationsPage.Published)}>
        <UserMessagesPublished id={id} format={"dd.MM.yyyy"} />
      </div>
    </Link>
  );
});
UserMessageShort.displayName = "UserMessageShort";

const UserMessageFull = memo(() => {
  const id = useSelector(userMessageDetailedMessageIdSelector);
  const [t] = useTranslation();

  return (
    <>
      <UserMessagePreview id={id} />

      <span className={classes.published} {...qaAttr(PlayerUIQaAttributes.NotificationsPage.Published)}>
        {t(platformui_starzbet_userMessages_title_published)}

        {": "}

        <UserMessagesPublished id={id} format={"dd MMMM, yyyy"} />
      </span>

      <div className={classes.block}>
        <UserMessageSubjectHTML id={id} className={classes.subject} qaAttribute={PlayerUIQaAttributes.NotificationsPage.Subject} />
      </div>

      <div className={classes.block}>
        <UserMessageMessageHTML id={id} className={classes.message} qaAttribute={PlayerUIQaAttributes.NotificationsPage.Message} />
      </div>
    </>
  );
});
UserMessageFull.displayName = "UserMessageFull";

export { UserMessageShort, UserMessageFull };
