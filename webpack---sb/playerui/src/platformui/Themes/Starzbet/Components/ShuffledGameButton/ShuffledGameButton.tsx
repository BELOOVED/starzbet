import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_games_tryYourLuck } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./ShuffledGameButton.module.css";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { LoaderCircle } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { type IWithGamePage } from "../../../../Store/Games/Model/Games";
import { ShuffleGameButton } from "../../../../Components/ShuffleGameButton/ShuffleGameButton";
import { RandomIcon } from "../../../../Components/Icons/RandomIcon/RandomIcon";

const ShuffledGameButton = memo<IWithGamePage>(({ page }) => {
  const [t] = useTranslation();

  return (
    <ShuffleGameButton page={page} hideIfEmpty>
      {
        (onClick, disabled) => (
          <Button
            onClick={onClick}
            colorScheme={"blue-gradient"}
            disabled={disabled}
            className={classes.shuffleButton}
          >
            {disabled ? <LoaderCircle size={"16px"} /> : <RandomIcon width={16} height={14} />}

            <div className={classes.content}>
              {t(platformui_starzbet_games_tryYourLuck)}
            </div>
          </Button>
        )
      }
    </ShuffleGameButton>
  );
});
ShuffledGameButton.displayName = "ShuffledGameButton";

export {
  ShuffledGameButton,
};
