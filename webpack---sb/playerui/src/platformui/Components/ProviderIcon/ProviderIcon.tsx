import clsx from "clsx";
import { memo } from "react";
import { type IWithQaAttribute, qaAttr } from "@sb/qa-attributes";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import classes from "./ProviderIcon.module.css";
import { gameProviderEnum, type TGameProviderEnum } from "../../../common/Store/Provider/ProviderModel";
import { type TIconProps } from "../../../common/Themes/Betwiz/Components/ThemedIcon/ThemedIcon";
import { AllProvidersIcon } from "../AllProvidersIcon/AllProvidersIcon";

const ThemeLogo = memo<IWithClassName>(({ className }) => {
  const theme = process.env.THEME;

  return (
    <div className={clsx(className, classes[theme])} />
  );
});
ThemeLogo.displayName = "ThemeLogo";

interface IProviderIconProps extends IWithQaAttribute, TIconProps {
  className?: string;
  provider: TGameProviderEnum;
}

const ProviderIcon = memo<IProviderIconProps>(({ className = "", provider, ...props }) => {
  if (provider === gameProviderEnum.ALL_PROVIDERS) {
    return (
      <AllProvidersIcon
        className={className}
        color={"brand"}
        size={"m"}
        {...props}
      />
    );
  }

  if (provider === EProviderCode.DAINTREE_GAMING) {
    return <ThemeLogo className={className} />;
  }

  return (
    <div className={clsx(className, classes[`${gameProviderEnum[provider]}_ICON`])} />
  );
});
ProviderIcon.displayName = "ProviderIcon";

interface IProviderIconWithContainerProps extends IProviderIconProps {
  containerClassName?: string;
}

const ProviderIconWithContainer = memo<IProviderIconWithContainerProps>(({
  containerClassName,
  className,
  qaAttribute,
  ...props
}) => (
  <div className={clsx(classes.container, containerClassName)} {...qaAttr(qaAttribute)}>
    <ProviderIcon className={clsx(classes.icon, className)} {...props} />
  </div>
));
ProviderIconWithContainer.displayName = "ProviderIconWithContainer";

export { ProviderIcon, ProviderIconWithContainer };
