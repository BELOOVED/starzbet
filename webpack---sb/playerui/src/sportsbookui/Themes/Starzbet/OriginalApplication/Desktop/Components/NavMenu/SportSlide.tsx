import { memo } from "react";
import { useParams } from "@sb/react-router-compat";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { deprecatedGetNotNil, useParamSelector, withProps } from "@sb/utils";
import { type ESportCode } from "@sb/betting-core/ESportCode";
import classes from "./NavMenu.module.css";
import {
  type TLocalizedPushParams,
  useLocalizedPush,
} from "../../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { emptyPreLiveEventsAndOutrightsBySportIdSelector } from "../../../../../../Store/Feed/Selectors/PreLiveEventsSelector";
import { SportIcon } from "../../../Components/SportIcon/SportIcon";
import { getPeriodByParams, getPreLiveEsportPath, getPreLiveSportPath, getSportSlugByParams, type TPeriodParams } from "./NavUtils";

interface ISportSlideProps {
  sportId: string;
  getPath: <Params extends TPeriodParams>(params: Params) => TLocalizedPushParams;
  disabled?: boolean;
}

interface IWithSportId {
  sportId: string;
}

const SportSlide = memo<ISportSlideProps>(({ getPath, sportId, disabled }) => {
  const params = useParams<{ period: string; sportSlug?: ESportCode; }>();

  const sportSlug = deprecatedGetNotNil(sportIdToCodeMap[sportId], `[SportSlide] Sport Code by ID ${sportId}`);

  const active = sportSlug === getSportSlugByParams(params);

  const push = useLocalizedPush();

  const handleClick = () => {
    push(...getPath({ ...params, sportSlug: sportIdToCodeMap[sportId] }));
  };

  return (
    <div className={classes.sportSlide} onClick={handleClick}>
      <SportIcon
        className={classes.sportIcon}
        id={sportId}
        active={active}
        disabled={disabled}
        isSidebar
      />
    </div>
  );
});
SportSlide.displayName = "SportSlide";
const PreLiveSportSlide = memo<IWithSportId>(({ sportId }) => {
  const params = useParams<{ period: string; }>();

  const disabled = useParamSelector(emptyPreLiveEventsAndOutrightsBySportIdSelector, [getPeriodByParams(params), sportId]);

  return (
    <SportSlide
      getPath={getPreLiveSportPath}
      sportId={sportId}
      disabled={disabled}
    />
  );
});
PreLiveSportSlide.displayName = "PreLiveSportSlide";

const LiveSportSlide = withProps(SportSlide)({
  getPath: (params) => ([routeMap.live.sport, params]),
});

const EsportPreLiveSportSlide = memo<IWithSportId>(({ sportId }) => {
  const params = useParams<{ period: string; }>();

  const disabled = useParamSelector(emptyPreLiveEventsAndOutrightsBySportIdSelector, [getPeriodByParams(params), sportId]);

  return (
    <SportSlide
      getPath={getPreLiveEsportPath}
      sportId={sportId}
      disabled={disabled}
    />
  );
});
EsportPreLiveSportSlide.displayName = "EsportPreLiveSportSlide";

const EsportLiveSportSlide = withProps(SportSlide)({
  getPath: (params) => ([routeMap.esport.live.sport, params]),
});

export {
  PreLiveSportSlide,
  LiveSportSlide,
  EsportPreLiveSportSlide,
  EsportLiveSportSlide,
};
