// @ts-nocheck
import { memo } from "react";
import classes from "./AuthenticationPending.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";

const AuthenticationPending = memo(() => (
  <div className={classes.authenticationPending}>
    <Loader />
  </div>
));
AuthenticationPending.displayName = "AuthenticationPending";

export { AuthenticationPending };
