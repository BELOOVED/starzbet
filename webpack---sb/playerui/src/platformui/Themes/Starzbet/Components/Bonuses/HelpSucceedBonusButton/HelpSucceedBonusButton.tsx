import { memo } from "react";
import {
  platformui_starzbet_bonus_helperButton_deposit,
  platformui_starzbet_bonus_helperButton_placeBet,
  platformui_starzbet_bonus_helperButton_placeLiveBet,
  platformui_starzbet_bonus_helperButton_playCasino,
  platformui_starzbet_bonus_helperButton_playCasinoFreeSpins,
  platformui_starzbet_bonus_helperButton_playGames,
  platformui_starzbet_bonus_helperButton_playLiveCasino,
  platformui_starzbet_bonus_helperButton_playProvider,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { isArray } from "@sb/utils";
import { Link } from "../../../../../../common/Themes/Starzbet/Components/Link/Link";
import {
  gameProviderName,
  gameProviderTabs,
  type TGameProviderEnum,
} from "../../../../../../common/Store/Provider/ProviderModel";
import { EBonusHelperButton } from "../../../../../Store/Bonuses/Model/Enums/EBonusHelperButton";
import { routeMap, type TRoutePath } from "../../../../../RouteMap/RouteMap";
import { systemLabels } from "../../../../../Store/Games/Model/Games";
import { type THelperButtonFor } from "../../../../../Store/Bonuses/Utils/BonusHelperButtonUtils";

interface IHelpSucceedBonusButtonProps {
  buttonFor: THelperButtonFor;
}

const params = { labelId: systemLabels.activeFreeSpins };

interface ILinkForProviderProps {
  provider: TGameProviderEnum;
  to: TRoutePath;
}

const LinkForProvider = memo<ILinkForProviderProps>(({ to, provider }) => {
  const [t] = useTranslation();

  const providerParams = { provider: gameProviderTabs[provider] };

  return (
    <Link to={to} params={providerParams} colorScheme={"orange-gradient"}>
      {t(platformui_starzbet_bonus_helperButton_playProvider, { provider: gameProviderName[provider] })}
    </Link>
  );
});
LinkForProvider.displayName = "LinkForProvider";

const HelpSucceedBonusButton = memo<IHelpSucceedBonusButtonProps>(({ buttonFor }) => {
  const [t] = useTranslation();

  if (isArray(buttonFor)) {
    const [button, provider] = buttonFor;

    switch (button) {
      case EBonusHelperButton.casinoProvider: {
        return <LinkForProvider provider={provider} to={routeMap.casinoProvider} />;
      }
      case EBonusHelperButton.liveCasinoProvider: {
        return <LinkForProvider provider={provider} to={routeMap.liveCasinoProvider} />;
      }
      case EBonusHelperButton.gamesProvider: {
        return <LinkForProvider provider={provider} to={routeMap.gamesProvider} />;
      }
    }
  }

  switch (buttonFor) {
    case EBonusHelperButton.casinoFreeSpins:
      return (
        <Link
          to={routeMap.casinoLabel}
          params={params}
          colorScheme={"orange-gradient"}
        >
          {t(platformui_starzbet_bonus_helperButton_playCasinoFreeSpins)}
        </Link>
      );
    case EBonusHelperButton.deposit:
      return (
        <Link to={routeMap.depositRoute} colorScheme={"orange-gradient"}>
          {t(platformui_starzbet_bonus_helperButton_deposit)}
        </Link>
      );
    case EBonusHelperButton.betting:
      return (
        <Link to={routeMap.preLive} colorScheme={"orange-gradient"}>
          {t(platformui_starzbet_bonus_helperButton_placeBet)}
        </Link>
      );
    case EBonusHelperButton.liveBetting:
      return (
        <Link to={routeMap.live} colorScheme={"orange-gradient"}>
          {t(platformui_starzbet_bonus_helperButton_placeLiveBet)}
        </Link>
      );
    case EBonusHelperButton.casino:
      return (
        <Link to={routeMap.casino} colorScheme={"orange-gradient"}>
          {t(platformui_starzbet_bonus_helperButton_playCasino)}
        </Link>
      );
    case EBonusHelperButton.liveCasino:
      return (
        <Link to={routeMap.liveCasino} colorScheme={"orange-gradient"}>
          {t(platformui_starzbet_bonus_helperButton_playLiveCasino)}
        </Link>
      );
    case EBonusHelperButton.games:
      return (
        <Link to={routeMap.games} colorScheme={"orange-gradient"}>
          {t(platformui_starzbet_bonus_helperButton_playGames)}
        </Link>
      );
    default:
      return null;
  }
});
HelpSucceedBonusButton.displayName = "HelpSucceedBonusButton";

export { HelpSucceedBonusButton };
