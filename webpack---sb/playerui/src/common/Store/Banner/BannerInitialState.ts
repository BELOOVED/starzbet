import type { TBanner_SitePage_Fragment } from "@sb/graphql-client/PlayerUI";
import { isNotNil } from "@sb/utils";
import type { TWithIsServerLoaded } from "../../IWith";

interface IBannerState {
  siteMarkup: {
    pages: TBanner_SitePage_Fragment[];
  };
}

interface IWithBannerState {
  banner: TWithIsServerLoaded<IBannerState, "siteMarkup">;
}

interface IWithBannerPreloadedState {
  banner: Partial<IBannerState>;
}

const getBannerInitialState = (preloadedState?: IWithBannerPreloadedState["banner"]): IWithBannerState => ({
  banner: {
    siteMarkup: {
      pages: preloadedState?.siteMarkup?.pages ?? [],
      isServerLoaded: isNotNil(preloadedState?.siteMarkup),
    },
  },
});

export { getBannerInitialState, type IWithBannerState, type IWithBannerPreloadedState };
