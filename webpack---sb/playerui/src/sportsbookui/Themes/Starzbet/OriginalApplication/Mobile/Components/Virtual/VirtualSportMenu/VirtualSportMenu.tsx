// @ts-nocheck
import { memo } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import classes from "./VirtualSportMenu.module.css";
import { routeMap } from "../../../../../../../RouteMap/RouteMap";
import { virtualSportIdByParamsSelector } from "../../../../../../../Store/Virtual/Common/Selectors/VirtualSportIdByParamsSelector";
import { VirtualVideoWidget, VirtualXVisionWidget } from "../../../../../../../Components/Kiron/VirtualLiveWidgets";
import { VirtualSportMenuContainer } from "../../../../../../../Components/VirtualSportMenuContainer/VirtualSportMenuContainer";

const VirtualSportMenu = memo(() => {
  const match = useRouteMatch([routeMap.virtual.category, routeMap.virtual.roulette]);
  const sportId = useSelector(virtualSportIdByParamsSelector(match?.params));

  return (
    <VirtualSportMenuContainer className={classes.view} sportId={sportId}>
      {
        sportId === sportCodeToIdMap[ESportCode.kiron_soccer]
          ? (
            <VirtualXVisionWidget height={"300px"} />
          )
          : (
            <VirtualVideoWidget height={"300px"} />
          )
      }
    </VirtualSportMenuContainer>
  );
});
VirtualSportMenu.displayName = "VirtualSportMenu";

export { VirtualSportMenu };
