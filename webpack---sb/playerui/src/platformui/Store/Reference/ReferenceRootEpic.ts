import { distinctUntilChanged, first, map, tap } from "rxjs/operators";
import { merge } from "rxjs";
import { replace, routerLocationPathnameSelector, routerLocationSearchSelector, routerLocationSelector } from "@sb/router";
import { isNotNil } from "@sb/utils";
import { type TAppEpic } from "../../../common/Store/Root/Epics/TAppEpic";
import { setCookie } from "../../Utils/Cookie";
import { myAffiliatesReferralLinkStringify, nativeReferralLinkStringify } from "./GetReferralLink";

const MAX_AGE = 60 * 60 * 24 * 30; //30d

const REFERRAL_LINK = "referralLink";

const NATIVE_REF_KEY = "ref";
const NATIVE_CAMPAIGN_KEY = "campaign";
const NATIVE_FILE_KEY = "file";

const MY_AFFILIATES_TOKEN_KEY = "token";
const MY_AFFILIATES_AFF_ID_KEY = "affid";

const setNativeReferenceToCookieAndClearQuery = (ref: string, query: URLSearchParams) => {
  const campaign = query.get(NATIVE_CAMPAIGN_KEY);
  const file = query.get(NATIVE_FILE_KEY);

  query.delete(NATIVE_REF_KEY);
  query.delete(NATIVE_CAMPAIGN_KEY);
  query.delete(NATIVE_FILE_KEY);

  setCookie(REFERRAL_LINK, nativeReferralLinkStringify(ref, campaign, file), { "max-age": MAX_AGE });
};

const setMyAffiliatesReferenceToCookieAndClearQuery = (token: string, query: URLSearchParams) => {
  const affiliateHashedId = query.get(MY_AFFILIATES_AFF_ID_KEY);

  if (isNotNil(affiliateHashedId)) {
    query.delete(MY_AFFILIATES_AFF_ID_KEY);
  }
  query.delete(MY_AFFILIATES_TOKEN_KEY);

  setCookie(REFERRAL_LINK, myAffiliatesReferralLinkStringify(token, affiliateHashedId), { "max-age": MAX_AGE });
};

const referenceRootEpic: TAppEpic = (action$, state$) => (
  merge(
    state$.pipe(
      map(routerLocationSelector),
      distinctUntilChanged(),
      map(({ search }) => {
        const query = new URLSearchParams(search);

        return query.get(NATIVE_REF_KEY);
      }),
      first(isNotNil),
      tap((ref) => setNativeReferenceToCookieAndClearQuery(ref, new URLSearchParams(routerLocationSearchSelector(state$.value)))),
      map(() => replace(routerLocationPathnameSelector(state$.value))),
    ),

    state$.pipe(
      map(routerLocationSelector),
      distinctUntilChanged(),
      map(({ search }) => {
        const query = new URLSearchParams(search);

        return query.get(MY_AFFILIATES_TOKEN_KEY);
      }),
      first(isNotNil),
      tap((token) => setMyAffiliatesReferenceToCookieAndClearQuery(token, new URLSearchParams(routerLocationSearchSelector(state$.value)))),
      map(() => replace(routerLocationPathnameSelector(state$.value))),
    ),
  )
);

export { REFERRAL_LINK, referenceRootEpic };
