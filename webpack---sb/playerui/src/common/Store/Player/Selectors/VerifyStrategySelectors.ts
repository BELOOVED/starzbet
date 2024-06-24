import { createSimpleSelector, isNil } from "@sb/utils";
import { EPlatform_PlayerVerifyStrategy } from "@sb/graphql-client";
import { playerDetailsSelectors } from "./PlayerSelectors";

const shouldVerifyEmailSelector = createSimpleSelector(
  [playerDetailsSelectors.verifyStrategy],
  (strategy) => {
    if (isNil(strategy)) {
      return false;
    }

    return [EPlatform_PlayerVerifyStrategy.email, EPlatform_PlayerVerifyStrategy.both].includes(strategy);
  },
);

const shouldVerifyPhoneSelector = createSimpleSelector(
  [playerDetailsSelectors.verifyStrategy],
  (strategy) => {
    if (isNil(strategy)) {
      return false;
    }

    return [EPlatform_PlayerVerifyStrategy.phone, EPlatform_PlayerVerifyStrategy.both].includes(strategy);
  },
);

export { shouldVerifyEmailSelector, shouldVerifyPhoneSelector };
