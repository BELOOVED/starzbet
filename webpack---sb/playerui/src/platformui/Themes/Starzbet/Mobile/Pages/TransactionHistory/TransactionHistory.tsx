import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { EMoneyFormat, Money, type TNullable } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import type { TPlatform_PlayerTransaction_Fragment, TPlatform_TransactionDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import {
  platformui_starzbet_history_title_balance,
  platformui_starzbet_history_title_transactionID,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type EProviderCode } from "@sb/betting-core/EProviderCode";
import classes from "./TransactionHistory.module.css";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { formatTransactionSum, isNegativeByType } from "../../../../../Store/History/Model/AccountHistory";
import { nodesHistorySelector } from "../../../../../Store/History/Selectors/HistorySelectors";
import { useTransactionProvider } from "../../../../../Store/Transaction/Utils/UseTransactionProvider";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { TranslateRecord } from "../../../../../Components/TranslateRecord/TranslateRecord";
import { Copy } from "../../../Components/Copy/Copy";

const IdColumn = memo<IWithId>(({ id }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.infoColumn}>
      <span className={classes.infoTitle}>{t(platformui_starzbet_history_title_transactionID)}</span>

      <Copy
        text={id}
        className={classes.id}
        isRight={true}
      />
    </div>
  );
});
IdColumn.displayName = "IdColumn";

interface IDateColumnProps {
  createdAt: TNullable<string>;
}

const DateColumn = memo<IDateColumnProps>(({ createdAt }) => (
  <div className={classes.dateColumn}>
    <DateFormat date={createdAt} format={"dd.MM.yyyy HH:mm:ss"} />
  </div>
));
DateColumn.displayName = "DateColumn";

interface ITypeColumnProps {
  details: TPlatform_TransactionDetails_Fragment | null;
  provider: EProviderCode | null;
}

const TypeColumn = memo<ITypeColumnProps>(({
  details,
  provider,
}) => {
  const type = useTransactionProvider(details, provider);

  return (
    <div className={classes.infoItem}>
      {type}
    </div>
  );
});
TypeColumn.displayName = "TypeColumn";

interface ISumColumnProps {
  sum: TPlatform_PlayerTransaction_Fragment["sum"];
  details: TPlatform_PlayerTransaction_Fragment["details"];
  type: TPlatform_PlayerTransaction_Fragment["type"];
}

const SumColumn = memo<ISumColumnProps>(({
  sum,
  details,
  type,
}) => (
  <div className={classes.infoItem}>
    <span className={clsx(classes.sumColumn, isNegativeByType(details, type) && classes.sumColumnNegative)}>
      {sum ? formatTransactionSum(details, type, sum, EMoneyFormat.symbolLeft) : "-"}
    </span>
  </div>

));
SumColumn.displayName = "SumColumn";

interface IBalanceColumnProps {
  after: TPlatform_PlayerTransaction_Fragment["after"];
}

const BalanceColumn = memo<IBalanceColumnProps>(({ after }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.infoColumn}>
      <span className={classes.infoTitle}>{t(platformui_starzbet_history_title_balance)}</span>

      <span className={classes.infoValue}>
        {after ? Money.toFormat(after, EMoneyFormat.symbolLeft) : "-"}
      </span>
    </div>
  );
});
BalanceColumn.displayName = "BalanceColumn";

const ActionColumn = memo<IWithId>(() => (
  <div className={classes.actionColumn}>
    {"-"}
  </div>
));
ActionColumn.displayName = "ActionColumn";

const TableRow = memo<TPlatform_PlayerTransaction_Fragment>(({
  sum,
  after,
  details,
  createdAt,
  type,
  id,
  provider,
  game,
}) => (
  <div className={clsx(classes.tableRow, game && classes.tableRowWithGame)}>
    <div className={classes.topContent}>
      <div className={classes.firstTopContent}>
        <div>
          <TypeColumn details={details} provider={provider} />

          {
            game
              ? (
                <Ellipsis>
                  <TranslateRecord record={game.name} />
                </Ellipsis>
              )
              : null
          }
        </div>

        <DateColumn createdAt={createdAt} />
      </div>

      <SumColumn sum={sum} details={details} type={type} />
    </div>

    <div className={classes.bottomContent}>
      <IdColumn id={id} />

      <BalanceColumn after={after} />
    </div>
  </div>
));
TableRow.displayName = "TableRow";

const TransactionList = memo(() => {
  const nodes = useSelector(nodesHistorySelector);

  return (
    <div className={classes.newTransactionTable}>
      {nodes.map((it) => <TableRow {...it} key={it.id} />)}
    </div>
  );
});
TransactionList.displayName = "TransactionList";

export { TransactionList };
