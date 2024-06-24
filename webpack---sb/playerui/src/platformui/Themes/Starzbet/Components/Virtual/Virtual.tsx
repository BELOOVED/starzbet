import { type FC, type PropsWithChildren } from "react";
import { Route } from "react-router-dom";
import classes from "./Virtual.module.css";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { VirtualGameContainer } from "../../../../Components/VirtualGameContainer/VirtualGameContainer";
import { VirtualProviderMenu } from "../VirtualProviderMenu/VirtualProviderMenu";
import { VirtualGameProvider } from "../VirtualGameProvider/VirtualGameProvider";

const Virtual: FC<PropsWithChildren> = ({ children }) => (
  <div className={classes.virtualContainer}>
    <VirtualProviderMenu />

    <VirtualGameContainer sportsbookVirtual={children}>
      <Route path={routeMap.virtualProvider} component={VirtualGameProvider} />
    </VirtualGameContainer>
  </div>
);
Virtual.displayName = "Virtual";

export { Virtual };
