// @ts-nocheck
import { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { objToComponent } from "@sb/utils";
import classes from "./Virtual.module.css";
import { VirtualFirstSport } from "../../../../../../Components/VirtualFirstSport/VirtualFirstSport";
import { VirtualNavMenu } from "../../../Components/Virtual/VirtualNavMenu/VirtualNavMenu";
import { VirtualCategoryMenu } from "../../../Components/Virtual/VirtualCategoryMenu/VirtualCategoryMenu";
import { routes } from "../../Routes/Routes";
import { VirtualSportMenu } from "../../Components/Virtual/VirtualSportMenu/VirtualSportMenu";

const pages = [
  routes.virtual.category,
  routes.virtual.roulette,
];

const Virtual = memo(() => (
  <div className={classes.container}>
    <div className={classes.virtualMenu}>
      <VirtualNavMenu />

      <VirtualSportMenu />

      <VirtualCategoryMenu />
    </div>

    <Switch>
      {pages.map(objToComponent("path")(Route))}

      <VirtualFirstSport />
    </Switch>
  </div>
));
Virtual.displayName = "Virtual";

export { Virtual };
