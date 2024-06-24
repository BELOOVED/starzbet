import type { TPlatform_UserMessage_Fragment } from "@sb/graphql-client/PlayerUI";
import { hydrateVariableElements } from "@sb/rich-text-utils";
import { getNotNil, entries } from "@sb/utils";
import { EUserMessageVariable } from "@sb/betting-core/EUserMessageVariable";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { type TPlatformAppState } from "../../PlatformInitialState";

/**
 * Mutation of UserMessage Fragment by replacing variables in rich-text with necessary values
 */
const userMessageHydrateUserMessageVariables = (state: TPlatformAppState, ...userMessages: TPlatform_UserMessage_Fragment[]) => {
  const profile = getNotNil(
    playerDetailsSelectors.profile(state),
    ["userMessageHydrateUserMessageVariables"],
    "profile",
  );

  const variables: Record<EUserMessageVariable, string> = {
    [EUserMessageVariable.playerFirstName]: profile.name,
    [EUserMessageVariable.playerLastName]: profile.surname,
  };

  const infos = entries(variables).map(([key, value]) => ({
    variable: key,
    value,
  }));

  userMessages.forEach((it) => {
    [...it.subject, ...it.message].forEach((it) => {
      it.translate = hydrateVariableElements(it.translate, infos);
    });
  });
};

export { userMessageHydrateUserMessageVariables };
