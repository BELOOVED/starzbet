import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_accountPage_name_bonuses,
  platformui_starzbet_bonus_emptyPage_myBonuses_placeholder,
  platformui_starzbet_bonus_tabs_myBonuses,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotEmpty } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { Empty } from "../../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { Loader } from "../../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import {
  playerBonusIdsForOffersFilteredSelector,
} from "../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { playerBonusesLoadingSelector } from "../../../../../../Store/Bonuses/Selectors/BonusCallManagerSelectors";
import { PlayerBonusCard } from "../../../../Components/Bonuses/Cards/PlayerBonusCard/PlayerBonusCard";
import { BonusPageLayout, CardsWrapper } from "../../../Components/Bonuses/BonusPageLayout/BonusPageLayout";
import {
  PlayerBonusCardContent,
} from "../../../Components/Bonuses/Cards/PlayerBonusCardContent/PlayerBonusCardContent";
import { type TPageHeaderSourceMap } from "../../../Components/PageHeader/PageHeader";
import { BonusAccountPage } from "../../../Components/AccountPage/AccountPage";

interface IPlayerBonusesContentProps {
  playerBonusIds: string[];
}

const PlayerBonusesContent = memo<IPlayerBonusesContentProps>(({ playerBonusIds }) => (
  <CardsWrapper>
    {
      playerBonusIds.map((id) => (
        <PlayerBonusCard playerBonusId={id} key={id}>
          <PlayerBonusCardContent />
        </PlayerBonusCard>
      ))
    }
  </CardsWrapper>
));
PlayerBonusesContent.displayName = "PlayerBonusesContent";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_accountPage_name_bonuses,
    path: routeMap.bonusesRoute,
  },
  {
    titleTKey: platformui_starzbet_bonus_tabs_myBonuses,
  },
];

const AfterLoadingContent = memo(() => {
  const playerBonusIds = useSelector(playerBonusIdsForOffersFilteredSelector);

  return isNotEmpty(playerBonusIds)
    ? <PlayerBonusesContent playerBonusIds={playerBonusIds} />
    : <Empty messageTKey={platformui_starzbet_bonus_emptyPage_myBonuses_placeholder} />;
});
AfterLoadingContent.displayName = "AfterLoadingContent";

const PlayerBonuses = memo(() => {
  const [t] = useTranslation();
  const loading = useSelector(playerBonusesLoadingSelector);

  return (
    <BonusAccountPage
      routeMap={headerRouteMap}
      title={t(platformui_starzbet_accountPage_name_bonuses)}
    >
      <BonusPageLayout>
        {loading ? <Loader /> : <AfterLoadingContent />}
      </BonusPageLayout>
    </BonusAccountPage>
  );
});
PlayerBonuses.displayName = "PlayerBonuses";

export { PlayerBonuses };
