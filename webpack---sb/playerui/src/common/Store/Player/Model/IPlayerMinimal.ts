import { getNotNil, isAlpha3Code } from "@sb/utils";
import { type TCallResponsePayload } from "@sb/sdk";
import { type call_LoginPlayerCommand } from "@sb/sdk/SDKClient/platformplayer";
import { type TVerificationStrategy } from "@sb/sdk/authprofile/model/VerificationStrategy";
import { type TPlatform_PlayerProfile_Fragment } from "@sb/graphql-client/PlayerUI";
import { EPlatform_Typename, ETypename } from "@sb/graphql-client";
import { isCurrencyCode } from "../../../IsCurrencyCode";
import { EHonorific } from "./EHonorific";
import { stubPermissions, type TPermissions } from "./Permissions";

type TVerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

interface IEmailVerificationToken {
  email: string;
  expiryAt: string;
  id: string;
  status: TVerificationStatus;
}

interface IPhoneVerificationToken {
  expiryAt: string;
  id: string;
  phoneNumber: string;
  status: TVerificationStatus;
}

interface IPlayerMinimal {
  createdAt: string;
  emailVerificationToken?: IEmailVerificationToken | null | undefined;
  groupId: string;
  id: string;
  login: string;
  phoneVerificationToken?: IPhoneVerificationToken | null | undefined;
  profile: TPlatform_PlayerProfile_Fragment;
  profileRefId: string;
  testPlayer: boolean;
  verificationStrategy: TVerificationStrategy;
  verified: boolean;
  permissions: TPermissions;
  twoFactorAuthenticationEnabled: boolean;
}

const isHonorificEnum = (honorific: unknown): honorific is EHonorific => (
  typeof honorific === "string" && Object.values(EHonorific).includes(honorific as EHonorific)
);

const normalizePlayerMinimal = (player: TCallResponsePayload<typeof call_LoginPlayerCommand>["player"]): IPlayerMinimal => {
  const notNilPlayer = getNotNil(player, ["IPlayerMinimal", "normalizePlayerMinimal"], "player");
  const profile = getNotNil(notNilPlayer.profile, ["IPlayerMinimal", "normalizePlayerMinimal"], "profile");

  const {
    currency,
    honorific,
    country: { alpha3, ...restCountry },
    identityNumber,
    ...rest
  } = profile;

  if (!isCurrencyCode(currency)) {
    throw new Error("normalizePlayerMinimal: invalid profile.currency");
  }

  if (!isHonorificEnum(honorific)) {
    throw new Error("normalizePlayerMinimal: invalid profile.honorific");
  }
  if (!isAlpha3Code(alpha3)) {
    throw new Error("normalizePlayerMinimal: invalid country.alpha3");
  }

  return {
    createdAt: notNilPlayer.createdAt,
    emailVerificationToken: notNilPlayer.emailVerificationToken,
    groupId: notNilPlayer.groupId,
    id: notNilPlayer.id,
    login: notNilPlayer.login,
    phoneVerificationToken: notNilPlayer.phoneVerificationToken,
    profileRefId: notNilPlayer.profileRefId,
    testPlayer: notNilPlayer.testPlayer,
    verificationStrategy: notNilPlayer.verificationStrategy,
    verified: notNilPlayer.verified,
    permissions: notNilPlayer.permissions || stubPermissions,
    twoFactorAuthenticationEnabled: notNilPlayer.twoFactorAuthenticationEnabled,

    profile: {
      __typename: EPlatform_Typename.platformPlayerProfile,
      currency,
      honorific,
      country: { alpha3, __typename: ETypename.countryV2, ...restCountry },
      identityNumber: identityNumber ?? null,
      ...rest,
    },
  };
};

export { type IPlayerMinimal, normalizePlayerMinimal };
