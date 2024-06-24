// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "@sb/translator";
import { not, objToComponent, useOnClickOutside } from "@sb/utils";
import classes from "./Select.module.css";
import { ChevronIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/ChevronIcon/ChevronIcon";
import { CustomScrollbar } from "../../../Desktop/Components/CustomScrollbar/CustomScrollbar";

const Option = memo(({ id, name, handler }) => {
  const [t] = useTranslation();

  const clickHandler = useCallback(() => handler(id), [id]);

  return (
    <div className={classes.option} onClick={clickHandler}>{t(name)}</div>
  );
});
Option.displayName = "Option";

const Select = memo(({
  current,
  options,
  handler,
  small,
}) => {
  const [t] = useTranslation();

  const [dropdown, setDropdown] = useState(false);

  const [ref] = useOnClickOutside(() => setDropdown(false));

  const openDropdown = useCallback(() => setDropdown(not), []);

  const className = clsx(
    classes.select,
    dropdown && classes.expanded,
    small && classes.small,
  );

  return (
    <div className={className} ref={ref} onClick={openDropdown}>
      <div className={classes.selectInner}>
        <div className={classes.current}>
          {t(options.find(({ id }) => id === current).name)}
        </div>

        <ChevronIcon expanded={dropdown} />
      </div>

      {
        dropdown && (
          <div className={classes.dropdown}>
            <CustomScrollbar className={classes.scrollbar}>
              {options.filter(({ id }) => id !== current).map(objToComponent("id", { handler })(Option))}
            </CustomScrollbar>
          </div>
        )
      }
    </div>
  );
});
Select.displayName = "Select";

export { Select };
