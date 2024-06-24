import { createOptionalPropertySelector, createPropertySelectors, createSimpleSelector, getNotNil, isNil } from "@sb/utils";
import { EVerificationStatusEnum } from "@sb/graphql-client";
import { type IWithPlayerState } from "../InitialState/PlayerInitialState";
import { playerDetailsSelectors, playerSelectors } from "./PlayerSelectors";

const emailFromTokenSelector = createOptionalPropertySelector(playerDetailsSelectors.emailVerificationToken, "email");

const statusEmailVerificationTokenSelector = createOptionalPropertySelector(playerDetailsSelectors.emailVerificationToken, "status");

const verifiedEmailVerificationTokenSelector = (state: IWithPlayerState) => {
  const status = statusEmailVerificationTokenSelector(state);

  return status === undefined ? true : status === EVerificationStatusEnum.verified;
};

const phoneVerificationTokenSelector = (state: IWithPlayerState) => getNotNil(
  playerDetailsSelectors.phoneVerificationToken(state),
  ["phoneVerificationTokenSelector"],
  "phoneVerificationToken",
);

const playerPhoneNumberSelector = createSimpleSelector(
  [playerDetailsSelectors.phoneVerificationToken],
  (phoneVerificationToken) => phoneVerificationToken?.phoneNumber,
);

const phoneVerificationTokenSelectors = createPropertySelectors(phoneVerificationTokenSelector);

const verifiedPhoneVerificationTokenSelector = createSimpleSelector(
  [
    playerDetailsSelectors.phoneVerificationToken,
    playerSelectors.verify,
  ],
  (token, verify) => {
    const verified = isNil(token?.status) ? true : token.status === EVerificationStatusEnum.verified;

    return verified || verify.optimisticVerifiedPhone;
  },
);

export {
  emailFromTokenSelector,
  verifiedEmailVerificationTokenSelector,
  phoneVerificationTokenSelectors,
  verifiedPhoneVerificationTokenSelector,
  playerPhoneNumberSelector,
};
