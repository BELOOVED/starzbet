// @ts-nocheck
import { memo } from "react";
import { useSelector } from "react-redux";
import { keyToComponent, useAction, useParamSelector } from "@sb/utils";
import { sportsbookui_starzbet_title_outrights } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./FavouriteList.module.css";
import { LinkLocalized } from "../../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { tournamentByIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { toggleFavouriteTournamentIdAction } from "../../../../../../Store/Favourites/FavouritesActions";
import { favouriteTournamentIdListSelector } from "../../../../../../Store/Favourites/Selectors/FavouritesSelectors";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { TournamentName } from "../../../../../../Components/TournamentName/TournamentName";
import { isFakeOutrightTournamentId, unfakeOutrightTournamentId } from "../../../../../../Store/SportMenu/Model/SportMenu";
import { FavFilledIcon } from "../../../Components/Icons/FavIcon/FavFilledIcon";

const Favourite = memo(({ id }) => {
  const [t] = useTranslation();

  const handleFavourite = useAction(toggleFavouriteTournamentIdAction);

  const tournament = useParamSelector(tournamentByIdSelector, [id]);

  const handleClick = (e) => {
    e.preventDefault();

    handleFavourite(id);
  };

  const params = { id, tournamentSlug: tournament.slug };

  return (
    <LinkLocalized to={routeMap.tournament} params={params} className={classes.favourite}>
      <Ellipsis className={classes.name}>
        {
          isFakeOutrightTournamentId(id)
            ? (
              <>
                <TournamentName id={unfakeOutrightTournamentId(id)} />

                {", "}

                {t(sportsbookui_starzbet_title_outrights)}
              </>
            )
            : (
              <TournamentName id={id} />
            )
        }
      </Ellipsis>

      <FavFilledIcon color={"brand"} onClick={handleClick} />
    </LinkLocalized>
  );
});
Favourite.displayName = "Favourite";

const FavouriteList = memo(() => {
  const favouriteIdList = useSelector(favouriteTournamentIdListSelector);

  return (
    favouriteIdList.map(keyToComponent("id")(Favourite))
  );
});
FavouriteList.displayName = "FavouriteList";

export { FavouriteList };
