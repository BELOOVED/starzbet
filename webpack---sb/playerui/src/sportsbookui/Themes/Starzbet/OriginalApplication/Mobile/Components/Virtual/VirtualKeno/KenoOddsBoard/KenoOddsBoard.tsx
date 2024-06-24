// @ts-nocheck
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_betSlip_button_addToBetSlip, sportsbookui_starzbet_title_hits, sportsbookui_starzbet_title_pays, sportsbookui_starzbet_title_highestPayout, sportsbookui_starzbet_title_from } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { useParamSelector } from "@sb/utils";
import classes from "./KenoOddsBoard.module.css";
import { getKenoOddsByKeysLength } from "../../../../../../../../Store/Virtual/Keno/Model/Keno";
import { virtualGameGetOutcomeId } from "../../../../../../../../Store/Virtual/Common/Model/GetOutcomeId";
import { virtualGameBySportSelector } from "../../../../../../../../Store/BetSlip/Selectors/VirtualSelectors";
import { betSlipRemoveAllVirtualGamePickAction } from "../../../../../../../../Store/BetSlip/BetSlipActions";
import { kenoOutcomeSelector } from "../../../../../../../../Store/Virtual/Keno/Selectors/KenoOutcomeSelector";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { useBetSlipCreateBatchHandler } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipCreateBatchHandler";
import { activeOutcomeByIdSelector } from "../../../../../../../../Store/BetSlip/Selectors/ActiveOutcomeByIdSelector";

const getLastElements = (arr) => arr[arr.length - 1];

const AddButton = memo(({ outcomeId }) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const active = useParamSelector(activeOutcomeByIdSelector, [outcomeId]);

  const createHandler = useBetSlipCreateBatchHandler([outcomeId], active);

  const handleClickAdd = useCallback(
    () => {
      createHandler();

      dispatch(betSlipRemoveAllVirtualGamePickAction(sportCodeToIdMap[ESportCode.kiron_keno]));
    },
    [outcomeId],
  );

  return (
    <div className={classes.addBtn} onClick={handleClickAdd}>
      <Ellipsis>
        {t(sportsbookui_starzbet_betSlip_button_addToBetSlip)}
      </Ellipsis>
    </div>
  );
});
AddButton.displayName = "AddButton";

const MarketGroup = memo(({ outcomeId }) => {
  const [t] = useTranslation();
  const keys = useSelector(virtualGameBySportSelector(sportCodeToIdMap[ESportCode.kiron_keno]));

  const oddsList = getKenoOddsByKeysLength(keys.length);

  return (
    <>
      <div className={classes.boardHeader}>
        <div className={classes.title}>
          <Ellipsis>
            {t(sportsbookui_starzbet_title_hits)}
          </Ellipsis>
        </div>

        <div className={classes.title}>
          <Ellipsis>
            {t(sportsbookui_starzbet_title_pays)}
          </Ellipsis>
        </div>
      </div>

      <div className={classes.outcomes}>
        {
          oddsList.map(({ id, coefficient }) => (
            <div className={classes.outcomeWrapper} key={id}>
              <div className={classes.outcomeField}>{id}</div>

              <div className={classes.outcomeField}>{coefficient}</div>
            </div>
          ))
        }
      </div>

      <div className={classes.boardControl}>
        <div className={classes.boardTitle}>
          {`${t(sportsbookui_starzbet_title_highestPayout)} `}

          {" "}

          {getLastElements(oddsList).coefficient}

          {" "}

          {t(sportsbookui_starzbet_title_from)}

          {" "}

          {getLastElements(oddsList).id}
        </div>

        <AddButton outcomeId={outcomeId} />
      </div>
    </>
  );
});
MarketGroup.displayName = "MarketGroup";

const KenoOddsBoard = memo(({ id }) => {
  const outcome = useSelector(kenoOutcomeSelector);
  const outcomeId = virtualGameGetOutcomeId(id, { outcome });

  return (
    <div className={classes.boardContainer}>
      <MarketGroup
        outcomeId={outcomeId}
        key={outcomeId}
      />
    </div>
  );
});
KenoOddsBoard.displayName = "KenoOddsBoard";

export { KenoOddsBoard };
