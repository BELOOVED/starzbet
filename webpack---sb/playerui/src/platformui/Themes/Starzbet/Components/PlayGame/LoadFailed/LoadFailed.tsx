import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_button_close,
  platformui_button_tryAgain,
  platformui_subTitle_wrong,
  platformui_title_wrong,
} from "@sb/translates/platformui/CommonTKeys";
import { useAction } from "@sb/utils";
import classes from "./LoadFailed.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Space } from "../../../../../../common/Components/Space/Space";
import { tryAgainClickedAction } from "../../../../../Store/PlayGame/PlayGameActions";
import {
  getGameLinkMainErrorTranslateParamsSelector,
  getGameLinkSecondErrorTranslateParamsSelector,
} from "../../../../../Store/PlayGame/PlayGameSelectors";

const LoadFailed = memo(() => {
  const [t] = useTranslation();

  const handleTryAgain = useAction(tryAgainClickedAction);

  const title = useSelector(getGameLinkMainErrorTranslateParamsSelector) || [platformui_title_wrong];
  const subtitle = useSelector(getGameLinkSecondErrorTranslateParamsSelector) || [platformui_subTitle_wrong];

  return (
    <div className={classes.failedContainer}>
      <div className={classes.iconContainer}>
        <div className={classes.errorIcon} />
      </div>

      <div className={classes.title}>
        {t(...title)}
      </div>

      <div className={classes.subtitle}>
        {t(...subtitle)}
      </div>

      <Space value={12} vertical wide>
        <Button onClick={handleTryAgain} colorScheme={"orange-gradient"} wide>
          {t(platformui_button_tryAgain)}
        </Button>

        <Button onClick={window.close} colorScheme={"secondary-grey"} wide>
          {t(platformui_button_close)}
        </Button>
      </Space>
    </div>
  );
});
LoadFailed.displayName = "LoadFailed";

export { LoadFailed };
