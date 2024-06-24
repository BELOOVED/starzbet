import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_games_recentlyPlayed } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../../Desktop/Pages/GamesPage/GamesPage.module.css";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { LoggedContainer } from "../../../../../common/Containers/LoggedContainer/LoggedContainer";
import { gameRecentlySelector, loadingRecentlyGamesSelector } from "../../../../Store/Games/Selectors/GamesRecentlyPlayedSelectors";
import { GamesSection } from "../GamesSection/GamesSection";
import { NoRecentlyPlayedGames } from "../NoRecentlyPlayedGames/NoRecentlyPlayedGames";

const RecentlyGamesSection = memo(() => {
  const ids = useSelector(gameRecentlySelector);
  const [t] = useTranslation();

  return (
    <GamesSection
      sectionTitle={t(platformui_starzbet_games_recentlyPlayed)}
      markerColor={"72 145 255"}
      gameIds={ids}
      imgSize={160}
      className={classes.gamesSection}
      fallBackContent={<NoRecentlyPlayedGames />}
    />
  );
});
RecentlyGamesSection.displayName = "RecentlyGamesSection";

const RecentlyPlayed = memo(() => {
  const loading = useSelector(loadingRecentlyGamesSelector);

  return (
    <div className={classes.recentlyWrapper}>
      {
        loading
          ? (
            <div className={classes.loadingContainer}>
              <Loader />
            </div>
          )
          : <RecentlyGamesSection />
      }
    </div>
  );
});
RecentlyPlayed.displayName = "RecentlyPlayed";

const RecentlyPlayedGames = memo(() => <LoggedContainer logged={<RecentlyPlayed />} notLogged={null} />);
RecentlyPlayedGames.displayName = "RecentlyPlayedGames";

export {
  RecentlyPlayedGames,
};
