// @ts-nocheck
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_paginator_button_nextPage,
  platformui_starzbet_paginator_button_prevPage,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { useAction } from "@sb/utils";
import classes from "./Paginator.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { pageInfoTransactionRequestsSelector } from "../../../../../Store/TransactionRequests/Selectors/TransactionRequestsSelector";
import { useTransactionRequestsNextPageAction } from "../../../../../Store/TransactionRequests/Hooks/UseTransactionRequestsNextPageAction";
import { useTransactionRequestsPrevPageAction } from "../../../../../Store/TransactionRequests/Hooks/UseTransactionRequestsPrevPageAction";
import { pageInfoHistorySelector } from "../../../../../Store/History/Selectors/HistorySelectors";
import { useHistoryNextPageAction } from "../../../../../Store/History/Hooks/UseHistoryNextPageAction";
import { useHistoryPrevPageAction } from "../../../../../Store/History/Hooks/UseHistoryPrevPageAction";
import { ticketSelectors } from "../../../../../Store/Ticket/Selectors/TicketSelectors";
import { callRequestsPageInfoSelector } from "../../../../../Store/CallRequests/Selectors/CallRequestsSelectors";
import { callRequestsNextPageAction, callRequestsPrevPageAction } from "../../../../../Store/CallRequests/CallRequestsActions";
import { ticketNextPageAction, ticketPrevPageAction } from "../../../../../Store/Ticket/TicketActions";

const Paginator = memo(({ pageInfo, nextPage, prevPage }) => {
  const [t] = useTranslation();

  if (!pageInfo) {
    return null;
  }

  return (
    <div className={classes.paginator}>
      {
        pageInfo.hasPreviousPage
          ? (
            <Button
              colorScheme={"secondary-grey"}
              onClick={prevPage}
              capitalize
            >
              {t(platformui_starzbet_paginator_button_prevPage)}
            </Button>
          )
          : <div />
      }

      {
        pageInfo.hasNextPage && (
          <Button
            colorScheme={"secondary-grey"}
            onClick={nextPage}
            capitalize
            {...qaAttr(PlayerUIQaAttributes.Pagination.NextPageButton)}
          >
            {t(platformui_starzbet_paginator_button_nextPage)}
          </Button>
        )
      }
    </div>
  );
});
Paginator.displayName = "Paginator";

const TransactionRequestsPaginator = memo(() => {
  const pageInfo = useSelector(pageInfoTransactionRequestsSelector);

  const nextPage = useTransactionRequestsNextPageAction();
  const prevPage = useTransactionRequestsPrevPageAction();

  return (
    <Paginator
      nextPage={nextPage}
      prevPage={prevPage}
      pageInfo={pageInfo}
    />
  );
});
TransactionRequestsPaginator.displayName = "TransactionRequestsPaginator";

const HistoryPaginator = memo(() => {
  const pageInfo = useSelector(pageInfoHistorySelector);

  const nextPage = useHistoryNextPageAction();
  const prevPage = useHistoryPrevPageAction();

  return (
    <Paginator
      nextPage={nextPage}
      prevPage={prevPage}
      pageInfo={pageInfo}
    />
  );
});
HistoryPaginator.displayName = "HistoryPaginator";

const TicketPaginator = memo(() => {
  const pageInfo = useSelector(ticketSelectors.pageInfo);
  const nextPage = useAction(ticketNextPageAction);
  const prevPage = useAction(ticketPrevPageAction);

  return (
    <Paginator
      nextPage={nextPage}
      prevPage={prevPage}
      pageInfo={pageInfo}
    />
  );
});
TicketPaginator.displayName = "TicketPaginator";

const CallRequestsPaginator = memo(() => {
  const pageInfo = useSelector(callRequestsPageInfoSelector);

  const dispatch = useDispatch();

  const nextPage = useCallback(() => dispatch(callRequestsNextPageAction()), []);
  const prevPage = useCallback(() => dispatch(callRequestsPrevPageAction()), []);

  return (
    <Paginator
      nextPage={nextPage}
      prevPage={prevPage}
      pageInfo={pageInfo}
    />
  );
});
CallRequestsPaginator.displayName = "CallRequestsPaginator";

export {
  TransactionRequestsPaginator,
  HistoryPaginator,
  TicketPaginator,
  CallRequestsPaginator,
};
