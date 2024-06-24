import { memo } from "react";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_casino_title_providers,
  platformui_starzbet_menu_button_deposit,
  platformui_starzbet_navLink_jackpots,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import {
  sportsbookui_starzbet_button_favourites,
  sportsbookui_starzbet_searchInput_title_search,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./CasinoBottomMenu.module.css";
import { SearchIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/SearchIcon/SearchIcon";
import { ResetedLink, ResetedNavLink } from "../../../../../../sportsbookui/Components/ResetedLink/ResetedLink";
import { When } from "../../../../../../common/Components/When";
import { LoggedContainer } from "../../../../../../common/Containers/LoggedContainer/LoggedContainer";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { labelPathByGamePageMap, searchPathByGamePageMap } from "../../../../../Utils/GetGamesViewParams";
import { type IWithGamePage, systemLabels } from "../../../../../Store/Games/Model/Games";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { scrollToTop } from "../../../../../Utils/ScrollToTop";
import { JackpotsIcon } from "../../../Components/Icons/JackpotsIcon/JackpotsIcon";
import { FavSelectedIcon } from "../../../Components/Icons/FavIcon/FavSelectedIcon";
import { ProviderIcon } from "../../../Components/Icons/ProviderIcon/ProviderIcon";
import { DepositIcon } from "../../../Components/Icons/DepositIcon/DepositIcon";
import { ProviderCheckboxSimpleController } from "../ProvidersCheckboxModal/ProvidersCheckboxModal";

const jackpotsPath = {
  to: labelPathByGamePageMap[EGamePage.CASINO],
  params: { labelId: "aca43386-e8a8-4bef-8acd-8c0a6db6cd43" }, //TODO later it will be a system label
};

const ProvidersBtn = memo<IWithGamePage>(({ page }) => {
  const [t] = useTranslation();

  return (
    <ProviderCheckboxSimpleController buttonClassName={classes.button} page={page}>
      <ProviderIcon size={"s"} />

      <div className={classes.name}>
        <Ellipsis>
          {t(platformui_starzbet_casino_title_providers)}
        </Ellipsis>
      </div>
    </ProviderCheckboxSimpleController>
  );
});
ProvidersBtn.displayName = "ProvidersBtn";

const SearchBtn = memo<IWithGamePage>(({ page }) => {
  const [t] = useTranslation();

  const searchPath = searchPathByGamePageMap[page];

  return (
    <ResetedNavLink className={classes.button} to={searchPath} activeClassName={classes.active}>
      <SearchIcon size={"s"} />

      <div className={classes.name}>
        <Ellipsis>
          {t(sportsbookui_starzbet_searchInput_title_search)}
        </Ellipsis>
      </div>
    </ResetedNavLink>
  );
});
SearchBtn.displayName = "SearchBtn";

const params = { labelId: systemLabels.favourite };

const FavBtn = memo<IWithGamePage>(({ page }) => {
  const [t] = useTranslation();

  return (
    <ResetedNavLink
      className={classes.button}
      to={labelPathByGamePageMap[page]}
      params={params}
      activeClassName={classes.active}
      onClick={scrollToTop}
    >
      <FavSelectedIcon size={"s"} />

      <div className={classes.name}>
        <Ellipsis>
          {t(sportsbookui_starzbet_button_favourites)}
        </Ellipsis>
      </div>
    </ResetedNavLink>
  );
});
FavBtn.displayName = "FavBtn";

const JackpotsBtn = memo(() => {
  const [t] = useTranslation();

  return (
    <ResetedNavLink
      className={classes.button}
      {...jackpotsPath}
      activeClassName={classes.active}
      onClick={scrollToTop}
    >
      <JackpotsIcon size={"s"} />

      <div className={classes.name}>
        <Ellipsis>
          {t(platformui_starzbet_navLink_jackpots)}
        </Ellipsis>
      </div>
    </ResetedNavLink>
  );
});
JackpotsBtn.displayName = "JackpotsBtn";

const DepositButtonContent = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <DepositIcon size={"s"} />

      <div className={classes.name}>
        <Ellipsis>
          {t(platformui_starzbet_menu_button_deposit)}
        </Ellipsis>
      </div>
    </>
  );
});
DepositButtonContent.displayName = "DepositButtonContent";

const NotLoggedDepositBtn = memo(() => (
  <ResetedLink
    to={routeMap.loginRoute}
    className={classes.button}
  >
    <DepositButtonContent />
  </ResetedLink>
));
NotLoggedDepositBtn.displayName = "NotLoggedDepositBtn";

const DepositBtn = memo(() => (
  <ResetedNavLink
    className={classes.button}
    to={routeMap.depositRoute}
    activeClassName={classes.active}
  >
    <DepositButtonContent />
  </ResetedNavLink>
));
DepositBtn.displayName = "DepositBtn";

const CasinoBottomMenu = memo<IWithGamePage>(({ page }) => (
  <div className={classes.casinoBottomMenu}>
    <ProvidersBtn page={page} />

    <SearchBtn page={page} />

    <FavBtn page={page} />

    <When condition={page === EGamePage.CASINO}>
      <JackpotsBtn />
    </When>

    <LoggedContainer
      logged={<DepositBtn />}
      notLogged={<NotLoggedDepositBtn />}
    />
  </div>
));
CasinoBottomMenu.displayName = "CasinoBottomMenu";

export { CasinoBottomMenu };
