import clsx from "clsx";
import { memo } from "react";
import classes from "./ProvidersCheckbox.module.css";
import { TickIcon } from "../../../../../../common/Themes/Baywin/Components/Icons/TickIcon/TickIcon";
import { gameProviderName, type TGameProviderEnum } from "../../../../../../common/Store/Provider/ProviderModel";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { type IGameProviderWithCount } from "../../../../../Store/Games/GamesModels";

interface IProviderProps {
  onClick: (provider: TGameProviderEnum) => void;
  provider: TGameProviderEnum;
  count: number;
  active: boolean;
}

const Provider = memo<IProviderProps>(
  ({
    onClick,
    provider,
    active,
    count,
  }) => {
    const onProviderClick = () => onClick(provider);

    return (
      <div
        onClick={onProviderClick}
        className={classes.checkboxProviderItem}
      >
        <div className={classes.leftContent}>
          <div className={clsx(classes.checkIcon, active && classes.checkIconActive)}>
            {active && <TickIcon />}
          </div>

          <div className={clsx(classes.name, active && classes.activeName)}>
            <Ellipsis>{gameProviderName[provider]}</Ellipsis>
          </div>
        </div>

        <span className={clsx(classes.count, active && classes.activeName)}>{count}</span>
      </div>
    );
  },
);
Provider.displayName = "Provider";

interface IPopupProvidersProps {
  providersWithCount: IGameProviderWithCount[];
  onClick: (provider: TGameProviderEnum) => void;
  activeProviders: TGameProviderEnum[];
}

const ProvidersCheckbox = memo<IPopupProvidersProps>(({
  providersWithCount,
  onClick,
  activeProviders,
}) => (
  <div className={classes.providersCheckboxContainer}>
    <div className={classes.providersCheckbox}>
      {
        providersWithCount.map(({ provider, gamesCount }) => (
          <Provider
            onClick={onClick}
            key={provider}
            count={gamesCount}
            provider={provider}
            active={activeProviders.includes(provider)}
          />
        ))
      }
    </div>
  </div>
));
ProvidersCheckbox.displayName = "ProvidersCheckbox";

export { ProvidersCheckbox };
