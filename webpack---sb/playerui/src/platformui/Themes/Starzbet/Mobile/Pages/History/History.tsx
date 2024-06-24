// @ts-nocheck
/* eslint-disable rulesdir/jsx-element-max-length */
/* eslint-disable rulesdir/jsx-no-reference-prop */
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import {
  platformui_starzbet_accountPage_name_history,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { objToComponent, useAction, useOnClickOutside } from "@sb/utils";
import classes from "./History.module.css";
import { NavLinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import {
  RedirectLocalized,
} from "../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { NativeHorizontalScroll } from "../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import {
  historyFilterSelector,
  historyLoadingSelector,
  historyProductRouteSelector,
  isEmptyNodesHistorySelector,
} from "../../../../../Store/History/Selectors/HistorySelectors";
import { historyChangeIntervalAction } from "../../../../../Store/History/HistoryActions";
import { DateRangePicker } from "../../../Desktop/Components/Datepicker/Datepicker";
import { HistoryPaginator } from "../../../Desktop/Components/Paginator/Paginator";
import { CalendarIcon } from "../../../Components/Icons/CalendarIcon/CalendarIcon";
import { HistoryIcon } from "../../../Components/Icons/HistoryIcon/HistoryIcon";
import { useHistoryProducts } from "../../../Hooks/UseHistoryProducts";
import { NotFound } from "../../../Components/NotFound/NotFound";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const FormattedDate = memo<IDateProps>(({ dateFirst, dateSecond }) => (
  <span className={classes.calendarDate}>
    <DateFormat date={dateFirst} format={"dd.MM.yyyy"} />

    {" - "}

    <DateFormat date={dateSecond} format={"dd.MM.yyyy"} />
  </span>
));
FormattedDate.displayName = "FormattedDate";

const Interval = memo(({
  filter,
}) => {
  const [showed, setShowed] = useState(false);

  const [ref] = useOnClickOutside(() => setShowed(false));

  const changeInterval = useAction(historyChangeIntervalAction);

  const onClick = useCallback(() => setShowed(!showed), [showed]);

  const initial = filter.duration
    ? {
      dateFirst: Date.now() - filter.duration,
      dateSecond: Date.now(),
    }
    : {
      dateFirst: filter.from,
      dateSecond: filter.to,
    };

  return (
    <div
      className={classes.calendar}
      ref={ref}
      onClick={onClick}
    >
      {
        filter.duration
          ? (<FormattedDate dateFirst={Date.now() - filter.duration} dateSecond={Date.now()} />)
          : (<FormattedDate dateFirst={filter.from} dateSecond={filter.to} />)
      }

      <CalendarIcon size={"s"} />

      <DateRangePicker
        showed={showed}
        changeInterval={changeInterval}
        startDate={initial.dateFirst}
        endDate={initial.dateSecond}
      />
    </div>
  );
});
Interval.displayName = "Interval";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_accountPage_name_history,
  },
];

const History = memo(({ routes }) => {
  const [t] = useTranslation();
  const product = useSelector(historyProductRouteSelector);

  const products = useHistoryProducts();
  const filter = useSelector(historyFilterSelector);

  const loading = useSelector(historyLoadingSelector);

  const isEmptyNodes = useSelector(isEmptyNodesHistorySelector);

  if (product === undefined) {
    return <RedirectLocalized to={routeMap.accountHistoryRoute} />;
  }

  return (
    <AccountPage
      icon={HistoryIcon}
      headerColorScheme={"grey"}
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_accountPage_name_history)}
    >
      {
        <div className={classes.scroll}>
          <NativeHorizontalScroll>
            <div className={classes.products}>
              {
                products.map((product) => {
                  const params = { product: product.id };

                  return (
                    <NavLinkLocalized
                      key={product.id}
                      className={classes.product}
                      activeClassName={classes.activeProduct}
                      to={routeMap.historyRouteWithParam}
                      params={params}
                    >
                      {product.name}
                    </NavLinkLocalized>
                  );
                })
              }
            </div>
          </NativeHorizontalScroll>

          <div className={classes.history}>
            <Interval filter={filter} />

            {!loading && isEmptyNodes ? <NotFound /> : null}

            {
              loading
                ? <Loader />
                : (
                  <Switch>
                    {routes.map(objToComponent("path")(Route))}
                  </Switch>
                )
            }

            <HistoryPaginator />
          </div>
        </div>
      }
    </AccountPage>
  );
});
History.displayName = "History";

export { History };
