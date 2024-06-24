import clsx from "clsx";
import { type ChangeEvent, memo, useEffect, useReducer, useRef } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_searchInput_title_search } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { isNotVoid, usePersistCallback } from "@sb/utils";
import classes from "./GameSearch.module.css";
import { CloseDefaultIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { SearchIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/SearchIcon/SearchIcon";
import { TrashIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/TrashIcon/TrashIcon";
import { useLocalizedPush } from "../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { LinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { type IWithGamePage } from "../../../../../Store/Games/Model/Games";
import { mainPathByGamePageMap, searchPathByGamePageMap, searchTextPathByGamePageMap } from "../../../../../Utils/GetGamesViewParams";

interface IGameSearchProps extends IWithGamePage {
  text: string;
  setText: (str: string) => void;
}

const GameSearch = memo<IGameSearchProps>(({ page, text, setText }) => {
  const [t] = useTranslation();

  const ref = useRef<HTMLInputElement>(null);

  const searchPath = searchPathByGamePageMap[page];

  const searchTextPath = searchTextPathByGamePageMap[page];

  const mainPath = mainPathByGamePageMap[page];

  const push = useLocalizedPush();

  const [toched, setTouched] = useReducer(() => true, false);

  useEffect(
    () => {
      if (text) {
        push(searchTextPath, { searchText: text });
      } else if (toched) {
        push(searchPath);
      }
    },
    [text],
  );

  const onChange = usePersistCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);

    setTouched();
  });

  const reset = usePersistCallback(() => setText(""));

  return (
    <div className={classes.searchBar}>
      <div className={classes.inputWrapper}>
        <SearchIcon className={classes.searchBarIcon} size={"s"} color={"darkText"} />

        <input
          ref={ref}
          type={"text"}
          placeholder={t.plain(sportsbookui_starzbet_searchInput_title_search)}
          onChange={onChange}
          value={text}
          className={classes.input}
        />

        <LinkLocalized
          to={searchPath}
          onClick={reset}
          className={clsx(classes.close, isNotVoid(text) && classes.visibly)}
        >
          <TrashIcon size={"s"} color={"darkText"} />
        </LinkLocalized>
      </div>

      <LinkLocalized
        to={mainPath}
        onClick={reset}
        className={classes.goBack}
      >
        <CloseDefaultIcon size={"xs"} color={"darkText"} />
      </LinkLocalized>
    </div>
  );
});
GameSearch.displayName = "GameSearch";

export { GameSearch };
