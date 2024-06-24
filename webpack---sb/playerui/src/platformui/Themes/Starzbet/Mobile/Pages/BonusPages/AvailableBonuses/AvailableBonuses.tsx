import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_accountPage_name_bonuses,
  platformui_starzbet_bonus_emptyPage_available_placeholder,
  platformui_starzbet_bonus_tabs_available,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotEmpty } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { Empty } from "../../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { Loader } from "../../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import {
  availableBonusIdsForOffersFilteredSelector,
} from "../../../../../../Store/Bonuses/Selectors/BonusesSelectors";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { availableBonusesLoadingSelector } from "../../../../../../Store/Bonuses/Selectors/BonusCallManagerSelectors";
import { AvailableBonusCard } from "../../../../Components/Bonuses/Cards/AvailableBonusCard/AvailableBonusCard";
import { BonusAccountPage } from "../../../Components/AccountPage/AccountPage";
import { BonusPageLayout, CardsWrapper } from "../../../Components/Bonuses/BonusPageLayout/BonusPageLayout";
import {
  AvailableBonusCardContent,
} from "../../../Components/Bonuses/Cards/AvailableBonusCardContent/AvailableBonusCardContent";
import { type TPageHeaderSourceMap } from "../../../Components/PageHeader/PageHeader";

interface IAvailableBonusesContentProps {
  availableBonusIds: string[];
}

const AvailableBonusesContent = memo<IAvailableBonusesContentProps>(({ availableBonusIds }) => (
  <CardsWrapper>
    {
      availableBonusIds.map((id) => (
        <AvailableBonusCard id={id} key={id}>
          <AvailableBonusCardContent />
        </AvailableBonusCard>
      ))
    }
  </CardsWrapper>
));
AvailableBonusesContent.displayName = "AvailableBonusesContent";

const HEADER_ROUTE_MAP: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_accountPage_name_bonuses,
    path: routeMap.bonusesRoute,
  },
  {
    titleTKey: platformui_starzbet_bonus_tabs_available,
  },
];

const AfterLoadingContent = memo(() => {
  const availableBonusIds = useSelector(availableBonusIdsForOffersFilteredSelector);

  return isNotEmpty(availableBonusIds)
    ? <AvailableBonusesContent availableBonusIds={availableBonusIds} />
    : <Empty messageTKey={platformui_starzbet_bonus_emptyPage_available_placeholder} />;
});
AfterLoadingContent.displayName = "AfterLoadingContent";

const AvailableBonuses = memo(() => {
  const [t] = useTranslation();
  const loading = useSelector(availableBonusesLoadingSelector);

  return (
    <BonusAccountPage
      routeMap={HEADER_ROUTE_MAP}
      title={t(platformui_starzbet_accountPage_name_bonuses)}
    >
      <BonusPageLayout>
        {loading ? <Loader /> : <AfterLoadingContent />}
      </BonusPageLayout>
    </BonusAccountPage>
  );
});
AvailableBonuses.displayName = "AvailableBonuses";

export { AvailableBonuses };
