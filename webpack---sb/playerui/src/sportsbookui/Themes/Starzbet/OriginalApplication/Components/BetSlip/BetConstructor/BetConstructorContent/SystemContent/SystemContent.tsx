import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_betSlip_title_banker } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./SystemContent.module.css";
import { betSlipPicksSelector } from "../../../../../../../../Store/BetSlip/Selectors/BetSlipPicksSelectors";
import { useToggleBankerAction } from "../../../../../../../../Store/BetSlip/Hooks/UseToggleBankerAction";
import { PickTop } from "../PickTop/PickTop";
import { PickInfo } from "../PickInfo/PickInfo";
import { PickContainer } from "../PickContainer/PickContainer";
import { type TWithEventId, type TWithMarketId, type TWithOutcomeId, type TWithOutrightId } from "../TBetConstructorContent";

type TWithBanker = {
  banker: boolean;
}

type TBankerProps = TWithBanker & TWithOutcomeId

const Banker = memo<TBankerProps>(
  ({ outcomeId, banker }) => {
    const [t] = useTranslation();

    const handler = useToggleBankerAction(outcomeId);

    return (
      <button className={clsx(classes.banker, banker && classes.active)} onClick={handler}>
        {t(sportsbookui_starzbet_betSlip_title_banker)}
      </button>
    );
  },
);
Banker.displayName = "Banker";

type TSystemPickProps = TWithOutcomeId & TWithEventId & TWithMarketId & TWithOutrightId & TWithBanker

const SystemPick = memo<TSystemPickProps>(
  (props) => (
    <PickContainer outcomeId={props.outcomeId}>
      {
        (live, disable) => (
          <>
            <PickTop
              {...props}
              disable={disable}
            />

            <PickInfo
              {...props}
              live={live}
            />

            <Banker outcomeId={props.outcomeId} banker={props.banker} />
          </>
        )
      }
    </PickContainer>
  ),
);
SystemPick.displayName = "SystemPick";

const SystemContent = memo(() => {
  const picks = useSelector(betSlipPicksSelector);

  return (
    <>
      {
        picks.map((
          {
            outcomeId,
            eventId,
            marketId,
            outrightId,
            banker,
          },
          idx,
        ) => (
          <SystemPick
            outcomeId={outcomeId}
            eventId={eventId}
            marketId={marketId}
            outrightId={outrightId}
            banker={banker}
            key={`${idx}:${outcomeId}`}
          />
        ))
      }
    </>
  );
});
SystemContent.displayName = "SystemContent";

export { SystemContent };
