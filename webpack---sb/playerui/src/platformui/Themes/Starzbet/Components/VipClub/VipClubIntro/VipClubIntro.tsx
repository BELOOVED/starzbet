import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_vipClub_intro_text,
  platformui_starzbet_vipClubPromo_intro_text,
  platformui_starzbet_vipClubPromo_intro_text2,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./VipClubIntro.module.css";

const VipClubIntro = memo(() => {
  const [t] = useTranslation();

  return (
    <p className={classes.vipClubIntro}>
      {t(platformui_starzbet_vipClub_intro_text)}
    </p>
  );
});
VipClubIntro.displayName = "VipClubIntro";

const VipClubPromoIntro = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubIntro}>
      <p className={classes.vipClubIntroText}>
        {t(platformui_starzbet_vipClubPromo_intro_text)}
      </p>

      <p className={classes.vipClubIntroText}>
        {t(platformui_starzbet_vipClubPromo_intro_text2)}
      </p>
    </div>
  );
});
VipClubPromoIntro.displayName = "VipClubPromoIntro";

export { VipClubIntro, VipClubPromoIntro };
