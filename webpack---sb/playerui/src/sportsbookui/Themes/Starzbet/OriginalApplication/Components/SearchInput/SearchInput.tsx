// @ts-nocheck
import clsx from "clsx";
import { createRef, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath, useRouteMatch } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import { isNotVoid } from "@sb/utils";
import { sportsbookui_starzbet_searchInput_title_search } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./SearchInput.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { When } from "../../../../../../common/Components/When";
import { CloseDefaultIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import {
  useLocalizedPushPath,
  useLocalizedReplace,
} from "../../../../../../common/Client/Core/Services/RouterService/Hooks/UseLocalizedPush";
import { type TLocalizedRoutePath } from "../../../../../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";
import { useSearchSetter } from "../../../../../Store/Search/Hooks/UseSearch";
import { ResetedInput } from "../../../../../Components/ResetedInput/ResetedInput";
import { SearchIcon } from "../Icons/SearchIcon/SearchIcon";

interface ISearch {
  searchRoute: TLocalizedRoutePath<string>;
  resultRoute: TLocalizedRoutePath<string>;
  backRoute: TLocalizedRoutePath<string>;
  eventRoute: string | string[];
}

const SearchInput = memo<ISearch>(({
  searchRoute,
  resultRoute,
  backRoute,
  eventRoute,
}) => {
  const [t] = useTranslation();

  const searchPage = useRouteMatch(searchRoute);
  const resultPage = useRouteMatch(resultRoute);

  const [searchText = "", setSearchText] = useSearchSetter(resultPage?.params.searchText);

  const goBack = useLocalizedPushPath(backRoute);
  const replace = useLocalizedReplace();

  const searchHandle = () => {
    if (!searchText) {
      return;
    }

    replace(resultRoute, { searchText });
  };

  const inputRef = createRef();

  const changeHandle = (e) => {
    const value = e.currentTarget.value;

    setSearchText(value);

    if (value.length > 2) {
      replace(resultRoute, { searchText: value });
    } else if (!value.length) {
      goBack();
    }
  };

  const clearHandler = useCallback(
    () => {
      setSearchText("");
      goBack();
      inputRef.current && inputRef.current.focus();
    },
    [inputRef],
  );

  const pathname = useSelector(routerLocationPathnameSelector);

  if (matchPath(pathname, eventRoute)) {
    return null;
  }

  return (
    <div className={clsx(classes.searchInput, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
      <SearchIcon className={classes.searchIcon} onClick={searchHandle} size={"xs"} />

      <ResetedInput
        type={"text"}
        className={classes.input}
        onChange={changeHandle}
        placeholder={t(sportsbookui_starzbet_searchInput_title_search)}
        value={searchText}
        autoFocus={Boolean(searchPage)}
      />

      <When condition={isNotVoid(searchText)}>
        <CloseDefaultIcon className={classes.searchIcon} onClick={clearHandler} size={"xss"} />
      </When>
    </div>
  );
});
SearchInput.displayName = "SearchInput";

export { SearchInput };
