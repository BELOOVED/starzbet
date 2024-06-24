// @ts-nocheck

import clsx from "clsx";
import { memo } from "react";
import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_editPick_title_newAdded,
  sportsbookui_starzbet_newEditPick_edited,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useParamSelector } from "@sb/utils";
import classes from "../EditPick/EditPick.module.css";
import { DateFormat } from "../../../../../../../../../../common/Components/Date/DateFormat";
import {
  eventByIdSelector,
  marketByIdSelector,
  outrightByIdSelector,
  scopeByMarketIdSelector,
  sportIdByEventIdSelector,
} from "../../../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { PickName } from "../../../../../../../../../Components/PickName/PickName";
import { MarketName } from "../../../../../../../../../Components/MarketName/MarketName";
import { ShortScopeName } from "../../../../../../../../../Components/ScopeName/ScopeName";
import { OutrightOutcomeName } from "../../../../../../../../../Components/OutrightOutcomeName/OutrightOutcomeName";
import { outcomeBetOrCurrentByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { editPickOutcomeIdsByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/EditPickOutcomeIdsByIdSelector";
import { editOutrightPickIdsByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/EditOutrightPickIdsByIdSelector";
import { canEditPickByIdSelector } from "../../../../../../../../../Store/MyBets/Selectors/EditablePickByIdSelector";
import { Ellipsis } from "../../../../../../../../../Components/Ellipsis/Ellipsis";
import { OutrightName } from "../../../../../../../../../Components/OutrightName/OutrightName";
import { SportIcon } from "../../../../../SportIcon/SportIcon";
import { BetTeams } from "../../../../BetTeams/BetTeams";
import { EventStatus } from "../../../../BetConstructor/BetConstructorContent/EventStatus/EventStatus";
import { MyBetsPickCoefficient } from "../../../../Pick/PickCoefficient/PickCoefficient";
import { EditOutcome } from "../EditOutcome/EditOutcome";
import { RemoveButton } from "../RemoveButton/RemoveButton";

const NewEditPick = memo(({
  id,
  applied,
  outcomeId,
  marketId,
  eventId,
  removed,
}) => {
  const [t] = useTranslation();

  const {
    status,
    participants,
  } = useParamSelector(eventByIdSelector, [eventId]);
  const outcome = useParamSelector(outcomeBetOrCurrentByIdSelector, [outcomeId]);
  const market = useParamSelector(marketByIdSelector, [marketId]);
  const scope = useParamSelector(scopeByMarketIdSelector, [marketId]);

  const sportId = useParamSelector(sportIdByEventIdSelector, [eventId]);
  const editable = useParamSelector(canEditPickByIdSelector, [id]);

  const EventPickName = (
    <Ellipsis className={classes.pickName}>
      <PickName
        marketType={market.type}
        marketParameters={market.parameters}
        participants={participants}
        outcomeParameters={outcome.parameters}
        name={outcome.translatesForManuallyCreated}
        scope={scope}
        sportId={sportId}
      />
    </Ellipsis>

  );

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={clsx(classes.pick, applied ? classes.edited : classes.added, removed && classes.removed)}>
      {/* eslint-disable-next-line rulesdir/jsx-element-max-length */}
      <div className={classes.pickInfoRow}>
        {
          applied && editable
            ? (
              <EditOutcome
                id={id}
                outcomeId={outcomeId}
                outcomeIdsSelector={editPickOutcomeIdsByIdSelector}
              >
                {EventPickName}
              </EditOutcome>
            )
            : (<>{EventPickName}</>)
        }

        <div className={classes.coefficientAndRemove}>
          <MyBetsPickCoefficient coefficient={outcome.coefficient} />

          <RemoveButton id={id} removed={removed} />
        </div>
      </div>

      <div className={classes.marketName}>
        <MarketName id={marketId} />

        <ShortScopeName
          scope={scope}
          sportId={sportId}
          pattern={" (@)"}
        />
      </div>

      <div className={classes.teamsAndTime}>
        <div className={classes.teams}>
          <SportIcon id={sportId} color={"text"} className={classes.sportIcon} />

          <BetTeams eventId={eventId} participants={participants} />

          {
            applied
              ? (
                <div className={clsx(classes.label, classes.edited)}>
                  {t(sportsbookui_starzbet_newEditPick_edited)}
                </div>
              )
              : (
                <div className={clsx(classes.label, classes.added)}>
                  {t(sportsbookui_starzbet_editPick_title_newAdded)}
                </div>
              )
          }
        </div>

        <div className={classes.timeAndStatus}>
          <EventStatus eventId={eventId} live={isLive(status)} />
        </div>
      </div>
    </div>
  );
});
NewEditPick.displayName = "NewEditPick";

const NewEditOutrightPick = memo(({
  id,
  applied,
  outcomeId,
  removed,
}) => {
  const [t] = useTranslation();
  const outcome = useParamSelector(outcomeBetOrCurrentByIdSelector, [outcomeId]);
  const outright = useParamSelector(outrightByIdSelector, [outcome.outrightId]);

  const editable = useParamSelector(canEditPickByIdSelector, [id]);

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={clsx(classes.pick, applied ? classes.edited : classes.added, removed && classes.removed)}>
      {/* eslint-disable-next-line rulesdir/jsx-element-max-length */}
      <div className={classes.pickInfoRow}>
        {
          applied && editable
            ? (
              <EditOutcome
                id={id}
                outcomeId={outcomeId}
                outcomeIdsSelector={editOutrightPickIdsByIdSelector}
              >
                <Ellipsis className={classes.pickName}>
                  <OutrightOutcomeName id={id} />
                </Ellipsis>
              </EditOutcome>
            )
            : (
              <Ellipsis className={classes.pickName}>
                <OutrightOutcomeName id={id} />
              </Ellipsis>
            )
        }

        <div className={classes.coefficientAndRemove}>
          <MyBetsPickCoefficient coefficient={outcome.coefficient} />

          <RemoveButton removed={removed} id={id} />
        </div>
      </div>

      <div className={classes.editedOutright}>
        <Ellipsis className={classes.marketName}>
          <OutrightName id={outright.id} />
        </Ellipsis>

        {
          applied
            ? (
              <div className={clsx(classes.label, classes.edited)}>
                {t(sportsbookui_starzbet_newEditPick_edited)}
              </div>
            )
            : (
              <div className={clsx(classes.label, classes.added)}>
                {t(sportsbookui_starzbet_editPick_title_newAdded)}
              </div>
            )
        }
      </div>

      <Ellipsis className={classes.timeAndStatus}>
        <DateFormat date={outright.startTime} format={"HH:mm • E, do MMM"} />
      </Ellipsis>
    </div>
  );
});
NewEditOutrightPick.displayName = "NewEditOutrightPick";

export { NewEditPick, NewEditOutrightPick };
