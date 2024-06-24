import head from "lodash/fp/head";
import { type Selector } from "react-redux";
import {
  createPropertySelectors,
  createSimpleSelector,
  getNotNil,
  isVoid,
  type TImplicitAny,
  withParams,
} from "@sb/utils";
import type { TPlatform_Reader_Fragment } from "@sb/graphql-client/PlayerUI";
import { callManagerFailedSelector } from "@sb/call-manager";
import {
  platformui_error_somethingWentWrong,
  platformui_ticket_error_openedTicketAlreadyExists,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { type TErrorMap } from "@sb/translator";
import { EFileType } from "@sb/file-service";
import { type IWithFormsState, selectFieldValue, type TFieldPath } from "@sb/form-new";
import type { TFileFieldValue } from "@sb/file-service-extension";
import { EPlatform_TicketDepartment } from "@sb/graphql-client";
import { type IWithPlayerState } from "../../../../common/Store/Player/InitialState/PlayerInitialState";
import { playerIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { callManagerErrorTranslateParamsSelectorFactory } from "../../../Utils/СallManagerErrorTranslateParamsSelector";
import { errorCodes } from "../../Form/Model/ErrorMessages";
import { type ITicketState, type IWithTicketState } from "../TicketInitialState";
import { TICKETS_OPEN_TICKET_SYMBOL } from "../Model/Ticket";

const ticketSelector: Selector<IWithTicketState, ITicketState> = ({ ticket }) => ticket;

const ticketSelectors = createPropertySelectors(ticketSelector);

const ticketVisibleNotificationsSelector = createSimpleSelector(
  [ticketSelectors.unreadCounter],
  Boolean,
);

const ticketDetailSelectors = createPropertySelectors(ticketSelectors.detail);

const ticketDepartmentFromDetailsSelector = (s: IWithTicketState) => {
  const department = ticketDetailSelectors.department(s);

  if (department === EPlatform_TicketDepartment.affiliate) {
    throw new Error("Ticket Department is affiliate!");
  }

  return department;
};

const ticketDetailLastMassageAuthorIdSelector = (s: IWithTicketState) => {
  const messages = ticketSelector(s).detail.messages;

  if (isVoid(messages)) {
    return null;
  }

  const last = getNotNil(
    messages[messages.length - 1],
    ["ticketDetailLastMassageAuthorIdSelector"],
    "last message",
  );

  return last.author?.playerId;
};

const ticketNewMessageIdSelector = (s: IWithTicketState, newMessagesIdsList: string[]) => {
  const ticketMessages = ticketDetailSelectors.messages(s).map(({ id }) => id);

  return getNotNil(
    head(
      newMessagesIdsList.filter((messageId) =>
        !ticketMessages.includes(messageId)),
    ),
    ["ticketNewMessageIdSelector"],
    "newTicketId",
  );
};

const ticketMessageByIdSelector = (s: IWithTicketState, messageId: string) => getNotNil(
  ticketDetailSelectors.messages(s).find(({ id }) => id === messageId),
  ["TicketSelectors"],
  "ticketMessageByIdSelector",
);

const ticketIsReadSelector = (s: IWithTicketState & IWithPlayerState, readers: TPlatform_Reader_Fragment[]) => {
  const playerId = playerIdNotNilSelector(s);

  return getNotNil(
    readers
      .find(({ id }) => playerId === id),
    ["ticketIsReadSelector"],
    "reader",
  ).unread.length === 0;
};

const openTicketFailedSelector = withParams(callManagerFailedSelector, TICKETS_OPEN_TICKET_SYMBOL);

type TOpenTicketErrorMap = TErrorMap<
  TCommonTKeys,
  string,
  Record<string, TImplicitAny>
>;

//todo error code map
const openTicketErrorMap: TOpenTicketErrorMap = {
  [errorCodes.ticket_opened_ticket_already_exists]: () => [platformui_ticket_error_openedTicketAlreadyExists],
  fallback: (error) => [platformui_error_somethingWentWrong, { error }],
};

const openTicketTranslateParamsSelector = callManagerErrorTranslateParamsSelectorFactory(openTicketErrorMap);
const openTicketFailedMessageSelector = withParams(
  openTicketTranslateParamsSelector,
  TICKETS_OPEN_TICKET_SYMBOL,
);

const openTicketFormFileSelector = (state: IWithFormsState, formName: string, fieldPath: TFieldPath) => {
  const value = selectFieldValue<Partial<TFileFieldValue>>(state, formName, fieldPath);

  value?.files?.forEach(({ type }) => {
    if (type !== EFileType.temporary) {
      throw Error("ThumbsBtn use only EFileType.temporary");
    }
  });

  return value;
};

export {
  ticketDetailLastMassageAuthorIdSelector,
  ticketMessageByIdSelector,
  ticketNewMessageIdSelector,
  ticketSelectors,
  ticketDetailSelectors,
  ticketDepartmentFromDetailsSelector,
  ticketIsReadSelector,
  ticketVisibleNotificationsSelector,
  openTicketFailedMessageSelector,
  openTicketFailedSelector,
  openTicketFormFileSelector,
};
