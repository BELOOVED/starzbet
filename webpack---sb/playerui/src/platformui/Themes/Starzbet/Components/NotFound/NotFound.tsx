import { memo } from "react";
import { platformui_starzbet_title_notFound } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { platformui_subTitle_wrong } from "@sb/translates/platformui/CommonTKeys";
import classes from "./NotFound.module.css";
import { LoaderImg } from "../../../../../common/Themes/Starzbet/Components/LoaderImg/LoaderImg";

const NotFound = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.notFound}>
      <LoaderImg className={classes.icon} />

      <div className={classes.title}>{t(platformui_starzbet_title_notFound)}</div>

      <div className={classes.subTitle}>{t(platformui_subTitle_wrong)}</div>
    </div>
  );
});
NotFound.displayName = "NotFound";

export { NotFound };
