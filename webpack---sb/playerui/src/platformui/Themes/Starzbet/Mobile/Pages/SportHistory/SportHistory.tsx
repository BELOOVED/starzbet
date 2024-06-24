import { memo } from "react";
import { useSelector } from "react-redux";
import classes from "./SportHistory.module.css";
import { nodesHistorySelector } from "../../../../../Store/History/Selectors/HistorySelectors";
import { SportTransaction } from "../../Components/TransactionCard/SportTransaction";

const SportHistory = memo(() => {
  const nodes = useSelector(nodesHistorySelector);

  return (
    <div className={classes.cards}>
      {
        nodes.map((transaction) => (
          <SportTransaction transaction={transaction} key={transaction.id} />
        ))
      }
    </div>
  );
});
SportHistory.displayName = "SportHistory";

export { SportHistory };
