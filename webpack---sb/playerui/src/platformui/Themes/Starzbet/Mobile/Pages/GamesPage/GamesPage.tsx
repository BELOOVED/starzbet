import { memo } from "react";
import { Route, type RouteComponentProps, Switch } from "react-router-dom";
import { useParamSelector } from "@sb/utils";
import classes from "./GamesPage.module.css";
import { type TGameProviderEnum } from "../../../../../../common/Store/Provider/ProviderModel";
import { NativeHorizontalScroll } from "../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { type IWithGamePage } from "../../../../../Store/Games/Model/Games";
import {
  combineProvidersPathByGamePageMap,
  labelPathByGamePageMap,
  providerPathByGamePageMap,
} from "../../../../../Utils/GetGamesViewParams";
import { gameLabelIdsWithGamesByPageSelector } from "../../../../../Store/Games/Selectors/GameLabelIdsWithGamesByPageSelectors";
import { GamesRedirect } from "../../../Desktop/Pages/GamesPage/GamesRedirect";
import { GamePromotions } from "../../../Components/CMSComponents/GamePromotions/GamePromotions";
import { RecentlyPlayedGames } from "../../../Components/RecentlyPlayedGames/RecentlyPlayedGames";
import { GamesTopWinners } from "../../../Components/GamesTopWinners/GamesTopWinners";
import { LabelGames } from "../../Components/GameLayout/Games/LabelGames";
import { CombineProviderGames, ProviderGames } from "../../Components/GameLayout/Games/ProviderGames";
import { CasinoBottomMenu } from "../../Components/CasinoBottomMenu/CasinoBottomMenu";
import { ProvidersCheckboxModal } from "../../Components/ProvidersCheckboxModal/ProvidersCheckboxModal";
import { Label } from "../../Components/Label/Label";

const AllLabels = memo<IWithGamePage>(({ page }) => {
  const labelIds = useParamSelector(gameLabelIdsWithGamesByPageSelector, [page]);

  return (
    <NativeHorizontalScroll>
      <div className={classes.labels}>
        {
          labelIds.map((id) => (
            <Label labelId={id} page={page} key={id} />
          ))
        }
      </div>
    </NativeHorizontalScroll>
  );
});
AllLabels.displayName = "AllLabels";

const GamesPage = memo<IWithGamePage>(({
  page,
}) => {
  const providerPath = providerPathByGamePageMap[page];
  const renderLabel = (props: RouteComponentProps<{ labelId: string; }>) =>
    <LabelGames {...props} page={page} />;
  const renderProvider = (props: RouteComponentProps<{ provider: TGameProviderEnum; }>) => (
    <ProviderGames
      {...props}
      page={page}
    />
  );

  return (
    <div className={classes.demoWrap}>
      <GamePromotions />

      <div className={classes.container}>
        <div className={classes.filterMenu}>
          <AllLabels page={page} />

          <ProvidersCheckboxModal page={page} />
        </div>

        <Switch>
          <Route path={combineProvidersPathByGamePageMap[page]}>
            <CombineProviderGames page={page} />
          </Route>

          <Route path={labelPathByGamePageMap[page]} render={renderLabel} />

          <Route path={providerPath} render={renderProvider} />

          <GamesRedirect page={page} />
        </Switch>

        <RecentlyPlayedGames />

        <div className={classes.topWinners}>
          <GamesTopWinners />
        </div>

        <CasinoBottomMenu page={page} />
      </div>
    </div>
  );
});
GamesPage.displayName = "GamesPage";

export { GamesPage };
