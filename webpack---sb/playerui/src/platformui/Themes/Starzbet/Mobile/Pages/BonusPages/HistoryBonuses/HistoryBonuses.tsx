import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_accountPage_name_bonuses,
  platformui_starzbet_bonus_emptyPage_history_placeholder,
  platformui_starzbet_bonus_tabs_history,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotEmpty } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { Empty } from "../../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { Loader } from "../../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import {
  playerHistoryBonusIdsFilteredSelector,
} from "../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { historyBonusesLoadingSelector } from "../../../../../../Store/Bonuses/Selectors/BonusCallManagerSelectors";
import { HistoryBonusCard } from "../../../../Components/Bonuses/Cards/HistoryBonusCard/HistoryBonusCard";
import { BonusAccountPage } from "../../../Components/AccountPage/AccountPage";
import { BonusPageLayout, CardsWrapper } from "../../../Components/Bonuses/BonusPageLayout/BonusPageLayout";
import {
  HistoryBonusCardContent,
} from "../../../Components/Bonuses/Cards/HistoryBonusCardContent/HistoryBonusCardContent";
import { type TPageHeaderSourceMap } from "../../../Components/PageHeader/PageHeader";

interface IHistoryBonusesContentProps {
  historyBonusIds: string[];
}

const HistoryBonusesContent = memo<IHistoryBonusesContentProps>(({ historyBonusIds }) => (
  <CardsWrapper>
    {
      historyBonusIds.map((id) => (
        <HistoryBonusCard historyBonusId={id} key={id}>
          <HistoryBonusCardContent />
        </HistoryBonusCard>
      ))
    }
  </CardsWrapper>
));
HistoryBonusesContent.displayName = "HistoryBonusesContent";

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
    titleTKey: platformui_starzbet_bonus_tabs_history,
  },
];

const AfterLoadingContent = memo(() => {
  const historyBonusIds = useSelector(playerHistoryBonusIdsFilteredSelector);

  return isNotEmpty(historyBonusIds)
    ? <HistoryBonusesContent historyBonusIds={historyBonusIds} />
    : <Empty messageTKey={platformui_starzbet_bonus_emptyPage_history_placeholder} />;
});
AfterLoadingContent.displayName = "AfterLoadingContent";

const HistoryBonuses = memo(() => {
  const [t] = useTranslation();
  const loading = useSelector(historyBonusesLoadingSelector);

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
HistoryBonuses.displayName = "HistoryBonuses";

export { HistoryBonuses };
