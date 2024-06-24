import clsx from "clsx";
import { type FC, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { themeSelector } from "../../Store/Theme/ThemeSelectors";
import { gainThemeContext } from "../../Utils/ThemeContext";

// TODO - ThemeContainers and Modals

interface IThemeContextProvideProps {
  children: ReactNode;
  className?: string;
  withoutVariables?: boolean;
}

const ThemeContainer: FC<IThemeContextProvideProps> = ({
  children,
  className,
  withoutVariables = false,
}) => {
  const currentTheme = useSelector(themeSelector);
  // @react-compiler-warn
  const variablesFromContext = gainThemeContext().react.useFind("variables");
  const variables = withoutVariables ? null : variablesFromContext;

  return (
    <div className={clsx(variables && variables[currentTheme], className)} data-theme={currentTheme}>
      {children}
    </div>
  );
};
ThemeContainer.displayName = "ThemeContainer";

export { ThemeContainer };
