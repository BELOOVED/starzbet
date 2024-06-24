// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_virtualRoulette_chooseRow_1st12, sportsbookui_starzbet_virtualRoulette_chooseRow_2nd12, sportsbookui_starzbet_virtualRoulette_chooseRow_3rd12 } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { outcomeEnumValueTKeys } from "@sb/betting-core/SharedTKeys/OutcomeEnumValueTKeys";
import { useParamSelector } from "@sb/utils";
import classes from "./SpinAndWinSectors.module.css";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import {
  getSpinAndWinOutcome,
  spinAndWinBlueSectorKeys,
  spinAndWinFirstHalfKeys,
  spinAndWinFirstTwelveKeys,
  spinAndWinGreenSectorKeys,
  spinAndWinLastHalfKeys,
  spinAndWinOrangeSectorKeys,
  spinAndWinRoseSectorKeys,
  spinAndWinSecondTwelveKeys,
  spinAndWinThirdTwelveKeys,
  spinAndWinWhiteSectorKeys,
  spinAndWinYellowSectorKeys,
} from "../../../../../../../../Store/Virtual/SpinAndWin/Model/SpinAndWin";
import { virtualGameGetOutcomeId } from "../../../../../../../../Store/Virtual/Common/Model/GetOutcomeId";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";

const SectorNumbers = memo(({
  className,
  title,
  outcomeId,
}) => {
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const classesList = clsx(
    className,
    classes.selector,
    active && classes.selected,
  );

  return (
    <div
      className={classesList}
      onClick={createHandler}
    >
      {title}
    </div>
  );
});
SectorNumbers.displayName = "SectorNumbers";

const sectorClassMap = {
  [EOutcomeEnumValue.odd]: classes.selectorOdd,
  [EOutcomeEnumValue.even]: classes.selectorEven,
  [EOutcomeEnumValue.red]: classes.selectorRed,
  [EOutcomeEnumValue.black]: classes.selectorBlack,
};

const SectorWithOutHoverContainer = memo(({
  title,
  outcomeId,
}) => {
  const [t] = useTranslation();
  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);
  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const classesList = clsx(
    sectorClassMap[title],
    classes.selector,
    active && classes.selected,
  );

  return (
    <div
      className={classesList}
      onClick={createHandler}
    >
      {
        title && (
          <Ellipsis>
            {t(outcomeEnumValueTKeys[title])}
          </Ellipsis>
        )
      }
    </div>
  );
});
SectorWithOutHoverContainer.displayName = "SectorWithOutHoverContainer";

const sectorsTwelve = [
  {
    entries: spinAndWinFirstTwelveKeys,
    className: classes.selectorFirstTwelve,
    title: sportsbookui_starzbet_virtualRoulette_chooseRow_1st12,
  },
  {
    entries: spinAndWinSecondTwelveKeys,
    className: classes.selectorSecondTwelve,
    title: sportsbookui_starzbet_virtualRoulette_chooseRow_2nd12,
  },
  {
    entries: spinAndWinThirdTwelveKeys,
    className: classes.selectorThirdTwelve,
    title: sportsbookui_starzbet_virtualRoulette_chooseRow_3rd12,
  },
];

const sectorsHalf = [
  {
    entries: spinAndWinFirstHalfKeys,
    className: classes.selectorFirstHalf,
    title: "1-18",
  },
  {
    entries: spinAndWinLastHalfKeys,
    className: classes.selectorLastHalf,
    title: "19-36",
  },
];

const sectorsCombo = [
  {
    entries: spinAndWinOrangeSectorKeys,
    className: classes.selectorOrangeSector,
    title: spinAndWinOrangeSectorKeys.join("/"),
  },
  {
    entries: spinAndWinBlueSectorKeys,
    className: classes.selectorBlueSector,
    title: spinAndWinBlueSectorKeys.join("/"),
  },
  {
    entries: spinAndWinRoseSectorKeys,
    className: classes.selectorRoseSector,
    title: spinAndWinRoseSectorKeys.join("/"),
  },
  {
    entries: spinAndWinGreenSectorKeys,
    className: classes.selectorGreenSector,
    title: spinAndWinGreenSectorKeys.join("/"),
  },
  {
    entries: spinAndWinYellowSectorKeys,
    className: classes.selectorYellowSector,
    title: spinAndWinYellowSectorKeys.join("/"),
  },
  {
    entries: spinAndWinWhiteSectorKeys,
    className: classes.selectorWhiteSector,
    title: spinAndWinWhiteSectorKeys.join("/"),
  },
];

const SectorContainer = memo(({ marketId, outcome }) => {
  const outcomeId = virtualGameGetOutcomeId(marketId, { outcome });

  return (
    <SectorWithOutHoverContainer
      outcomeId={outcomeId}
      title={outcome}
    />
  );
});
SectorContainer.displayName = "SectorContainer";

const RouletteSector = memo(({ list, id }) => (
  <div className={classes.sectorInside}>
    {
      list.map((outcome) => (
        <SectorContainer
          outcome={outcome}
          marketId={id}
          key={outcome}
        />
      ))
    }
  </div>
));
RouletteSector.displayName = "RouletteSector";

const SectorNumbersContainer = memo(({
  marketId,
  entries,
  title,
  ...rest
}) => {
  const [t] = useTranslation();
  const outcome = getSpinAndWinOutcome(entries);
  const outcomeId = virtualGameGetOutcomeId(marketId, { outcome });

  return (
    <SectorNumbers
      title={t(title)}
      outcomeId={outcomeId}
      entries={entries}
      {...rest}
    />
  );
});
SectorNumbersContainer.displayName = "SectorNumbersContainer";

const NumbersSector = memo(({ marketId }) => {
  const [t] = useTranslation();

  return (
    <>
      <div className={classes.sectorTwelve}>
        {
          sectorsTwelve.map(({ title, ...rest }) => (
            <SectorNumbersContainer
              title={t(title)}
              marketId={marketId}
              {...rest}
              key={title}
            />
          ))
        }
      </div>

      <div className={classes.sectorsHalf}>
        {
          sectorsHalf.map(({ title, ...rest }) => (
            <SectorNumbersContainer
              title={t(title)}
              marketId={marketId}
              {...rest}
              key={title}
            />
          ))
        }
      </div>

      <div className={classes.sectorsCombo}>
        {
          sectorsCombo.map(({ title, ...rest }) => (
            <SectorNumbersContainer
              title={t(title)}
              marketId={marketId}
              {...rest}
              key={title}
            />
          ))
        }
      </div>
    </>
  );
});
NumbersSector.displayName = "NumbersSector";

export { RouletteSector, NumbersSector };
