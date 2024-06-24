import { simpleReducer, type TReducer } from "@sb/utils";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { type bannerPagesReceivedAction } from "../BannerAction";

const bannerPagesReceivedReducer: TReducer<TMixAppState, typeof bannerPagesReceivedAction> =
  simpleReducer([], ["banner", "siteMarkup", "pages"]);

export { bannerPagesReceivedReducer };
