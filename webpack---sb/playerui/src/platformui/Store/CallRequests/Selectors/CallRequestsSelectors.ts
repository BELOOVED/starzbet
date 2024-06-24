import { createMemoSelector, createPropertySelectors, createSimpleSelector, ELocale, getNotNil } from "@sb/utils";
import { type ECallOptionName } from "@sb/betting-core/ECallOptionName";
import { Logger } from "../../../../common/Utils/Logger";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ICallRequestState } from "../CallRequestsInitialState";

const callRequestsSelector = ({ callRequests }: TPlatformAppState) => callRequests;

const callRequestsSelectors = createPropertySelectors(callRequestsSelector);

const callRequestsRequestsSelector = callRequestsSelectors.requests;

const callRequestsPageInfoSelector = callRequestsSelectors.pageInfo;

const callRequestsVariablesSelector = callRequestsSelectors.variables;

const callRequestsOptionsSelector = callRequestsSelectors.options;

const optionNameSelector = (_: ICallRequestState, optionName: ECallOptionName) => optionName;

const callRequestsOptionSelector = createSimpleSelector(
  [
    optionNameSelector,
    callRequestsOptionsSelector,
  ],
  (optionName, options) => getNotNil(
    options.find((option) => option.callOptionName === optionName),
    ["callRequestsOptionSelector"],
    `${options.map((option) => `\n${option.callOptionName}`).join("//")} :: ${optionName}`,
  ),
);

const callRequestsOptionMessageToPlayerSelector = createSimpleSelector(
  [
    localeSelector,
    callRequestsOptionSelector,
  ],
  (locale, { messageToPlayers }) => {
    const message = messageToPlayers.find((it) => it.locale === locale);

    if (message) {
      return message.translate;
    }

    const fallbackMessage = messageToPlayers.find((it) => it.locale === ELocale.en_US);

    if (fallbackMessage) {
      Logger.warn.app(`Call Option Message by locale en_US was used as fallback because there is no message for current locale: ${locale}`);

      return fallbackMessage.translate;
    }

    throw new Error(`Unable to get Call Option Message for current locale neither for en_US: ${JSON.stringify(messageToPlayers)}`);
  },
);

const callRequestsOptionLinkSelector = createSimpleSelector(
  [callRequestsOptionSelector],
  (option) => option.qrCode,
);

const callRequestsActiveOptionsSelector = createMemoSelector(
  [callRequestsOptionsSelector],
  (options) => options.filter((it) => it.active),
);

export {
  callRequestsRequestsSelector,
  callRequestsPageInfoSelector,
  callRequestsVariablesSelector,
  callRequestsOptionMessageToPlayerSelector,
  callRequestsOptionLinkSelector,
  callRequestsSelectors,
  callRequestsActiveOptionsSelector,
};
