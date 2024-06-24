// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { ELocale, not, useOnClickOutside } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { keys } from "@sb/utils/Keys";
import classes from "./Language.module.css";
import { Text } from "../../../../../common/Themes/Starzbet/Components/Text/Text";
import { CollapseIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";
import {
  KYRGYZSTAN_INTERNAL_LOCALES_TO_NAME_MAP,
  TURKEY_INTERNAL_LOCALES_TO_NAME_MAP,
} from "../../../../../common/Store/Locale/Model/TSupportedLocale";
import { IS_STARZBET_KG } from "../../../../../ServerEnvironment";
import { useChangeLocaleAction } from "../../../../Store/Locale/Hooks/UseChangeLocaleAction";
import { localeSelector } from "../../../../Store/Locale/Selectors/localeSelector";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";

const baseFlags = {
  [ELocale.en_US]: classes.enUs,
  [ELocale.tr_TR]: classes.trTr,
};

const flags = IS_STARZBET_KG ? { ...baseFlags, [ELocale.ru_RU]: classes.ruRu } : baseFlags;

const lmap = IS_STARZBET_KG ? KYRGYZSTAN_INTERNAL_LOCALES_TO_NAME_MAP : TURKEY_INTERNAL_LOCALES_TO_NAME_MAP;

const options = keys(lmap)
  .map((locale) => ({ id: locale, name: lmap[locale] }));

const Option = memo(({
  id,
  name,
  active,
}) => {
  const [t] = useTranslation();

  const changeLocale = useChangeLocaleAction();

  const clickHandler = () => changeLocale(id);

  return (
    <div className={clsx(classes.option, active && classes.active)} onClick={clickHandler}>
      <div className={clsx(classes.flag, flags[id])} />

      <Text
        colorScheme={"light-700"}
        textSize={"14"}
        textGap={"24"}
        className={classes.maxWidth}
        textWeight={"500"}
      >
        <Ellipsis>
          {t(name)}
        </Ellipsis>
      </Text>
    </div>
  );
});
Option.displayName = "Option";

const Select = memo(({
  current,
  options,
  handler,
  dark,
  top,
}) => {
  const [t] = useTranslation();

  const [dropdown, setDropdown] = useState(false);

  const [ref] = useOnClickOutside(() => setDropdown(false));

  const openDropdown = useCallback(() => setDropdown(not), []);

  const className = clsx(
    classes.select,
    dropdown && classes.expanded,
    dark && classes.dark,
    top && classes.top,
  );

  return (
    <div className={className} ref={ref} onClick={openDropdown}>
      <div className={`${classes.flag} ${flags[current]}`} />

      <div className={classes.current}>
        {t(options.find(({ id }) => id === current).name)}
      </div>

      <div className={classes.arrow} />

      {
        dropdown && (
          <div className={classes.dropdown}>
            {
              options.map(({ id, name }) => (
                <Option
                  key={id}
                  id={id}
                  name={name}
                  handler={handler}
                  active={id === current}
                />
              ))
            }
          </div>
        )
      }
    </div>
  );
});
Select.displayName = "Select";

interface ILanguage {
  direction?: "top" | "bottom";
  selectClassName?: string;
  dropdownClassName?: string;
}

const Language = memo<ILanguage>(({
  direction = "bottom",
  dropdownClassName,
  selectClassName,
}) => {
  const current = useSelector(localeSelector);

  const [dropdown, setDropdown] = useState(false);

  const [ref] = useOnClickOutside(() => setDropdown(false));

  const openDropdown = useCallback(() => setDropdown(not), []);

  const className = clsx(
    classes.select,
    dropdown && classes.expanded,
    direction === "top" && classes.top,
    selectClassName,
  );

  const currentLang = options.find(({ id }) => id === current);

  return (
    <div className={className} ref={ref} onClick={openDropdown}>
      <div className={clsx(classes.flag, flags[currentLang?.id])} />

      <div className={classes.current}>
        <Text
          colorScheme={"light-700"}
          textSize={"14"}
          textGap={"24"}
          className={classes.maxWidth}
          textWeight={"500"}
        >
          <Ellipsis>
            {currentLang.name}
          </Ellipsis>
        </Text>
      </div>

      <CollapseIcon expanded={dropdown} />

      {
        dropdown && (
          <div className={clsx(classes.dropdown, dropdownClassName)}>
            {
              options.map(({ id, name }) => (
                <Option
                  key={id}
                  id={id}
                  name={name}
                  active={id === current}
                />
              ))
            }
          </div>
        )
      }
    </div>
  );
});
Language.displayName = "Language";

export { Language };
