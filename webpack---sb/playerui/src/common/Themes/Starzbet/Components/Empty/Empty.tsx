import { type FC, type PropsWithChildren } from "react";
import { useTranslation } from "@sb/translator";
import { type TTKeys as TSportsbookTKeys } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { platformui_starzbet_title_notFound, type TTKeys as TPlatformTKeys } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TCommonTKeys } from "@sb/translates/platformui/CommonTKeys";
import classes from "./Empty.module.css";
import { LoaderImg } from "../LoaderImg/LoaderImg";

interface IEmptyProps {
  messageTKey?: TPlatformTKeys | TSportsbookTKeys | TCommonTKeys;
}

const Empty: FC<PropsWithChildren<IEmptyProps>> = ({ messageTKey = platformui_starzbet_title_notFound, children }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.emptyContainer}>
      <LoaderImg className={classes.icon} />

      <div className={classes.empty}>
        {t(messageTKey)}
      </div>

      {children}
    </div>
  );
};
Empty.displayName = "Empty";

export { Empty };
