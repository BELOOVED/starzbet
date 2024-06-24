import { memo } from "react";
import classes from "./LandingPage.module.css";
import { IS_STARZBET_KG } from "../../../../../../ServerEnvironment";
import { scrollToTop } from "../../../../../Utils/ScrollToTop";
import { ProductsArea } from "../../../Components/ProductsArea/ProductsArea";
import { LandingGamesSection } from "../../../Components/LandingSection/LandingSection";
import { TopWinners } from "../../../Components/TopWinners/TopWinners";
import { LandingTopLeaguesSectionMobile } from "../../../Components/LandingTopLeaguesSection/LandingTopLeaguesSection";
import { LandingLiveSpins } from "../../../Components/LandingLiveSpins/LandingLiveSpins";

const LandingPage = memo(() => {
  scrollToTop();

  return (
    <div className={classes.landingPage}>
      <ProductsArea className={classes.landingPageProducts} />

      <div className={classes.landingPageSections}>
        <TopWinners />

        <LandingGamesSection />

        <LandingLiveSpins />

        {IS_STARZBET_KG ? null : <LandingTopLeaguesSectionMobile />}
      </div>
    </div>
  );
});
LandingPage.displayName = "LandingPage";

export { LandingPage };
