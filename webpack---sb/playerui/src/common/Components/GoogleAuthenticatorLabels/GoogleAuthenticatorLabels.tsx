import { memo } from "react";
import classes from "./GoogleAuthenticatorLabels.module.css";

const APP_STORE_LINK = "https://apps.apple.com/us/app/google-authenticator/id388497605";
const PLAY_MARKET_LINK = "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pcampaignid=web_share";

const AppStoreLabel = memo(() => (
  <a
    href={APP_STORE_LINK}
    className={classes.appStore}
    target={"_blank"}
    rel={"noopener noreferrer"}
  />
));
AppStoreLabel.displayName = "AppStoreLabel";

const PlayMarketLabel = memo(() => (
  <a
    href={PLAY_MARKET_LINK}
    className={classes.playMarket}
    target={"_blank"}
    rel={"noopener noreferrer"}
  />
));
PlayMarketLabel.displayName = "PlayMarketLabel";

export { AppStoreLabel, PlayMarketLabel };
