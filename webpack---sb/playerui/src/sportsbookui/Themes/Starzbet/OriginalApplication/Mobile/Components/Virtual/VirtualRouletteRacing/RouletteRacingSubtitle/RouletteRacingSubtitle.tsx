import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_title_1st, sportsbookui_starzbet_title_2nd, sportsbookui_starzbet_title_and, sportsbookui_starzbet_title_3rd } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./RouletteRacingSubtitle.module.css";

const First = memo(() => {
  const [t] = useTranslation();

  return (
    <span>
      {t(sportsbookui_starzbet_title_1st)}

      {", "}

      {t(sportsbookui_starzbet_title_2nd)}

      {" "}

      {t(sportsbookui_starzbet_title_and)}

      {" "}

      {t(sportsbookui_starzbet_title_3rd)}

      {" - 1000"}
    </span>
  );
});
First.displayName = "First";

const TwoFromThreeSubTitle = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.subtitle}>
      <First />

      <span>
        {t(sportsbookui_starzbet_title_1st)}

        {" "}

        {t(sportsbookui_starzbet_title_and)}

        {" "}

        {t(sportsbookui_starzbet_title_2nd)}

        {" - 100"}
      </span>

      <span>
        {t(sportsbookui_starzbet_title_1st)}

        {" "}

        {t(sportsbookui_starzbet_title_and)}

        {" "}

        {t(sportsbookui_starzbet_title_3rd)}

        {" - 10"}
      </span>

      <span>
        {t(sportsbookui_starzbet_title_2nd)}

        {" "}

        {t(sportsbookui_starzbet_title_and)}

        {" "}

        {t(sportsbookui_starzbet_title_3rd)}

        {" - 5"}
      </span>
    </div>
  );
});
TwoFromThreeSubTitle.displayName = "TwoFromThreeSubTitle";

const PlaceSubTitle = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.subtitle}>
      <span>
        {t(sportsbookui_starzbet_title_1st)}

        {" - 7"}
      </span>

      <span>
        {t(sportsbookui_starzbet_title_2nd)}

        {" - 3"}
      </span>

      <span>
        {t(sportsbookui_starzbet_title_3rd)}

        {" - 2"}
      </span>
    </div>
  );
});
PlaceSubTitle.displayName = "PlaceSubTitle";

const TwoAnyOrderSubTitle = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.subtitle}>
      <span>
        {t(sportsbookui_starzbet_title_1st)}

        {" "}

        {t(sportsbookui_starzbet_title_and)}

        {" "}

        {t(sportsbookui_starzbet_title_2nd)}

        {" - 30"}
      </span>

      <span>
        {t(sportsbookui_starzbet_title_1st)}

        {" "}

        {t(sportsbookui_starzbet_title_and)}

        {" "}

        {t(sportsbookui_starzbet_title_3rd)}

        {" - 20"}
      </span>

      <span>
        {t(sportsbookui_starzbet_title_2nd)}

        {" "}

        {t(sportsbookui_starzbet_title_and)}

        {" "}

        {t(sportsbookui_starzbet_title_3rd)}

        {" - 10"}
      </span>
    </div>
  );
});
TwoAnyOrderSubTitle.displayName = "TwoAnyOrderSubTitle";

export {
  TwoFromThreeSubTitle,
  PlaceSubTitle,
  TwoAnyOrderSubTitle,
};
