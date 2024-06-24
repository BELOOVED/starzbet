import { createRootReducer } from "@sb/utils";
import { bannerPagesReceivedAction } from "../BannerAction";
import { bannerPagesReceivedReducer } from "./BannerPagesReceivedReducer";

const bannerRootReducer = createRootReducer([
  [bannerPagesReceivedReducer, bannerPagesReceivedAction],
]);

export { bannerRootReducer };
