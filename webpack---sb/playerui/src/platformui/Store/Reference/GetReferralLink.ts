import { type TCallPayload } from "@sb/sdk";
import { type call_RegisterPlayerCommand } from "@sb/sdk/SDKClient/platformplayer";
import { JSONParse } from "@sb/utils";

type TReferralLink = TCallPayload<typeof call_RegisterPlayerCommand>["customerReferralLink"]

const parseReferralLink = (value: string) => JSONParse<TReferralLink>(decodeURIComponent(value));

const nativeReferralLinkStringify = (ref: string, campaign: string | null, file: string | null) => JSON.stringify(
  {
    ref,
    campaign,
    file,
    __payloadKind: "Native",
  },
);

const myAffiliatesReferralLinkStringify = (token: string, affId: string | null) => JSON.stringify(
  { token, affId, __payloadKind: "MyAffiliates" },
);

export { parseReferralLink, nativeReferralLinkStringify, myAffiliatesReferralLinkStringify };
