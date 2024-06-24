// @ts-nocheck
import clsx from "clsx";
import { createElement, memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { marketTypeToMarketGroupMap } from "@sb/betting-core/MarketGroup";
import { keyToComponent, useClickOutside, useParamSelector, not } from "@sb/utils";
import {
  sportsbookui_starzbet_betSlip_button_addToBetSlip,
  sportsbookui_starzbet_betSlip_button_clear,
  sportsbookui_starzbet_title_odds,
  sportsbookui_starzbet_title_result,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { marketTypeTKeys } from "@sb/betting-core/SharedTKeys/MarketTypeTKeys";
import { isFinished, isPreLive } from "@sb/betting-core/EEventStatusUtils";
import {
  sportsbookui_outcomeName_anyOrder,
  sportsbookui_outcomeName_first,
  sportsbookui_outcomeName_second,
  sportsbookui_outcomeName_third,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { BaseTeamName } from "@sb/entity-translates";
import classes from "./VirtualRacingSport.module.css";
import { When } from "../../../../../../../../common/Components/When";
import { Button } from "../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { lockedMarketSelector } from "../../../../../../../Store/Feed/Selectors/LockedOutcomeSelector";
import { outcomeWinByMarketIdSelector, parametersByOutcomeIdSelector } from "../../../../../../../Store/Feed/Selectors/OutcomeByIdSelector";
import {
  coefficientByIdSelector,
  eventIdByMarketIdSelector,
  eventStatusByIdSelector,
  marketTypeByIdSelector,
} from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import {
  useRaceMarketIdPerTabByEventIdSelector,
  useRaceWinnerMarketIdGroupByEventIdSelector,
} from "../../../../../../../Store/Feed/Hooks/UseMarketIdGroupByEventIdSelector";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { range } from "../../../../../../../Utils/Range";
import { useVirtualRacingOutcomeSelector } from "../../../../../../../Store/Feed/Hooks/UseVirtualRacingOutcomeSelector";
import { betSlipPickAnyPlaceAction, betSlipPickPlaceAction } from "../../../../../../../Store/BetSlip/BetSlipActions";
import {
  useRaceCastActiveSpotSelector,
  useRaceCastAnyActiveSpotSelector,
  useRaceCastAnyDisableSpotSelector,
  useRaceCastButtonHandler,
  useRaceCastDisableSpotSelector,
} from "../../../../../../../Store/Feed/Hooks/UseCastScoreGroupByMarketHashSelectorFactory";
import {
  EVirtualRacingMarketTabEnum,
  virtualRacingMarketGroupWithAny,
  virtualRacingMarketPerTabMap,
  virtualRacingMarketTabNameMap,
} from "../../../../../../../Store/Virtual/Common/Model/VirtualRacingSport";
import { useVirtualRacingLastFiveSelector } from "../../../../../../../Store/Statistics/Hooks/UseVirtualRacingStatisticsSelector";
import {
  useRacingSortedParticipantsByEventIdSelector,
} from "../../../../../../../Store/Virtual/Common/Hooks/UseRacingSortedParticipantsByEventIdSelector";
import { coefficientFormat } from "../../../../../../../Store/Feed/Model/Outcome/CoefficientFormat";
import { Arrow } from "../../../../Components/Arrow/Arrow";
import { VirtualTeamIcon } from "../../../../Desktop/Components/Virtual/VirtualTeamIcon/VirtualTeamIcon";
import { Lock } from "../../../../Desktop/Components/Virtual/Lock/Lock";
import { Loader } from "../../../../Components/Loader/Loader";
import { RaceWinnerOutcomeGroup } from "../OutcomeList/OutcomeList";
import { VirtualStarRating } from "../VirtualStarRating/VirtualStarRating";

const castPlaceCountMap = {
  [EMarketGroup.race_forecast]: 2,
  [EMarketGroup.race_tricast]: 3,
};

const MarketTab = memo(({ tab, active, onClick }) => {
  const [t] = useTranslation();

  const handleClick = useCallback(() => onClick(tab), []);

  return (
    <div className={clsx(classes.marketTab, active && classes.tabActive)} onClick={handleClick}>
      <Ellipsis>
        {virtualRacingMarketTabNameMap[tab].map((type) => t(marketTypeTKeys[type])).join(" / ")}
      </Ellipsis>
    </div>
  );
});
MarketTab.displayName = "MarketTab";

const placesTKeys = {
  1: sportsbookui_outcomeName_first,
  2: sportsbookui_outcomeName_second,
  3: sportsbookui_outcomeName_third,
};

const RacingMarketPlacePerTab = memo(({ currentTab }) => {
  const [t] = useTranslation();

  const marketTypes = virtualRacingMarketPerTabMap[currentTab];

  return (
    <div className={classes.racingMarketPlaces}>
      {
        marketTypes.map((marketType) => {
          if (castPlaceCountMap[marketTypeToMarketGroupMap[marketType]]) {
            return range(1, castPlaceCountMap[marketTypeToMarketGroupMap[marketType]]).map((it) => (
              <div className={classes.racePlaceShort} key={`${marketType}:${it}`}>
                {t(placesTKeys[it])}
              </div>
            ));
          } else if (virtualRacingMarketGroupWithAny.includes(marketType)) {
            return (
              <div className={classes.racePlace} key={marketType}>
                {t(sportsbookui_outcomeName_anyOrder)}
              </div>
            );
          }

          return null;
        })
      }
    </div>
  );
});
RacingMarketPlacePerTab.displayName = "RacingMarketPlacePerTab";

const WinnerPlaces = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={`${classes.racingMarketPlaces} ${classes.gap}`}>
      {
        virtualRacingMarketTabNameMap[EVirtualRacingMarketTabEnum.winner].map((type) => (
          <div className={classes.racePlace} key={type}>
            {t(marketTypeTKeys[type])}
          </div>
        ))
      }
    </div>
  );
});
WinnerPlaces.displayName = "WinnerPlaces";

const MarketHeader = memo(({ currentTab, onChangeTab, eventId }) => {
  const [t] = useTranslation();
  const status = useParamSelector(eventStatusByIdSelector, [eventId]);

  const [visible, setVisible] = useState(false);

  const ref = useClickOutside(() => setVisible(false));
  const clickHandler = useCallback(() => setVisible(not), []);

  return (
    <div className={classes.marketHeader}>
      <div
        className={classes.marketSelect}
        ref={ref}
        onClick={clickHandler}
      >
        <div className={classes.selectCurrent}>
          <div className={clsx(classes.currentName, visible && classes.activeName)}>
            <Ellipsis>
              {virtualRacingMarketTabNameMap[currentTab].map((type) => t(marketTypeTKeys[type])).join(" / ")}
            </Ellipsis>
          </div>

          <div className={classes.arrow}>
            <Arrow expanded={visible} />
          </div>
        </div>

        <When condition={visible}>
          <div className={classes.marketDropDown}>
            {
              Object.values(EVirtualRacingMarketTabEnum).map((tab) => (
                <MarketTab
                  active={tab === currentTab}
                  tab={tab}
                  onClick={onChangeTab}
                  key={tab}
                />
              ))
            }
          </div>
        </When>
      </div>

      {
        !isFinished(status) && (currentTab !== EVirtualRacingMarketTabEnum.winner
          ? (
            <RacingMarketPlacePerTab currentTab={currentTab} />
          )
          : (
            <WinnerPlaces />
          ))
      }
    </div>
  );
});
MarketHeader.displayName = "MarketHeader";

const RaceWinnerOutcome = memo(({ marketId, shortId, ...rest }) => {
  const outcomeId = useVirtualRacingOutcomeSelector(marketId, shortId);

  return (
    <RaceWinnerOutcomeGroup
      id={outcomeId}
      marketId={marketId}
      {...rest}
    />
  );
});
RaceWinnerOutcome.displayName = "RaceWinnerOutcome";

const CastOutcome = memo(({ marketId, place, shortId }) => {
  const active = useRaceCastActiveSpotSelector(marketId, place, shortId);
  const disable = useRaceCastDisableSpotSelector(marketId, place, shortId);

  const dispatch = useDispatch();

  const locked = useParamSelector(lockedMarketSelector, [marketId]);

  const clickHandle = useCallback(
    () => {
      if ((locked || disable) && !active) {
        return;
      }

      dispatch(betSlipPickPlaceAction(marketId, shortId, place));
    },
    [locked, disable, active],
  );

  const oddsClass = clsx(
    classes.castOdd,
    classes.short,
    active && classes.active,
    locked && classes.locked,
    disable && classes.disable,
  );

  const checkBoxClass = clsx(
    classes.checkbox,
    active && classes.checked,
    disable && classes.disable,
  );

  return (
    <div className={oddsClass} onClick={clickHandle}>
      {
        locked
          ? (
            <div className={classes.castLocked}>
              <Lock />
            </div>
          )
          : (
            <div className={checkBoxClass} />
          )
      }
    </div>
  );
});
CastOutcome.displayName = "CastOutcome";

const CastOutcomeAny = memo(({ marketId, shortId }) => {
  const active = useRaceCastAnyActiveSpotSelector(marketId, shortId);
  const disable = useRaceCastAnyDisableSpotSelector(marketId, shortId);

  const dispatch = useDispatch();

  const locked = useParamSelector(lockedMarketSelector, [marketId]);

  const clickHandle = useCallback(
    () => {
      if ((locked || disable) && !active) {
        return;
      }

      dispatch(betSlipPickAnyPlaceAction(marketId, shortId));
    },
    [locked, disable, active],
  );

  const oddsClass = clsx(
    classes.castOdd,
    active && classes.active,
    locked && classes.locked,
    disable && classes.disable,
  );

  const checkBoxClass = clsx(
    classes.checkbox,
    active && classes.checked,
    disable && classes.disable,
  );

  return (
    <div className={oddsClass} onClick={clickHandle}>
      {
        locked
          ? (
            <div className={classes.castLocked}>
              <Lock />
            </div>
          )
          : (
            <div className={checkBoxClass} />
          )
      }
    </div>
  );
});
CastOutcomeAny.displayName = "CastOutcomeAny";

const CoefficientContainer = memo(({ marketId }) => {
  const [t] = useTranslation();

  const marketType = useParamSelector(marketTypeByIdSelector, [marketId]);
  const outcomeId = useParamSelector(outcomeWinByMarketIdSelector, [marketId]);
  const coefficient = useParamSelector(coefficientByIdSelector, [outcomeId]);

  const title = virtualRacingMarketGroupWithAny.includes(marketType)
    ? sportsbookui_outcomeName_anyOrder
    : sportsbookui_starzbet_title_odds;

  return (
    <div className={classes.finishedText}>
      <div className={classes.finishedTitle}>
        <Ellipsis>
          {t(title)}
        </Ellipsis>
      </div>

      <div className={classes.finishedResult}>
        {coefficientFormat(coefficient)}
      </div>
    </div>
  );
});
CoefficientContainer.displayName = "CoefficientContainer";

const FinishedEventResult = memo(({ marketTab, eventId }) => {
  const [t] = useTranslation();
  const marketIds = useRaceMarketIdPerTabByEventIdSelector(eventId, marketTab);

  const outcomeId = useParamSelector(outcomeWinByMarketIdSelector, [marketIds[0]]);
  const { outcome } = useParamSelector(parametersByOutcomeIdSelector, [outcomeId]);

  return (
    <div className={classes.finished}>
      <div className={classes.finishedContent}>
        <div className={classes.finishedText}>
          <div className={classes.finishedTitle}>
            <Ellipsis>
              {t(sportsbookui_starzbet_title_result)}
            </Ellipsis>
          </div>

          <div className={classes.finishedResult}>
            {outcome.replaceAll("p", "").replaceAll(",", "-")}
          </div>
        </div>

        {
          marketIds.map((marketId) => (
            <CoefficientContainer key={marketId} marketId={marketId} />
          ))
        }
      </div>
    </div>
  );
});
FinishedEventResult.displayName = "FinishedEventResult";

const CastOutcomeGroup = memo(({
  marketId,
  marketType,
  shortId,
}) => {
  const marketGroup = marketTypeToMarketGroupMap[marketType];
  const eventId = useParamSelector(eventIdByMarketIdSelector, [marketId]);

  const places = range(1, castPlaceCountMap[marketGroup]);
  const status = useParamSelector(eventStatusByIdSelector, [eventId]);

  if (isFinished(status)) {
    return null;
  }

  return places.map((place) => (
    <CastOutcome
      marketId={marketId}
      place={place}
      shortId={shortId}
      key={`${marketId}:${place}`}
    />
  ));
});
CastOutcomeGroup.displayName = "CastOutcomeGroup";

const CastOutcomeAnyGroup = memo(({
  marketId,
  shortId,
}) => {
  const eventId = useParamSelector(eventIdByMarketIdSelector, [marketId]);

  const status = useParamSelector(eventStatusByIdSelector, [eventId]);

  if (isFinished(status)) {
    return null;
  }

  return (
    <CastOutcomeAny
      marketId={marketId}
      shortId={shortId}
    />
  );
});
CastOutcomeAnyGroup.displayName = "CastOutcomeAnyGroup";

const viewMap = {
  [EMarketGroup.race_winner]: RaceWinnerOutcome,
  [EMarketGroup.race_place]: RaceWinnerOutcome,
  [EMarketGroup.race_forecast]: CastOutcomeGroup,
  [EMarketGroup.race_tricast]: CastOutcomeGroup,
  [EMarketGroup.race_reverse_forecast]: CastOutcomeAnyGroup,
  [EMarketGroup.race_reverse_tricast]: CastOutcomeAnyGroup,
  [EMarketGroup.race_swinger]: CastOutcomeAnyGroup,
};

const OutcomeContainer = memo(({ marketId, shortId }) => {
  const marketType = useParamSelector(marketTypeByIdSelector, [marketId]);

  const marketGroup = marketTypeToMarketGroupMap[marketType];
  const view = viewMap[marketGroup];

  return createElement(
    view,
    {
      marketId,
      marketType,
      shortId,
    },
  );
});
OutcomeContainer.displayName = "OutcomeContainer";

const TeamMarketGroup = memo(({
  team,
  eventId,
  marketTab,
  favorite,
}) => {
  const marketIds = useRaceMarketIdPerTabByEventIdSelector(eventId, marketTab);
  const lastFive = useVirtualRacingLastFiveSelector(eventId, team.shortId);
  const classList = clsx(
    classes.marketList,
    marketTab === EVirtualRacingMarketTabEnum.winner && classes.gap,
  );

  return (
    <div className={classes.marketGroup}>
      <div className={classes.teamView}>
        <VirtualTeamIcon shortId={team.shortId} eventId={eventId} />

        <div className={classes.teamInfo}>
          <div className={classes.teamName}>
            <Ellipsis>
              <BaseTeamName team={team} />
            </Ellipsis>

            {
              favorite && (
                <div className={classes.teamFavorite}>
                  {"F"}

                  {favorite}
                </div>
              )
            }
          </div>

          <div className={classes.teamRating}>
            <VirtualStarRating eventId={eventId} shortId={team.shortId} />

            <div className={classes.lastFiveStats}>
              {lastFive?.join("-")}
            </div>
          </div>
        </div>
      </div>

      <div className={classList}>
        {marketIds.map(keyToComponent("marketId", { shortId: team.shortId })(OutcomeContainer))}
      </div>
    </div>
  );
});
TeamMarketGroup.displayName = "TeamMarketGroup";

const ButtonControl = memo(({ eventId }) => {
  const [t] = useTranslation();

  const {
    disableClear,
    disableAdd,
    removeHandle,
    addHandle,
  } = useRaceCastButtonHandler(eventId);

  return (
    <div className={classes.buttonControl}>
      <Button
        colorScheme={"secondary-transparent"}
        className={classes.button}
        onClick={removeHandle}
        disabled={disableClear}
        wide
      >
        {t(sportsbookui_starzbet_betSlip_button_clear)}
      </Button>

      <Button
        colorScheme={"orange-gradient"}
        className={classes.button}
        onClick={addHandle}
        disabled={disableAdd}
        wide
      >
        {t(sportsbookui_starzbet_betSlip_button_addToBetSlip)}
      </Button>
    </div>
  );
});
ButtonControl.displayName = "ButtonControl";

const getFavorite = (index) => index < 3 && index + 1;

const VirtualRacingSport = memo(({ eventId }) => {
  const participants = useRacingSortedParticipantsByEventIdSelector(eventId);
  const marketGroups = useRaceWinnerMarketIdGroupByEventIdSelector(eventId);
  const [marketTab, setCurrentMarketTab] = useState(EVirtualRacingMarketTabEnum.winner);
  const status = useParamSelector(eventStatusByIdSelector, [eventId]);

  const handleChangeTab = useCallback((tab: any) => setCurrentMarketTab(tab), []);

  if (marketGroups.length === 0) {
    return (
      <div className={classes.virtualLoader}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.racingMarkets}>
      <MarketHeader eventId={eventId} currentTab={marketTab} onChangeTab={handleChangeTab} />

      <div className={classes.markets}>
        <div className={classes.marketGroups}>
          {
            participants.map((team, index) => (
              <TeamMarketGroup
                marketTab={marketTab}
                eventId={eventId}
                team={team}
                favorite={getFavorite(index)}
                key={team.teamId}
              />
            ))
          }
        </div>

        {
          isFinished(status) && marketTab !== EVirtualRacingMarketTabEnum.winner && (
            <FinishedEventResult
              marketTab={marketTab}
              eventId={eventId}
            />
          )
        }
      </div>

      {isPreLive(status) && marketTab !== EVirtualRacingMarketTabEnum.winner && (<ButtonControl eventId={eventId} />)}
    </div>
  );
});
VirtualRacingSport.displayName = "VirtualRacingSport";

export { VirtualRacingSport };
