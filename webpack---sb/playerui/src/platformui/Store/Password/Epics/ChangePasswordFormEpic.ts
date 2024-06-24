import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { always } from "@sb/utils/Always";
import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { CHANGE_PASSWORD_FORM_CONFIG } from "../Form/ChangePasswordForm";
import { CHANGE_PASSWORD_FORM_NAME } from "../PasswordVariables";

const changePasswordFormEpic = routerEpic({
  match: getMatch({ path: routeMap.passwordRoute, exact: true }),
  onStart: (): TPlatformEpic => mountUnmountFormEpicFactory(
    always(true),
    CHANGE_PASSWORD_FORM_NAME,
    CHANGE_PASSWORD_FORM_CONFIG,
  ),
});

export { changePasswordFormEpic };
