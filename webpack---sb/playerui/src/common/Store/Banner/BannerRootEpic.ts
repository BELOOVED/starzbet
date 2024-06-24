import { EMPTY } from "rxjs";
import { bannerSiteMarkupQueryOptionalFields, query_Banner_SiteMarkup } from "@sb/graphql-client/PlayerUI";
import { getNotNil, isNotNil } from "@sb/utils";
import type { TGQLClient } from "@sb/graphql-client";
import { type TPlatformEpic } from "../../../platformui/Store/Root/Epic/TPlatformEpic";
import { gqlLoadingFactory } from "../../Utils/EpicUtils/GqlLoadingFactory";
import { bannerPagesReceivedAction } from "./BannerAction";
import { BANNERS_LOADING_SYMBOL, bannerSiteMarkupSelectors } from "./Selectors/BannerSelectors";

const bannerRootEpic: TPlatformEpic = (action$, state$, deps) => {
  const isServerLoaded = bannerSiteMarkupSelectors.isServerLoaded(state$.value);

  if (isServerLoaded) {
    return EMPTY;
  }

  return gqlLoadingFactory(
    BANNERS_LOADING_SYMBOL,
    query_Banner_SiteMarkup,
    {
      optionalFields: bannerSiteMarkupQueryOptionalFields,
      variables: {},
    },
    bannerPagesReceivedAction,
    (response) => [getNotNil(response.banner.SiteMarkup, ["Load banners"], "Null after filter").pages],
    (response) => isNotNil(response.banner.SiteMarkup),
  )(action$, state$, deps);
};

const gql_Banner_SiteMarkupQuery = (graphQLClient: TGQLClient) =>
  query_Banner_SiteMarkup(
    graphQLClient,
    {
      optionalFields: bannerSiteMarkupQueryOptionalFields,
      variables: {},
    },
  ).then((response) => response.banner.SiteMarkup ?? undefined);

export { bannerRootEpic, gql_Banner_SiteMarkupQuery };
