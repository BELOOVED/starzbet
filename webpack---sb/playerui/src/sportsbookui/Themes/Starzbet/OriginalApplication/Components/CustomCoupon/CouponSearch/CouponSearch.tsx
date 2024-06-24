// @ts-nocheck
import { memo, useCallback, useState } from "react";
import { sportsbookui_starzbet_searchInput_title_search } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./CouponSearch.module.css";
import { Input } from "../../../../../../Components/Input/Input";
import { SearchIcon } from "../../Icons/SearchIcon/SearchIcon";

const Placeholder = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      {t(sportsbookui_starzbet_searchInput_title_search)}

      {"..."}
    </>
  );
});
Placeholder.displayName = "Placeholder";

const CouponSearch = memo(({ onSubmit }) => {
  const [input, setInput] = useState("");

  const changeHandler = useCallback(
    (e: any) => {
      const value = e.currentTarget.value;
      setInput(value);
      onSubmit(value);
    },
    [],
  );

  return (
    <div className={classes.search}>
      <SearchIcon className={classes.icon} />

      <Input
        type={"text"}
        value={input}
        // onKeyDown={keyDownHandler}
        onChange={changeHandler}
        placeholder={<Placeholder />}
        placeholderClass={classes.placeholder}
      />
    </div>
  );
});
CouponSearch.displayName = "CouponSearch";

export { CouponSearch };
