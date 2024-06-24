import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { RedirectLocalized } from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { Logger } from "../../../common/Utils/Logger";
import { isPrivateGroupIdSelector } from "../../../common/Store/Player/Selectors/PlayerGroupIdSelectors";
import { routeMap } from "../../RouteMap/RouteMap";

interface IWhenAllowedBonusPageProps {
  page: ComponentType;
}

const WhenAllowedBonusPage = memo<IWhenAllowedBonusPageProps>(({ page, ...rest }) => {
  const isPrivate = useSelector(isPrivateGroupIdSelector);

  if (isPrivate) {
    Logger.info.react(`[WhenAllowedBonusPage] redirect to 'myDetailsRoute', isPrivate: ${isPrivate}`);

    return <RedirectLocalized to={routeMap.myDetailsRoute} />;
  }

  return (
    createElement(page, { ...rest })
  );
});
WhenAllowedBonusPage.displayName = "WhenAllowedBonusPage";

export { WhenAllowedBonusPage };
