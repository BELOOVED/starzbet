// @ts-nocheck
import { memo } from "react";
import classes from "./SportMenu.module.css";
import {
  ExpendableLiveSportMenuItemContainer,
  PreLiveSportMenuItemContainer,
} from "../../../../../../Containers/SportMenuItemContainer/SportMenuItemContainer";
import { SportMenuItem } from "../SportMenuItem/SportMenuItem";

const SportMenu = memo(({ sportIdList }) => (
  <div className={classes.list}>
    {
      sportIdList.map((sportId) => (
        <PreLiveSportMenuItemContainer
          key={sportId}
          sportId={sportId}
          child={SportMenuItem}
        />
      ))
    }
  </div>
));
SportMenu.displayName = "SportMenu";

const LiveSportMenu = memo(({ sportIdList }) => (
  <div className={classes.list}>
    {
      sportIdList.map((sportId) => (
        <ExpendableLiveSportMenuItemContainer
          key={sportId}
          sportId={sportId}
          child={SportMenuItem}
        />
      ))
    }
  </div>
));
LiveSportMenu.displayName = "LiveSportMenu";

export { SportMenu, LiveSportMenu };
