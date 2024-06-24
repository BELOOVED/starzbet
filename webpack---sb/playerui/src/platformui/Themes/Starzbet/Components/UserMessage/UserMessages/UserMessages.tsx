import clsx from "clsx";
import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_userMessages_button_loadMore,
  platformui_starzbet_userMessages_message_noData,
  platformui_starzbet_userMessages_title_received,
  platformui_starzbet_userMessages_title_subject,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useAction, withCondition } from "@sb/utils";
import classes from "./UserMessages.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { EUserMessageState } from "../../../../../Store/UserMessage/UserMessageModels";
import {
  userMessageHasMoreMessagesSelector,
  userMessagePropertySelectors,
  userMessageStateSelector,
} from "../../../../../Store/UserMessage/UserMessageSelectors";
import { userMessageLoadMoreMessagesAction } from "../../../../../Store/UserMessage/UserMessageActions";
import { UserMessageShort } from "../UserMessage";

const LoadMoreButton = withCondition(
  userMessageHasMoreMessagesSelector,
  memo(() => {
    const [t] = useTranslation();
    const loadMore = useAction(userMessageLoadMoreMessagesAction);

    return (
      <div className={classes.loadMoreButtonContainer}>
        <Button
          colorScheme={"orange-gradient"}
          onClick={loadMore}
          capitalize
        >
          {t(platformui_starzbet_userMessages_button_loadMore)}
        </Button>
      </div>
    );
  }),
);
LoadMoreButton.displayName = "LoadMoreButton";

const NoData = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.noData}>
      {t(platformui_starzbet_userMessages_message_noData)}
    </div>
  );
});
NoData.displayName = "NoData";

const TableHeader = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={clsx(classes.tableHeader, classes.tableRow)}>
      <span className={classes.empty} />

      <Ellipsis>{t(platformui_starzbet_userMessages_title_subject)}</Ellipsis>

      <div>{t(platformui_starzbet_userMessages_title_received)}</div>
    </div>
  );
});
TableHeader.displayName = "TableHeader";

const Messages = memo(() => {
  const [t] = useTranslation();
  const ids = useSelector(userMessagePropertySelectors.messageIds);

  return (
    <div className={classes.messages}>
      <div className={clsx(classes.tableHeader, classes.tableRow)}>
        <span className={classes.empty} />

        <Ellipsis>{t(platformui_starzbet_userMessages_title_subject)}</Ellipsis>

        <div>{t(platformui_starzbet_userMessages_title_received)}</div>
      </div>

      {ids.map((it) => <UserMessageShort key={it} id={it} />)}

      <LoadMoreButton />
    </div>
  );
});
Messages.displayName = "Messages";

const USER_MESSAGE_STATE_TO_COMPONENT_TYPE_MAP: Record<EUserMessageState, ComponentType> = {
  [EUserMessageState.loading]: Loader,
  [EUserMessageState.empty]: NoData,
  [EUserMessageState.full]: Messages,
};

const UserMessages = memo(() => {
  const state = useSelector(userMessageStateSelector);

  return createElement(USER_MESSAGE_STATE_TO_COMPONENT_TYPE_MAP[state]);
});
UserMessages.displayName = "UserMessages";

export { UserMessages };
