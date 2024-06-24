import clsx from "clsx";
import { memo, useReducer } from "react";
import { useTranslation } from "@sb/translator";
import type { TPlatform_TransactionRequest_Fragment } from "@sb/graphql-client/PlayerUI";
import {
  platformui_starzbet_headline_method,
  platformui_starzbet_history_title_transactionID,
  platformui_starzbet_transactionSum_applied,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EMoneyFormat, isNotNil, Money, not } from "@sb/utils";
import classes from "./BankingHistoryCard.module.css";
import { When } from "../../../../../../common/Components/When";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { getTransactionRequestDescription } from "../../../../../Store/TransactionRequests/Utils/GetTransactionRequestDescription";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { getTransactionTypeTKeyBySum } from "../../../../../Store/History/Model/AccountHistory";
import { StatusSteps } from "../../../Desktop/Components/BankingHistoryCard/StatusSteps/StatusSteps";
import { Copy } from "../../../Components/Copy/Copy";
import { StatusItem } from "./StatusItem/StatusItem";

type TCardHeaderProps = Pick<
  TPlatform_TransactionRequest_Fragment,
  "data" |
  "transactionType" |
  "sum" |
  "createdAt" |
  "viewStatus" |
  "id" |
  "decline"
>

const CardHeader = memo<TCardHeaderProps>(({
  data,
  transactionType,
  sum,
  createdAt,
  viewStatus,
  id,
  decline,
}) => {
  const [t] = useTranslation();
  const subtitle = getTransactionRequestDescription(data?.payload);

  return (
    <div className={classes.cardHeader}>
      <div className={classes.cardHeaderItem}>
        <Ellipsis>
          {t(getTransactionTypeTKeyBySum(transactionType))}

          {
            isNotNil(subtitle)
              ? (
                <>
                  {" - "}

                  {subtitle}
                </>
              )
              : null
          }
        </Ellipsis>

        <div className={classes.normalWeight}>
          <DateFormat date={createdAt} format={"dd.MM.yyyy HH:mm:ss"} />
        </div>

        <div className={classes.copyItem}>
          <Ellipsis>
            {t(platformui_starzbet_history_title_transactionID)}
          </Ellipsis>

          <Copy text={id} isRight />
        </div>
      </div>

      <StatusItem
        sum={sum}
        viewStatus={viewStatus}
        transactionType={transactionType}
        decline={decline}
      />
    </div>
  );
});
CardHeader.displayName = "CardHeader";

type TCardFooterProps = Pick<
  TPlatform_TransactionRequest_Fragment,
  "paymentMethod" |
  "appliedPartOfSum"
>

const CardFooter = memo<TCardFooterProps>(({
  paymentMethod,
  appliedPartOfSum,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.cardFooter}>
      <div className={classes.footerItem}>
        <div>
          {t(platformui_starzbet_headline_method)}
        </div>

        <Ellipsis>
          {paymentMethod?.name ?? ""}
        </Ellipsis>
      </div>

      <div className={classes.footerItem}>
        <div>
          {t(platformui_starzbet_transactionSum_applied)}
        </div>

        <div className={classes.normalWeight}>
          {Money.toFormat(appliedPartOfSum, EMoneyFormat.symbolLeft)}
        </div>
      </div>
    </div>
  );
});
CardFooter.displayName = "CardFooter";

const BankingHistoryCard = memo<TPlatform_TransactionRequest_Fragment>(({
  id,
  viewStatus,
  transactionType,
  createdAt,
  sum,
  paymentMethod,
  appliedPartOfSum,
  data,
  decline,
}) => {
  const [expanded, toggleExpand] = useReducer(not<boolean>, false);

  return (
    <div className={clsx(classes.card, expanded && classes.expanded)} onClick={toggleExpand}>
      <div className={classes.cardContent}>
        <CardHeader
          data={data}
          transactionType={transactionType}
          sum={sum}
          createdAt={createdAt}
          viewStatus={viewStatus}
          id={id}
          decline={decline}
        />

        <CardFooter paymentMethod={paymentMethod} appliedPartOfSum={appliedPartOfSum} />
      </div>

      <When condition={expanded}>
        <div className={classes.details}>
          <StatusSteps viewStatus={viewStatus} transactionType={transactionType} />
        </div>
      </When>
    </div>
  );
});
BankingHistoryCard.displayName = "BankingHistoryCard";

export { BankingHistoryCard };
