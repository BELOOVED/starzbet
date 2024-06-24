import { withProps } from "@sb/utils";
import { RedirectLocalized } from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { LoggedContainer } from "../../../common/Containers/LoggedContainer/LoggedContainer";
import { routeMap } from "../../RouteMap/RouteMap";

const LoggedContainerWithRedirect = withProps(LoggedContainer)({ logged: <RedirectLocalized to={routeMap.root} /> });

export { LoggedContainerWithRedirect };
