import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { getNotNil, isNotNil, Money, type TExplicitAny, type TVoidFn, voidFn } from "@sb/utils";
import { ESportsbook_BetStatusEnum } from "@sb/graphql-client";
import classes from "./BetHead.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { When } from "../../../../../../../../../common/Components/When";
import { betStatusTKeys } from "../../../../../../../../Store/MyBets/Model/BetStatusEnum";
import { editingByBetIdSelector } from "../../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { useScrollToEditableBet } from "../../../../../../../../Store/MyBets/Hooks/UseScrollToEditableBet";
import { DropdownIcon } from "../../../../Icons/DropdownIcon/DropdownIcon";
import { useBetRegistry } from "../../BetRegistry";

type TBetHeadProps = {
  isDropDown?: boolean;
  expanded?: boolean;
  handleToggle?: TVoidFn;
  bet: TExplicitAny;
}

const betStatusClassNameMap = {
  [ESportsbook_BetStatusEnum.loss]: classes.loss,
  [ESportsbook_BetStatusEnum.partialLoss]: classes.partialLoss,
  [ESportsbook_BetStatusEnum.win]: classes.win,
  [ESportsbook_BetStatusEnum.partialWin]: classes.partialWin,
};

const BetHead = memo<TBetHeadProps>(({
  isDropDown = false,
  expanded = false,
  handleToggle = voidFn,
  bet,
}) => {
  const [t] = useTranslation();

  const {
    TotalStake,
    BetName,
    TotalPayout,
    EditBetButton,
  } = useBetRegistry();

  const {
    totalStake,
    totalPayout,
    hash,
    id,
    betStatus,
  } = bet;
  const ref = useScrollToEditableBet<HTMLDivElement>(id);
  const editing = useSelector(editingByBetIdSelector(id));

  const isTotalPayoutMoneyBag = Money.isMoney(totalPayout.external);

  const totalPayoutMoney = isTotalPayoutMoneyBag
    ? totalPayout.external
    : totalPayout;

  return (
    <div className={clsx(classes.head, !isDropDown && classes.modal)} onClick={handleToggle} ref={IS_MOBILE_CLIENT_SIDE ? ref : null}>
      <div className={classes.moneyTypeWrapper}>
        <TotalStake totalStake={totalStake} />
        &nbsp;
        <BetName id={id} hash={hash} />
      </div>

      <div className={classes.statusAndButton}>
        <div className={clsx(classes.status, betStatusClassNameMap[betStatus])}>
          {Money.isZero(totalPayoutMoney) ? null : <TotalPayout totalPayout={totalPayout} />}
          &nbsp;
          {t(getNotNil(betStatusTKeys[betStatus], ["BetHead"], "betStatus"))}
        </div>

        {isDropDown && isNotNil(EditBetButton) ? <EditBetButton id={id} /> : null}
      </div>

      <When condition={isDropDown && !editing}>
        <DropdownIcon
          className={classes.arrow}
          expanded={expanded}
          size={"m"}
          color={"darkText"}
        />
      </When>
    </div>
  );
});
BetHead.displayName = "BetHead";

export { BetHead };
