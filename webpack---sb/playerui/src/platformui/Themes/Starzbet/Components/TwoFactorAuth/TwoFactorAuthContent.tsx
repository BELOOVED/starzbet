import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_2fa_description } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./TwoFactorAuthContent.module.css";
import { playerDetailsSelectors } from "../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { Space } from "../../../../../common/Components/Space/Space";
import { ActivateSteps, DeactivateStep } from "./Steps/Steps";

const TwoFactorAuthContent = memo(() => {
  const [t] = useTranslation();
  const isTwoFactorAuthEnable = useSelector(playerDetailsSelectors.twoFactorAuthenticationEnabled);

  return (
    <Space
      vertical
      value={24}
      wide
      className={classes.container}
    >
      <div className={classes.description}>
        {t(platformui_starzbet_2fa_description)}
      </div>

      {isTwoFactorAuthEnable ? <DeactivateStep /> : <ActivateSteps />}
    </Space>
  );
});
TwoFactorAuthContent.displayName = "TwoFactorAuthContent";

export { TwoFactorAuthContent };
