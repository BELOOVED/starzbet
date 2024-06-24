// @ts-nocheck
import icons1 from "./SportIcon1.module.css";
import { createSportIcon } from "../../Creators/CreateSportIcon/CreateSportIcon";

const styles = {
  0: icons1,
};

const SportIcon = createSportIcon(styles);

SportIcon.displayName = "SportIcon";

export { SportIcon };
