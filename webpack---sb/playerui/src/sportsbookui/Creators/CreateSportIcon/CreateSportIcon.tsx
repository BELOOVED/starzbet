import clsx from "clsx";
import { memo } from "react";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import classes from "./CreateSportIcon.module.css";

type TStyles = Record<string, Record<string, string>>

interface ISportIconProps {
  style: number;
  id: string;
  active?: boolean;
}

const createSportIcon = (styles: TStyles) => memo<ISportIconProps>(
  ({ style = 0, id, active }) => {
    const selectedStyle = styles[style] || styles[0];
    const sportClass = selectedStyle[`--sportIcon_${sportIdToCodeMap[id]}`];
    const iconClass = sportClass || selectedStyle["--sportIcon_soccer"];

    const activeClass = selectedStyle["--active"];

    const className = clsx(classes.sportIcon, iconClass, active && activeClass);

    return (
      <div className={className} />
    );
  },
);

export { createSportIcon };
