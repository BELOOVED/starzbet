import { memo, useState } from "react";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_statistics_button_showLess,
  sportsbookui_starzbet_statistics_button_showMore,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./ShowMoreButton.module.css";

interface IShowMoreButtonProps {
  onClick: () => void;
  less: boolean;
}

const ShowMoreButton = memo<IShowMoreButtonProps>(({ onClick, less }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.showMore} onClick={onClick}>
      {
        less
          ? t(sportsbookui_starzbet_statistics_button_showLess)
          : t(sportsbookui_starzbet_statistics_button_showMore)
      }
    </div>
  );
});
ShowMoreButton.displayName = "ShowMoreButton";

interface IShowMoreInListProps {
  onChange: (size: number) => void;
  itemsInList: number;
  shortSize: number;
  scrollBack?: () => void;
}

const ShowMoreInList = memo<IShowMoreInListProps>(({
  onChange,
  itemsInList,
  shortSize,
  scrollBack,
}) => {
  const [shownNumber, setShownNumber] = useState(Math.min(itemsInList, shortSize));

  if (itemsInList <= shortSize) {
    return null;
  }

  const showLess = itemsInList === shownNumber;

  const onClick = () => {
    const nextSize = showLess
      ? shortSize
      : itemsInList;

    if (showLess && scrollBack) {
      scrollBack();
    }
    setShownNumber(nextSize);
    onChange(nextSize);
  };

  return <ShowMoreButton onClick={onClick} less={showLess} />;
});
ShowMoreInList.displayName = "ShowMoreInList";

export { ShowMoreInList };
