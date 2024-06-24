import { memo, useReducer } from "react";
import { EMoneyFormat, type IMoney, Money, not, useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_betSlip_cashout_cashedOut,
  sportsbookui_starzbet_betSlip_cashOutButton_cashOut,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./CashOut.module.css";
import { Loader } from "../../../../../../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { Button } from "../../../../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { CloseDefaultIcon } from "../../../../../../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import {
  hiddenEditCashOutByBetIdSelector,
  inProgressCashOutSelector,
  lastErrorCashOutSelector,
  successCashOutSelector,
} from "../../../../../../../../../../Store/MyBets/Selectors/CashoutSelectors";
import { useCashOut } from "../../../../../../../../../../Store/MyBets/Hooks/UseCashOut";
import { Locked } from "../../../../../../../../../../Components/Locked/Locked";
import { SettingsIcon } from "../../../../../../Icons/SettingsIcon/SettingsIcon";
import { CashOutButton } from "../CashOutButton/CashOutButton";
import { EditCashOut } from "../EditCashOut/EditCashOut";

interface ICashOutProps {
  betId: string;
  cashOut: IMoney;
}

const CashOut = memo<ICashOutProps>(({ betId, cashOut }) => {
  const [edit, toggleEdit] = useReducer(not<boolean>, false);

  const [t] = useTranslation();

  const [currentCashOut, doCashOut] = useCashOut(betId);

  const fullLastError = useParamSelector(lastErrorCashOutSelector, [betId]);

  const fullSuccess = useParamSelector(successCashOutSelector, [betId]);

  const fullInProgress = useParamSelector(inProgressCashOutSelector, [betId]);

  const hiddenEdit = useParamSelector(hiddenEditCashOutByBetIdSelector, [betId]);

  const successMessage = (
    <div>
      <div className={classes.textWrapper}>
        {`${Money.toFormat(cashOut, EMoneyFormat.codeRight)} `}

        {t(sportsbookui_starzbet_betSlip_cashout_cashedOut)}
      </div>
    </div>
  );

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={classes.cashOut}>
      <div className={classes.cashOutButton}>
        <Locked condition={fullInProgress}>
          <Loader />
        </Locked>

        <CashOutButton
          onClick={doCashOut}
          inProgress={fullInProgress}
          success={fullSuccess}
          lastError={fullLastError}
          successMessage={successMessage}
        >
          {t(sportsbookui_starzbet_betSlip_cashOutButton_cashOut)}

          {` ${Money.toFormat(currentCashOut, EMoneyFormat.codeRight)}`}
        </CashOutButton>

        {
          !hiddenEdit && (
            <Button onClick={toggleEdit} colorScheme={"secondary-grey"} className={classes.editButton}>
              {
                edit
                  ? <CloseDefaultIcon className={classes.icon} color={"darkText"} />
                  : <SettingsIcon className={classes.icon} color={"darkText"} />
              }
            </Button>
          )
        }
      </div>

      {
        edit && !hiddenEdit && (
          <EditCashOut betId={betId} />
        )
      }
    </div>
  );
});
CashOut.displayName = "CashOut";

export { CashOut };
