import clsx from "clsx";
import { type ButtonHTMLAttributes, type DetailedHTMLProps, memo } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_casino_button_loadMore } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./GameLoadMoreButton.module.css";

const GameLoadMoreButton = memo<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>(({ className, ...rest }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.wrapper}>
      <button {...rest} className={clsx(classes.loadMore, className)}>
        {t(platformui_starzbet_casino_button_loadMore)}
      </button>
    </div>
  );
});
GameLoadMoreButton.displayName = "GameLoadMoreButton";

export { GameLoadMoreButton };
