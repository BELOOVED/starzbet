import { memo } from "react";
import { useSelector } from "react-redux";
import classes from "./VirtualProviderMenu.module.css";
import { NativeHorizontalScroll } from "../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { gameProviderName, gameProviderTabs, type TGameProviderEnum } from "../../../../../common/Store/Provider/ProviderModel";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { NavLinkToTop } from "../../../../Components/NavLink/NavLinkToTop";
import { ProviderIcon } from "../../../../Components/ProviderIcon/ProviderIcon";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { virtualGameProviderListSelector } from "../../../../Store/VirtualGame/Selectors/VirtualGameSelectors";

interface IProviderProps {
  provider: TGameProviderEnum;
}

const Provider = memo<IProviderProps>(({ provider }) => {
  const params = { provider: gameProviderTabs[provider] };

  return (
    <NavLinkToTop
      to={routeMap.virtualProvider}
      params={params}
      className={classes.provider}
      activeClassName={classes.active}
    >
      <ProviderIcon className={classes.providerIcon} provider={provider} />

      <Ellipsis className={classes.providerName}>{gameProviderName[provider]}</Ellipsis>
    </NavLinkToTop>
  );
});
Provider.displayName = "Provider";

const VirtualProviderMenu = memo(() => {
  const providerList = useSelector(virtualGameProviderListSelector);

  return (
    <NativeHorizontalScroll className={classes.providerList}>
      {
        providerList.map((provider) => (
          <Provider key={provider} provider={provider} />
        ))
      }
    </NativeHorizontalScroll>
  );
});
VirtualProviderMenu.displayName = "VirtualProviderMenu";

export { VirtualProviderMenu };
