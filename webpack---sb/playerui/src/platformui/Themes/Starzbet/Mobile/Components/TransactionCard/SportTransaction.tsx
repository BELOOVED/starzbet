// @ts-nocheck
import clsx from "clsx";
import { memo, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { type TMoney_Fragment } from "@sb/graphql-client";
import { EMoneyFormat, Money, type TVoidFn, useAction } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_history_table_odds,
  platformui_starzbet_history_table_profit,
  platformui_starzbet_history_title_balance,
  platformui_starzbet_transactionCard_transactionId,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import {
  sportsbookui_starzbet_betSlip_bet_oddsBoost,
  sportsbookui_starzbet_title_betDetails,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import type { TPlatform_SportsbookBet_Fragment, TPlatform_Transaction_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "./TransactionCard.module.css";
import { coefficientFormat } from "../../../../../../sportsbookui/Store/Feed/Model/Outcome/CoefficientFormat";
import { requestBetByIdAction, resetBetStatesAction } from "../../../../../../sportsbookui/Store/MyBets/MyBetsActions";
import { BetHashName } from "../../../../../../sportsbookui/Components/BetName/BetName";
import { betByIdSelector, pendingMyBetsSelector } from "../../../../../../sportsbookui/Store/MyBets/Selectors/MyBetsSelectors";
import { BetFromFS } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/BetSlip/Bet/BetFromFS/BetFromFS";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { BaseModalCreator } from "../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { pickResultTKeys } from "../../../../../../sportsbookui/Store/MyBets/Model/PickResult";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import {
  assertSportPayloadTransactionSelector,
  historySportBetSportsbookBetSelector,
  oddsBoostBetIdSelector,
  transactionResultSelector,
} from "../../../../../Store/History/Selectors/HistorySelectors";
import { type IWithPlayerTransaction } from "../../../../../Store/History/Model/IWithPlayerTransaction";
import { Copy } from "../../../Components/Copy/Copy";
import { UnionIcon } from "../../../Components/Icons/UnionIcon/UnionIcon";
import { ThemedModal } from "../../../Components/ThemedModal/ThemedModal";
import { ThemedModalHeader } from "../../../Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";

const IdColumn = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.idColumn}>
      <Ellipsis>
        {t(platformui_starzbet_transactionCard_transactionId)}
      </Ellipsis>

      <Copy text={id} isRight={true} />
    </div>
  );
});
IdColumn.displayName = "IdColumn";

interface IDateColumnProps {
  createdAt: string;
}

const DateColumn = memo<IDateColumnProps>(({ createdAt }) => (
  <div className={classes.dateColumn}>
    <DateFormat date={createdAt} format={"dd.MM.yyyy HH:mm:ss"} />
  </div>
));
DateColumn.displayName = "DateColumn";

const TypeColumn = memo(({
  sportsbookBet,
}) => {
  const { totalPotentialCoefficient } = sportsbookBet;

  const [t] = useTranslation();

  return (
    <div className={classes.infoItem}>
      <span>{t(platformui_starzbet_history_table_odds)}</span>

      <span>
        <Ellipsis>
          {coefficientFormat(totalPotentialCoefficient)}
        </Ellipsis>
      </span>
    </div>
  );
});
TypeColumn.displayName = "TypeColumn";

interface ISumColumnProps {
  external: TMoney_Fragment;
  isProfit: boolean;
}

const SumColumn = memo<ISumColumnProps>(({ external, isProfit }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.infoItem}>
      <span>{t(platformui_starzbet_history_table_profit)}</span>

      <div className={clsx(classes.sumColumn, !isProfit && classes.sumColumnNegative)}>
        {
          Money.toFormat(
            {
              ...external,
              amount: isProfit ? external.amount : "0",
            },
            EMoneyFormat.symbolLeft,
            { sign: isProfit },
          )
        }
      </div>
    </div>

  );
});
SumColumn.displayName = "SumColumn";

interface IBalanceColumnProps {
  after: TMoney_Fragment;
}

const BalanceColumn = memo<IBalanceColumnProps>(({ after }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.infoItem}>
      <span>{t(platformui_starzbet_history_title_balance)}</span>

      <span className={classes.balance}>
        {Money.toFormat(after, EMoneyFormat.symbolLeft)}
      </span>
    </div>
  );
});
BalanceColumn.displayName = "BalanceColumn";

const ActionColumn = memo<IWithId>(({ id }) => {
  const requestBetById = useAction(requestBetByIdAction);
  const resetBet = useAction(resetBetStatesAction);
  const [t] = useTranslation();

  const handleClick = (toggle: TVoidFn, isReset) => {
    toggle();
    if (isReset) {
      resetBet();
    }
    requestBetById(id);
  };

  const modal = (hideModal: TVoidFn) => {
    const onCancel = () => handleClick(hideModal, true);

    return (
      <ThemedModal onCancel={onCancel} className={classes.modal}>
        <ThemedModalHeader closeButtonClickHandler={onCancel}>
          <Ellipsis className={classes.modalHeader}>
            {t(sportsbookui_starzbet_title_betDetails)}
          </Ellipsis>
        </ThemedModalHeader>

        <SportsbookBet id={id} />
      </ThemedModal>
    );
  };

  return (
    <BaseModalCreator modal={modal}>
      {
        (toggle) => {
          const open = () => handleClick(toggle);

          return (
            <button className={classes.button} onClick={open}>
              <UnionIcon />
            </button>
          );
        }
      }
    </BaseModalCreator>
  );
});
ActionColumn.displayName = "ActionColumn";

interface ITransactionTableProps {
  transaction: TPlatform_Transaction_Fragment;
  type: ReactNode;
  betId: string;
  stake?: ReactNode;
  sportsbookBet?: TPlatform_SportsbookBet_Fragment;
}

const TransactionCard = memo<ITransactionTableProps>(({
  transaction,
  betId,
  type,
  stake,
  sportsbookBet,
}) => {
  const {
    id,
    createdAt,
    sum,
    before,
    after,
  } = transaction;

  return (
    <div className={classes.tableRow}>
      <div className={classes.firstContent}>
        <div>
          <div className={classes.betInfo}>
            <IdColumn id={id} />

            {type}
          </div>

          <DateColumn createdAt={createdAt} />
        </div>

        <div className={classes.rightContent}>
          {stake}

          <ActionColumn id={betId} />
        </div>
      </div>

      <div className={classes.bottomContent}>
        {sportsbookBet ? <TypeColumn sportsbookBet={sportsbookBet} /> : null}

        <SumColumn isProfit={Money.greaterThanOrEqual(after, before)} external={sum.external} />

        <BalanceColumn after={after} />
      </div>
    </div>
  );
});
TransactionCard.displayName = "TransactionCard";

const SportsbookBet = memo(({ id, handleClick }) => {
  const bet = useSelector(betByIdSelector(id));
  const fetching = useSelector(pendingMyBetsSelector);

  if (!bet || fetching) {
    return <Loader />;
  }

  return (
    <BetFromFS
      {...bet}
      key={bet.id}
      toggleModal={handleClick}
    />
  );
});
SportsbookBet.displayName = "SportsbookBet";

const SportTransaction = memo<IWithPlayerTransaction>((
  { transaction },
) => {
  const payload = assertSportPayloadTransactionSelector(transaction);

  const [t] = useTranslation();

  if (payload.__typename === "Platform_SportsbookBetOddsBoostData") {
    return (
      <TransactionCard
        transaction={transaction}
        type={<div className={classes.stakeInfo}>{t(sportsbookui_starzbet_betSlip_bet_oddsBoost)}</div>}
        betId={oddsBoostBetIdSelector(payload)}
      />
    );
  }

  const sportsbookBet = historySportBetSportsbookBetSelector(payload);
  const result = transactionResultSelector(transaction, sportsbookBet);

  const stake = (
    <div className={classes.stakeInfo}>
      <span className={classes[result]}>
        {t(pickResultTKeys[result])}
      </span>

      <span className={classes.stake}>
        {
          Money.toFormat(
            transaction.sum.external,
            EMoneyFormat.symbolLeft,
          )
        }
      </span>
    </div>
  );

  return (
    <TransactionCard
      transaction={transaction}
      betId={sportsbookBet.id}
      type={<BetHashName hash={sportsbookBet.hash} />}
      stake={stake}
      sportsbookBet={sportsbookBet}
    />
  );
});
SportTransaction.displayName = "SportTransaction";

export { SportTransaction };
