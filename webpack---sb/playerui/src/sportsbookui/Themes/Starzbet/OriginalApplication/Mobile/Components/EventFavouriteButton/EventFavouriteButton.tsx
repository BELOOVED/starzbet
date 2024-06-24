// @ts-nocheck
import { memo } from "react";
import { useActionWithBind, useParamSelector } from "@sb/utils";
import classes from "./EventFavouriteButton.module.css";
import { activeFavouriteByEventIdSelector } from "../../../../../../Store/Favourites/Selectors/FavouritesSelectors";
import { toggleFavouriteEventIdAction } from "../../../../../../Store/Favourites/FavouritesActions";
import { FavsIcon } from "../../../Components/Icons/FavsIcon/FavsIcon";

const useFav = (eventId: string) => {
  const toggle = useActionWithBind(toggleFavouriteEventIdAction, eventId);
  const active = useParamSelector(activeFavouriteByEventIdSelector, [eventId]);

  const handler = (e) => {
    e.preventDefault();

    e.stopPropagation();

    toggle(eventId);
  };

  return [active, handler];
};

interface IEventFavIcon {
  eventId: string;
}

const EventFavIcon = memo<IEventFavIcon>(({ eventId }) => {
  const [active, handler] = useFav(eventId);

  const favClass = active ? classes.active : classes.fav;

  return (
    <div onClick={handler} className={favClass}>
      <FavsIcon className={classes.favIcon} />
    </div>
  );
});
EventFavIcon.displayName = "EventFavIcon";

export {
  EventFavIcon,
};
