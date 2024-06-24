import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { EPlatform_ImageSize, type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { type EProviderCode } from "@sb/betting-core/EProviderCode";
import classes from "./GameBottomInfo.module.css";
import { gameProviderName, isGameProvider } from "../../../../../common/Store/Provider/ProviderModel";
import { isMobileSelector } from "../../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { TranslateRecord } from "../../../../Components/TranslateRecord/TranslateRecord";
import { getAdditionalHeight } from "../../../Baywin/Desktop/Components/GameLayout/GameHooks";

interface IGameBottomInfoProps {
  name: TTranslateRecord_Fragment[];
  providerCode: EProviderCode;
  size: EPlatform_ImageSize;
}

const GameBottomInfo = memo<IGameBottomInfoProps>(({
  name,
  providerCode,
  size,

}) => {
  const isSize4 = size === EPlatform_ImageSize.size4;
  const isMobile = useSelector(isMobileSelector);
  const style = { height: getAdditionalHeight(size, isMobile) };

  return (
    <div className={classes.gameBottomInfo} style={style}>
      <Ellipsis className={clsx(classes.gameName, isSize4 && classes.gameNameS4)}>
        <TranslateRecord record={name} />
      </Ellipsis>

      {
        isGameProvider(providerCode)
          ? (
            <Ellipsis className={clsx(classes.providerName, isSize4 && classes.providerNameS4)}>
              {gameProviderName[providerCode]}
            </Ellipsis>
          )
          : null
      }
    </div>
  );
});
GameBottomInfo.displayName = "GameBottomInfo";

export {
  GameBottomInfo,
};
