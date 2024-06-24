import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_callRequests_title_seeAllRequests,
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_navLink_requestACallBack,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isEmpty, objToComponent, useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { callManagerWasSucceededSelector } from "@sb/call-manager";
import classes from "./CallRequests.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { callRequestsRequestsSelector } from "../../../../../Store/CallRequests/Selectors/CallRequestsSelectors";
import { CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL } from "../../../../../Store/CallRequests/CallRequestVariables";
import { CallRequestsPaginator } from "../../../Desktop/Components/Paginator/Paginator";
import { HelpIcon } from "../../../Components/Icons/HelpIcon/HelpIcon";
import { CreateCallRequestForm } from "../../../Components/CreateCallRequestForm/CreateCallRequestForm";
import { CallRequest } from "../../Components/CallRequest/CallRequest";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_navLink_requestACallBack,
  },
];

const CallRequests = memo(() => {
  const [t] = useTranslation();

  const requests = useSelector(callRequestsRequestsSelector);
  const callOptionsLoaded = useParamSelector(callManagerWasSucceededSelector, [CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL]);

  return (
    <AccountPage
      icon={HelpIcon}
      headerColorScheme={"blue"}
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_navLink_requestACallBack)}
    >
      <div className={classes.callRequests}>
        <div className={classes.form}>
          <CreateCallRequestForm />
        </div>

        {
          isEmpty(requests)
            ? (
              <div className={classes.subTitle}>
                {t(platformui_starzbet_callRequests_title_seeAllRequests)}
              </div>
            )
            : null
        }

        {callOptionsLoaded ? requests.map(objToComponent("id")(CallRequest)) : <Loader />}

        <CallRequestsPaginator />
      </div>
    </AccountPage>
  );
});
CallRequests.displayName = "CallRequests";

export { CallRequests };
