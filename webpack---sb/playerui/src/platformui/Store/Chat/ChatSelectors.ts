import { type Selector } from "react-redux";
import {
  createNotNilSelector,
  createPropertySelectors,
  createSimpleSelector,
  EMPTY_FREEZED_LIST,
  getNotNil,
  isNil,
  withParams,
} from "@sb/utils";
import { callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import { chatUserMessageByIdSelectorFactory, isServiceChatMessage, type IWithChatState } from "@sb/chat";
import { type IWithAuthState, loggedSelector } from "@sb/auth";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { playerDetailsSelectors } from "../../../common/Store/Player/Selectors/PlayerSelectors";
import { type IWithPlayerState } from "../../../common/Store/Player/InitialState/PlayerInitialState";
import { EModal } from "../../../common/Store/Modal/Model/EModal";
import { routeMap } from "../../RouteMap/RouteMap";
import { type IWithVipClubState } from "../VipClub/VipClubInitialState";
import { vipClubPlayerIconByLevelSelector } from "../VipClub/Selectors/VipClubLevelRulesSelectors";
import { vipClubPlayerStateLevelSelector } from "../VipClub/Selectors/VipClubPlayerStateSelectors";
import { type TPlatformAppState } from "../PlatformInitialState";
import { type TChatState, type TWithChatState } from "./ChatInitialState";
import { CHAT_LOADING_SYMBOL, CHAT_SEND_MESSAGE_BUTTON_CALL_SYMBOL } from "./Constants";
import { getPlayerChatMessageVipLevel } from "./ChatUtils";
import { EChatPageState, type TChatMessage, type TChatMessageAuthorRole } from "./Model";

const chatSelector: Selector<TWithChatState, TChatState> = ({ chat }) => chat;

const chatPropertySelectors = createPropertySelectors(chatSelector);

const isChatVisibleSelector = createSimpleSelector(
  [
    chatPropertySelectors.isDrawerVisible,
    routerLocationPathnameSelector,
  ],
  (isDrawerVisible, pathname) => {
    const isChatRoute = !!matchPath(pathname, routeMap.chat);

    return isChatRoute || isDrawerVisible;
  },
);

const chatPlayerNotNilBanUntilSelector = createSimpleSelector(
  [chatPropertySelectors.banInfo],
  (it) => getNotNil(it, ["chatPlayerNotNilBanUntilSelector"], "banInfo").until,
);

const isChatPlayerBannedSelector = (state: IWithAuthState & TWithChatState) => {
  const isLogged = loggedSelector(state);

  if (!isLogged) {
    return false;
  }

  return Boolean(chatPropertySelectors.banInfo(state));
};

const chatBlockedUsersIdsSelector = () => EMPTY_FREEZED_LIST as string[];

const isChatRulesExistsSelector = createSimpleSelector(
  [chatPropertySelectors.rules],
  (it) => Boolean(it?.rules),
);

const chatRulesNotNilSelector = createSimpleSelector(
  [chatPropertySelectors.rules],
  (it) => getNotNil(it?.rules, ["chatRulesNotNilSelector"], "rules"),
);

const isWithoutChatNameSelector = createSimpleSelector(
  [chatPropertySelectors.name],
  (name) => isNil(name),
);

const chatMessageSelector = chatUserMessageByIdSelectorFactory<TChatMessage>();

const isUserChatMessageSelector = createSimpleSelector(
  [chatMessageSelector],
  (it) => !isServiceChatMessage(it),
);

const chatMessageAuthorRoleSelector = createSimpleSelector(
  [chatMessageSelector],
  (it): TChatMessageAuthorRole => it.author.profile.role,
);

const chatMessagePlayerVipLevelSelector = createSimpleSelector(
  [chatMessageSelector],
  getPlayerChatMessageVipLevel,
);

const chatMessagePlayerIconSelector = (state: IWithChatState & IWithVipClubState, id: string) => {
  const level = chatMessagePlayerVipLevelSelector(state, id);

  return vipClubPlayerIconByLevelSelector(state, level);
};

const isOwnChatMessageSelector = (state: IWithChatState & IWithPlayerState, id: string) => {
  const message = chatMessageSelector(state, id);

  const playerId = playerDetailsSelectors.id(state);

  return message.author.id === playerId;
};

const chatSendMessageButtonLoadingSelector = withParams(callManagerStartedSelector, CHAT_SEND_MESSAGE_BUTTON_CALL_SYMBOL);

const modalTypeToStartChatSelector = createSimpleSelector(
  [loggedSelector, vipClubPlayerStateLevelSelector, isChatPlayerBannedSelector, isWithoutChatNameSelector],
  (logged, level, banned, withoutName) => {
    if (!logged) {
      return EModal.auth;
    }

    if (banned) {
      return EModal.chatBanInfo;
    }

    if (!level) {
      return EModal.vipClubEmpty;
    }

    if (withoutName) {
      return EModal.chatNameForm;
    }

    return undefined;
  },
);
const chatEnabledSelector = chatPropertySelectors.isActive;

const chatControlsDisableSelector = createSimpleSelector(
  [chatEnabledSelector, chatSendMessageButtonLoadingSelector, isChatPlayerBannedSelector, modalTypeToStartChatSelector],
  (enabled, isLoading, isBanned, modalType) => !enabled || isLoading || !!modalType || isBanned,
);

const chatPageStateSelector = (state: TPlatformAppState) => {
  const started = callManagerStartedSelector(state, CHAT_LOADING_SYMBOL);
  const succeeded = callManagerSucceededSelector(state, CHAT_LOADING_SYMBOL);

  if (started && !succeeded) {
    return EChatPageState.loading;
  }

  return EChatPageState.full;
};

const notNilPinnedMessageSelector = createNotNilSelector(chatPropertySelectors.pinnedMessage, ["notNilPinnedMessageSelector"], "pinnedMessage");

export {
  chatPropertySelectors,
  chatPlayerNotNilBanUntilSelector,
  isChatPlayerBannedSelector,
  chatBlockedUsersIdsSelector,
  isChatRulesExistsSelector,
  chatRulesNotNilSelector,
  isUserChatMessageSelector,
  chatMessageAuthorRoleSelector,
  chatMessagePlayerVipLevelSelector,
  chatMessagePlayerIconSelector,
  isOwnChatMessageSelector,
  chatSendMessageButtonLoadingSelector,
  chatMessageSelector,
  isWithoutChatNameSelector,
  chatControlsDisableSelector,
  modalTypeToStartChatSelector,
  chatEnabledSelector,
  chatPageStateSelector,
  isChatVisibleSelector,
  notNilPinnedMessageSelector,
};
