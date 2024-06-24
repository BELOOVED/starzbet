import { memo } from "react";
import { useSelector } from "react-redux";
import {
  sportsbookui_starzbet_bottomNavMenu_button_azSports,
  sportsbookui_starzbet_coupons_header_favs,
  sportsbookui_starzbet_createCoupon_title_myFavourite,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useParamSelector } from "@sb/utils";
import classes from "./AllGames.module.css";
import { ResetedNavLink } from "../../../../../../sportsbookui/Components/ResetedLink/ResetedLink";
import {
  FavouriteList,
} from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Mobile/Components/FavouriteList/FavouriteList";
import {
  FullScreenMenu,
} from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Mobile/Components/FullScreenMenu/FullScreenMenu";
import { FavsIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/FavsIcon/FavsIcon";
import { SportMenu } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Mobile/Components/SportMenu/SportMenu";
import { When } from "../../../../../../common/Components/When";
import { PreLiveSportMenuContainer } from "../../../../../../sportsbookui/Containers/SportMenuContainer/SportMenuContainer";
import { type TRoutePath } from "../../../../../RouteMap/RouteMap";
import { type IWithGamePage, systemLabels } from "../../../../../Store/Games/Model/Games";
import { isFavEnabledForPageSelector } from "../../../../../Store/Games/Selectors/GamesSelectors";
import { favoritesLengthByGamePageMap, labelPathByGamePageMap } from "../../../../../Utils/GetGamesViewParams";

const params = { labelId: systemLabels.favourite };

const FavButton = memo<IWithGamePage>(({ page }) => {
  const [t] = useTranslation();

  const favsCount = useSelector(favoritesLengthByGamePageMap[page]);

  return (
    <ResetedNavLink
      to={labelPathByGamePageMap[page]}
      params={params}
      className={classes.homeFavsItem}
      activeClassName={classes.active}
    >
      <div className={classes.iconFavsWrapper}>
        <FavsIcon className={classes.homeStarImage} />

        <div>{t(sportsbookui_starzbet_coupons_header_favs)}</div>
      </div>

      <div className={classes.eventsCount}>{favsCount}</div>
    </ResetedNavLink>
  );
});
FavButton.displayName = "FavButton";

interface IAllSportsProps extends IWithGamePage {
  closePath: TRoutePath;
}

const AllGames = memo<IAllSportsProps>(({
  page,
  closePath,
}) => {
  const [t] = useTranslation();
  const isFavEnabled = useParamSelector(isFavEnabledForPageSelector, [page]);

  return (
    <FullScreenMenu closePath={closePath} title={sportsbookui_starzbet_createCoupon_title_myFavourite}>
      <When condition={isFavEnabled}>
        <FavButton page={page} />
      </When>

      <FavouriteList />

      <div className={classes.header}>
        {t(sportsbookui_starzbet_bottomNavMenu_button_azSports)}
      </div>

      <PreLiveSportMenuContainer child={SportMenu} />
    </FullScreenMenu>
  );
});
AllGames.displayName = "AllGames";

export { AllGames };
