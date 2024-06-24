import { memo } from "react";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./BackButton.module.css";
import { ArrowLeftIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ArrowLeftIcon";
import {
  LinkLocalized,
  type TLinkLocalizedProps,
} from "../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";

const BackButton = memo<TLinkLocalizedProps<string>>((props) => (
  <LinkLocalized
    className={classes.backButton}
    {...qaAttr(PlayerUIQaAttributes.MyAccountMenu.GoBackButton)}
    {...props}
  >
    <ArrowLeftIcon />
  </LinkLocalized>
));
BackButton.displayName = "BackButton";

export { BackButton };
