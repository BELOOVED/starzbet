import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_see_all } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./ProviderName.module.css";
import {
  gameProviderName,
  gameProviderTabs,
  type TGameProviderEnum,
} from "../../../../../common/Store/Provider/ProviderModel";
import { NavLinkToTop } from "../../../../../common/Components/LinkToTop/LinkToTop";
import { ProviderIconWithContainer } from "../../../../Components/ProviderIcon/ProviderIcon";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { type IWithGamePage } from "../../../../Store/Games/Model/Games";
import { providerPathByGamePageMap } from "../../../../Utils/GetGamesViewParams";

interface IProviderNameProps extends IWithGamePage {
  provider: TGameProviderEnum;
  withShowAll?: boolean;
}

type TShowAllLinkProps = Omit<IProviderNameProps, "withShowAll">;

const ShowAllLink = memo<TShowAllLinkProps>(({ provider, page }) => {
  const [t] = useTranslation();
  const params = { provider: gameProviderTabs[provider] };

  return (
    <NavLinkToTop to={providerPathByGamePageMap[page]} params={params} className={classes.showAll}>
      <Ellipsis>
        {t(platformui_starzbet_see_all)}
      </Ellipsis>
    </NavLinkToTop>
  );
});
ShowAllLink.displayName = "ShowAllLink";

const ProviderName = memo<IProviderNameProps>(({ provider, withShowAll, page }) => (
  <div className={classes.providerNameWrapper} data-name={"title"}>
    <div className={classes.providerName}>
      <ProviderIconWithContainer className={classes.providerIcon} containerClassName={classes.providerIconWrapper} provider={provider} />

      <Ellipsis>
        {gameProviderName[provider]}
      </Ellipsis>
    </div>

    {withShowAll ? <ShowAllLink provider={provider} page={page} /> : null}
  </div>
));
ProviderName.displayName = "ProviderName";

export { ProviderName };

