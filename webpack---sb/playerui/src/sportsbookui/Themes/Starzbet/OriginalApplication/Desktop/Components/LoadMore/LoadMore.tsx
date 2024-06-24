// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { sportsbookui_starzbet_button_loadMore } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./LoadMore.module.css";

const LoadMore = memo(({ handler, fit }) => {
  const [t] = useTranslation();

  return (
    <div className={clsx(classes.button, fit && classes.fit)} onClick={handler}>{t(sportsbookui_starzbet_button_loadMore)}</div>
  );
});
LoadMore.displayName = "LoadMore";

export { LoadMore };
