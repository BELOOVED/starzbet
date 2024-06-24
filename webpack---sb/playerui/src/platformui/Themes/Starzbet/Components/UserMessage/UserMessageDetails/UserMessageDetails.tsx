import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_userMessages_detailedMessage_noData } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./UserMessageDetails.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { EUserMessageState } from "../../../../../Store/UserMessage/UserMessageModels";
import { userMessageDetailedMessageStateSelector } from "../../../../../Store/UserMessage/UserMessageSelectors";
import { UserMessageFull } from "../UserMessage";

const NoData = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.noData}>
      {t(platformui_starzbet_userMessages_detailedMessage_noData)}
    </div>
  );
});
NoData.displayName = "NoData";

const Message = memo(() => (
  <div className={classes.details}>
    <UserMessageFull />
  </div>
));
Message.displayName = "Message";

const USER_MESSAGE_DETAILS_STATE_TO_COMPONENT_TYPE_MAP: Record<EUserMessageState, ComponentType> = {
  [EUserMessageState.loading]: Loader,
  [EUserMessageState.empty]: NoData,
  [EUserMessageState.full]: Message,
};

const UserMessageDetails = memo(() => {
  const state = useSelector(userMessageDetailedMessageStateSelector);

  return createElement(USER_MESSAGE_DETAILS_STATE_TO_COMPONENT_TYPE_MAP[state]);
});
UserMessageDetails.displayName = "UserMessageDetails";

export { UserMessageDetails };
