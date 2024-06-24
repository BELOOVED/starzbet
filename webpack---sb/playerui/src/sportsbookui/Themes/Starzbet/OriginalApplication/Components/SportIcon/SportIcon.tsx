import clsx from "clsx";
import { type ComponentType, createElement, memo } from "react";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { deprecatedGetNotNil } from "@sb/utils";
import classes from "./SportIcon.module.css";
import { type TIconProps } from "../../../../../../common/Components/Icon/Icon";
import { SoccerIcon } from "./SoccerIcon/SoccerIcon";
import { TennisIcon } from "./TennisIcon/TennisIcon";
import { BasketballIcon } from "./BasketballIcon/BasketballIcon";
import { AmericanFootballIcon } from "./AmericanFootballIcon/AmericanFootballIcon";
import { VolleyballIcon } from "./VolleyballIcon/VolleyballIcon";
import { BaseballIcon } from "./BaseballIcon/BaseballIcon";
import { IceHockeyIcon } from "./IceHockeyIcon/IceHockeyIcon";
import { BeachVolleyballIcon } from "./BeachVolleyballIcon/BeachVolleyballIcon";
import { SnookerIcon } from "./SnookerIcon/SnookerIcon";
import { CricketIcon } from "./CricketIcon/CricketIcon";
import { RugbyIcon } from "./RugbyIcon/RugbyIcon";
import { SquashIcon } from "./SquashIcon/SquashIcon";
import { BandyIcon } from "./BandyIcon/BandyIcon";
import { FloorballIcon } from "./FloorballIcon/FloorballIcon";
import { WaterPoloIcon } from "./WaterPoloIcon/WaterPoloIcon";
import { DartsIcon } from "./DartsIcon/DartsIcon";
import { HandballIcon } from "./HandballIcon/HandballIcon";
import { TableTennisIcon } from "./TableTennisIcon/TableTennisIcon";
import { FutsalIcon } from "./FutsalIcon/FutsalIcon";
import { GolfIcon } from "./GolfIcon/GolfIcon";
import { Dota2Icon } from "./Dota2Icon/Dota2Icon";
import { LolIcon } from "./LolIcon/LolIcon";
import { OverwatchIcon } from "./OverwatchIcon/OverwatchIcon";
import { StarcraftIcon } from "./StarcraftIcon/StarcraftIcon";
import { HearthstoneIcon } from "./HearthstoneIcon/HearthstoneIcon";
import { CsgoIcon } from "./CsgoIcon/CsgoIcon";
import { Rainbow6Icon } from "./Rainbow6Icon/Rainbow6Icon";
import { RocketLeagueIcon } from "./RocketLeagueIcon/RocketLeagueIcon";
import { Warcraft3Icon } from "./Warcraft3Icon/Warcraft3Icon";
import { ESoccerIcon } from "./ESoccerIcon/ESoccerIcon";
import { EBasketballIcon } from "./EBasketballIcon/EBasketballIcon";
import { Starcraft2Icon } from "./Starcraft2Icon/Starcraft2Icon";

interface ISportIconProps extends TIconProps {
  id: string;
  circle?: boolean;
  active?: boolean;
  disabled?: boolean;
  isSidebar?: boolean;
  isSportHeader?: boolean;
}

const sportCodeToClassName: Partial<Record<ESportCode, string>> = {
  [ESportCode.soccer]: classes.soccer,
  [ESportCode.tennis]: classes.tennis,
  [ESportCode.basketball]: classes.basketball,
  [ESportCode.american_football]: classes.american_football,
  [ESportCode.volleyball]: classes.volleyball,
  [ESportCode.baseball]: classes.baseball,
  [ESportCode.ice_hockey]: classes.ice_hockey,
  [ESportCode.beach_volleyball]: classes.beach_volleyball,
  [ESportCode.snooker]: classes.snooker,
  [ESportCode.cricket]: classes.cricket,
  [ESportCode.rugby]: classes.rugby,
  [ESportCode.squash]: classes.squash,
  [ESportCode.bandy]: classes.bandy,
  [ESportCode.floorball]: classes.floorball,
  [ESportCode.water_polo]: classes.water_polo,
  [ESportCode.darts]: classes.darts,
  [ESportCode.handball]: classes.handball,
  [ESportCode.table_tennis]: classes.table_tennis,
  [ESportCode.futsal]: classes.futsal,
  [ESportCode.golf]: classes.golf,
  // E-Sports
  [ESportCode.dota2]: classes.dota2,
  [ESportCode.lol]: classes.lol,
  [ESportCode.overwatch]: classes.overwatch,
  [ESportCode.starcraft]: classes.starcraft,
  [ESportCode.starcraft2]: classes.starcraft2,
  [ESportCode.hearthstone]: classes.hearthstone,
  [ESportCode.csgo]: classes.csgo,
  [ESportCode.rainbow6]: classes.rainbow6,
  [ESportCode.rocket_league]: classes.rocket_league,
  [ESportCode.warcraft3]: classes.warcraft3,
  [ESportCode.e_soccer]: classes.e_soccer,
  [ESportCode.e_basketball]: classes.e_basketball,
};

const sportCodeToComponentMap: Partial<Record<ESportCode, ComponentType>> = {
  // Sports
  [ESportCode.soccer]: SoccerIcon,
  [ESportCode.tennis]: TennisIcon,
  [ESportCode.basketball]: BasketballIcon,
  [ESportCode.american_football]: AmericanFootballIcon,
  [ESportCode.volleyball]: VolleyballIcon,
  [ESportCode.baseball]: BaseballIcon,
  [ESportCode.ice_hockey]: IceHockeyIcon,
  [ESportCode.beach_volleyball]: BeachVolleyballIcon,
  [ESportCode.snooker]: SnookerIcon,
  [ESportCode.cricket]: CricketIcon,
  [ESportCode.rugby]: RugbyIcon,
  [ESportCode.squash]: SquashIcon,
  [ESportCode.bandy]: BandyIcon,
  [ESportCode.floorball]: FloorballIcon,
  [ESportCode.water_polo]: WaterPoloIcon,
  [ESportCode.darts]: DartsIcon,
  [ESportCode.handball]: HandballIcon,
  [ESportCode.table_tennis]: TableTennisIcon,
  [ESportCode.futsal]: FutsalIcon,
  [ESportCode.golf]: GolfIcon,
  // E-Sports
  [ESportCode.dota2]: Dota2Icon,
  [ESportCode.lol]: LolIcon,
  [ESportCode.overwatch]: OverwatchIcon,
  [ESportCode.starcraft]: StarcraftIcon,
  [ESportCode.starcraft2]: Starcraft2Icon,
  [ESportCode.hearthstone]: HearthstoneIcon,
  [ESportCode.csgo]: CsgoIcon,
  [ESportCode.rainbow6]: Rainbow6Icon,
  [ESportCode.rocket_league]: RocketLeagueIcon,
  [ESportCode.warcraft3]: Warcraft3Icon,
  [ESportCode.e_soccer]: ESoccerIcon,
  [ESportCode.e_basketball]: EBasketballIcon,
};

const SportIcon = memo<ISportIconProps>(({
  id,
  active,
  disabled,
  circle,
  isSidebar,
  isSportHeader,
  ...props
}) => {
  const sportCode = deprecatedGetNotNil(sportIdToCodeMap[id], `[SportIcon] Sport Code by ID ${id}`);

  const component = sportCodeToComponentMap[sportCode] ?? SoccerIcon;

  const className = sportCodeToClassName[sportCode] ?? classes.soccer;

  if (circle) {
    return (
      <div className={clsx(classes.circle, className, active && classes.active, disabled && classes.disabled)}>
        {createElement(component, { color: "white", ...props })}
      </div>
    );
  }

  if (isSidebar) {
    return (
      <div className={clsx(classes.sideMenuItem, className)}>
        {createElement(component, { color: "white", ...props })}
      </div>
    );
  }

  if (isSportHeader) {
    return (
      <div className={clsx(classes.sportHeader, className)} />
    );
  }

  return createElement(component, props);
});
SportIcon.displayName = "SportIcon";

export { SportIcon };
