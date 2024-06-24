import type { TBanner_SitePage_Fragment } from "@sb/graphql-client/PlayerUI";

const bannerPagesReceivedAction = (payload: TBanner_SitePage_Fragment[]) => ({
  type: "@BANNER/PAGES_RECEIVED",
  payload,
});

export { bannerPagesReceivedAction };
