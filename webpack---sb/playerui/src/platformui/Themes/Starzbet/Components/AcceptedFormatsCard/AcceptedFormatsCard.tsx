import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_accountVerification_title_acceptedFileFormats,
  platformui_starzbet_accountVerification_title_countFilesUp,
  platformui_starzbet_accountVerification_title_detailsAreClear,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./AcceptedFormatsCard.module.css";

const AcceptedFormatsCard = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.acceptedFormatsCard}>
      <p className={classes.formatsInfo}>
        {"◦ "}

        {t(platformui_starzbet_accountVerification_title_countFilesUp, { count: 10 })}
      </p>

      <p className={classes.formatsInfo}>
        {"◦ "}

        {t(platformui_starzbet_accountVerification_title_acceptedFileFormats)}

        {": "}

        {"PNG,  JPG,  JPEG,  PDF"}
      </p>

      <p className={classes.formatsInfo}>
        {"◦ "}

        {t(platformui_starzbet_accountVerification_title_detailsAreClear)}
      </p>
    </div>
  );
});
AcceptedFormatsCard.displayName = "AcceptedFormatsCard";

export { AcceptedFormatsCard };
